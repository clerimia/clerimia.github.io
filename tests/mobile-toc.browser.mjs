// Browser regression helper: open an article with headings in the single-column layout.
import assert from 'node:assert/strict'

export async function checkMobileToc(page) {
  await page.evaluate(() => window.scrollTo(0, 600))
  await page.waitForFunction(() => document.getElementById('sidebar-btn')?.getBoundingClientRect().width > 0)
  await page.focus('#sidebar-btn')
  await page.keyboard.press('Enter')

  const opened = await page.evaluate(() => ({
    expanded: document.getElementById('sidebar-btn')?.getAttribute('aria-expanded'),
    role: document.getElementById('sidebar')?.getAttribute('role'),
    modal: document.getElementById('sidebar')?.getAttribute('aria-modal'),
    focus: document.activeElement?.id
  }))
  assert.deepEqual(opened, { expanded: 'true', role: 'dialog', modal: 'true', focus: 'sidebar-close' })

  await page.keyboard.press('Shift+Tab')
  assert.equal(await page.evaluate(() => {
    const controls = [...document.querySelectorAll('#sidebar a[href], #sidebar button')]
      .filter((element) => element.getClientRects().length > 0)
    return document.activeElement === controls.at(-1)
  }), true, 'focus stays inside the open directory')
  await page.keyboard.press('Tab')
  assert.equal(await page.evaluate(() => document.activeElement?.id), 'sidebar-close')

  await page.keyboard.press('Escape')
  assert.deepEqual(await page.evaluate(() => ({
    expanded: document.getElementById('sidebar-btn')?.getAttribute('aria-expanded'),
    focus: document.activeElement?.id
  })), { expanded: 'false', focus: 'sidebar-btn' })

  await page.keyboard.press('Enter')
  await page.evaluate(() => {
    window.__tocOriginalScroll = Element.prototype.scrollIntoView
    Element.prototype.scrollIntoView = function (options) {
      window.__tocScrollBehavior = options?.behavior
      return window.__tocOriginalScroll.call(this, options)
    }
  })
  await page.click('loc=css:#sidebar toc-heading a >> nth=0', { label: '跳转到文章小节' })
  const selected = await page.evaluate(() => {
    const result = {
      expanded: document.getElementById('sidebar-btn')?.getAttribute('aria-expanded'),
      focusedHeading: /^H[2-4]$/.test(document.activeElement?.tagName || ''),
      hash: location.hash,
      reduced: matchMedia('(prefers-reduced-motion: reduce)').matches,
      behavior: window.__tocScrollBehavior
    }
    Element.prototype.scrollIntoView = window.__tocOriginalScroll
    delete window.__tocOriginalScroll
    delete window.__tocScrollBehavior
    return result
  })
  assert.equal(selected.expanded, 'false')
  assert.equal(selected.focusedHeading, true)
  assert.ok(selected.hash)
  assert.equal(selected.behavior, selected.reduced ? 'auto' : 'smooth')
  return { opened, selected }
}
