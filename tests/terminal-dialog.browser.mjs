// Browser regression helper: open a site page and set viewport before calling.
import assert from 'node:assert/strict'

export async function checkTerminalDialog(page) {
  await page.click('.site-header [data-terminal-trigger]')
  const opened = await page.evaluate(() => ({
    open: document.getElementById('terminal-dialog').open,
    mobile: matchMedia('(max-width: 680px), (pointer: coarse)').matches,
    closeFocused: document.activeElement.id === 'terminal-close',
    inputFocused: document.activeElement.matches('[data-wt="input"]'),
    hiddenFocus: !!document.activeElement.closest('[aria-hidden="true"]'),
    closeWidth: document.getElementById('terminal-close').getBoundingClientRect().width
  }))
  assert.equal(opened.open, true)
  assert.equal(opened.hiddenFocus, false)
  assert.ok(opened.closeWidth >= 44)
  assert.equal(opened.mobile ? opened.closeFocused : opened.inputFocused, true)
  if (opened.mobile) {
    await page.keyboard.press('Shift+Tab')
    assert.equal(await page.evaluate(() => document.activeElement.matches('[data-wt="input"]')), true)
    await page.keyboard.press('Tab')
    assert.equal(await page.evaluate(() => document.activeElement.id), 'terminal-close')
  }
  await page.click('[data-wt-command="help"]')
  await page.waitForSelector('.wt-help-list')
  assert.equal(await page.evaluate(() => document.activeElement.matches('[data-wt="input"]')), true)
  await page.fill('[data-wt="input"]', 'clear')
  await page.keyboard.press('Enter')
  await page.waitForFunction(() => !document.querySelector('.wt-help-list'))
  await page.fill('[data-wt="input"]', 'help')
  await page.keyboard.press('Enter')
  await page.waitForSelector('.wt-help-list')
  await page.keyboard.press('Escape')
  await page.waitForFunction(() => !document.getElementById('terminal-dialog').open)
  assert.equal(await page.evaluate(() => document.activeElement.matches('.site-terminal-button')), true)
  await page.click('.site-header [data-terminal-trigger]')
  await page.click('#terminal-close')
  await page.waitForFunction(() => !document.getElementById('terminal-dialog').open)
  return opened
}
