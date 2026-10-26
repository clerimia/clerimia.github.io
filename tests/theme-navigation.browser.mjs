// Browser regression helper. Run from an ego-browser round after opening a site page.
import assert from 'node:assert/strict'

export async function readThemeState(page) {
  return page.evaluate(() => ({
    saved: localStorage.getItem('theme'),
    dark: document.documentElement.classList.contains('dark'),
    pressed: document.getElementById('site-theme-toggle')?.getAttribute('aria-pressed'),
    activationStart: performance.getEntriesByType('navigation')[0]?.activationStart ?? 0
  }))
}

export async function checkThemeNavigation(page, route) {
  await page.waitForSelector('#site-theme-toggle[aria-pressed]')
  const before = await readThemeState(page)
  const expected = before.dark ? 'light' : 'dark'
  await page.click('#site-theme-toggle', { label: 'switch site theme' })
  const switched = await readThemeState(page)
  assert.equal(switched.saved, expected, 'theme choice must be saved')
  assert.equal(switched.dark, expected === 'dark', 'theme must change on the current page')
  await page.click(`.site-nav a[href="${route}"]`, { label: 'navigate after theme switch' })
  await page.waitForURL(`**${route}`)
  await page.waitForSelector('#site-theme-toggle[aria-pressed]')
  const next = await readThemeState(page)
  console.log({ route, expected, actual: next })
  assert.equal(next.saved, expected, 'navigation must preserve the saved theme')
  assert.equal(next.dark, expected === 'dark', 'the first route after switching must use the saved theme')
  assert.equal(next.pressed, String(expected === 'dark'), 'the toggle must match the active theme')
  return next
}
