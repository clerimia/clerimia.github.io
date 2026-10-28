// Browser helper: call on a page long enough to scroll. Covers the stable header structure.
import assert from 'node:assert/strict'

export async function checkHeaderNavigation(page) {
  const settled = () =>
    !document
      .querySelector('.site-header')
      .getAnimations({ subtree: true })
      .some((animation) => animation.playState === 'running')
  await page.evaluate(() => scrollTo(0, 0))
  await page.waitForFunction(() => !document.querySelector('.site-header.is-compact'))
  await page.waitForFunction(settled)
  const read = () => {
    const header = document.querySelector('.site-header')
    const box = header.getBoundingClientRect()
    const brand = header.querySelector('.site-brand')
    return {
      top: box.top,
      left: box.left,
      right: box.right,
      height: box.height,
      narrow: matchMedia('(max-width: 760px)').matches,
      layout: getComputedStyle(header).display,
      brand: brand.textContent.trim(),
      brandSize: getComputedStyle(brand).fontSize,
      brandNameVisible:
        getComputedStyle(header.querySelector('.site-brand__name')).display !== 'none',
      frameHeight: document.querySelector('.site-header-frame').getBoundingClientRect().height,
      contentTop: document.getElementById('main-content').getBoundingClientRect().top + scrollY,
      menuVisible: document.getElementById('site-menu-toggle').getBoundingClientRect().width > 0,
      navInert: document.querySelector('.site-nav').inert,
      utilityRole: header.querySelector('.site-header__actions').getAttribute('role'),
      utilityGap: getComputedStyle(header.querySelector('.site-header__actions')).columnGap,
      desktopSearchVisible:
        header.querySelector('.site-search-button--desktop').getClientRects().length > 0,
      mobileSearchDisplay: getComputedStyle(header.querySelector('.site-search-button--mobile'))
        .display,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      tools: [
        ...header.querySelectorAll('.site-header__actions > a, .site-header__actions > button')
      ]
        .filter((element) => element.getClientRects().length)
        .map((element) => ({
          label: element.getAttribute('aria-label'),
          width: element.getBoundingClientRect().width,
          height: element.getBoundingClientRect().height
        }))
    }
  }
  const origin = await page.evaluate(read)
  assert.equal(
    origin.menuVisible,
    origin.narrow,
    'mobile navigation is collapsed from the top of the page'
  )
  assert.equal(origin.utilityRole, 'group')
  assert.equal(origin.utilityGap, '4px')
  assert.equal(origin.desktopSearchVisible, !origin.narrow)
  assert.equal(origin.mobileSearchDisplay, origin.narrow ? 'flex' : 'none')
  await page.evaluate(() => scrollTo(0, 400))
  await page.waitForFunction(() => document.querySelector('.site-header.is-compact'))
  await page.waitForFunction(settled)
  const compact = await page.evaluate(read)
  assert.ok(Math.abs(compact.top - 12) <= 1, 'floating header has breathing space above it')
  assert.ok(compact.height <= 61)
  assert.ok(Math.abs(compact.contentTop - origin.contentTop) <= 1, 'reading content does not jump')
  assert.equal(compact.frameHeight, origin.frameHeight)
  assert.equal(compact.layout, origin.layout)
  assert.equal(compact.brand, origin.brand)
  assert.equal(compact.brandSize, origin.brandSize)
  assert.equal(compact.brandNameVisible, true)
  assert.equal(compact.tools.length, origin.tools.length)
  assert.equal(compact.utilityRole, origin.utilityRole)
  assert.equal(compact.utilityGap, origin.utilityGap)
  assert.ok(compact.overflow <= 1)
  for (const tool of compact.tools)
    assert.ok(tool.width >= 44 && tool.height >= 44, `${tool.label} has a 44px target`)

  if (compact.narrow) {
    assert.equal(compact.navInert, true)
    await page.focus('#site-menu-toggle')
    await page.keyboard.press('Enter')
    await page.waitForFunction(() => !document.querySelector('.site-nav').inert)
    assert.equal(
      await page.evaluate(() => {
        const search = document.querySelector('.site-search-button--mobile')
        return (
          getComputedStyle(search).display !== 'none' &&
          getComputedStyle(search).visibility !== 'hidden'
        )
      }),
      true,
      'mobile search stays available in the navigation panel'
    )
    await page.keyboard.press('Tab')
    await page.waitForFunction(() => document.activeElement.closest('.site-nav__links') !== null)
    assert.equal(
      await page.evaluate(() => document.activeElement.closest('.site-nav__links') !== null),
      true
    )
    await page.evaluate(() => scrollTo(0, 0))
    await page.waitForFunction(() => !document.querySelector('.is-compact'))
    assert.equal(
      await page.evaluate(() =>
        document.getElementById('site-menu-toggle').getAttribute('aria-expanded')
      ),
      'true'
    )
    await page.keyboard.press('Escape')
    assert.deepEqual(
      await page.evaluate(() => ({
        expanded: document.getElementById('site-menu-toggle').getAttribute('aria-expanded'),
        focus: document.activeElement.id,
        inert: document.querySelector('.site-nav').inert
      })),
      { expanded: 'false', focus: 'site-menu-toggle', inert: true }
    )
  } else assert.equal(compact.navInert, false)
  await page.evaluate(() => scrollTo(0, 0))
  await page.waitForFunction(() => !document.querySelector('.is-compact'))
  await page.waitForFunction(settled)
  return { origin, compact }
}
