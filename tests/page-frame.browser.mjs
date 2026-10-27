// Browser regression helper: open a page with a return link and set its viewport first.
import assert from 'node:assert/strict'

export async function checkPageFrame(page, { back, titleAtTop = true } = {}) {
  await page.waitForFunction(() => !document.getAnimations().some((animation) =>
    animation.playState === 'running' && animation.effect?.getTiming().iterations !== Infinity
  ))

  const state = await page.evaluate(() => {
    const frame = document.getElementById('main-content')
    const link = frame?.querySelector(':scope > .site-back')
    const main = frame?.querySelector(':scope > main')
    const header = main?.querySelector('#content-header') ?? main?.querySelector(':scope > h1')
    const title = main?.querySelector('h1')
    const rect = (element) => {
      if (!element) return null
      const box = element.getBoundingClientRect()
      return { left: box.left, top: box.top, bottom: box.bottom, width: box.width, height: box.height }
    }
    return {
      frame: rect(frame),
      link: rect(link),
      main: rect(main),
      header: rect(header),
      title: rect(title),
      destination: link?.getAttribute('href'),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
    }
  })

  const aligned = (a, b, name) => assert.ok(Math.abs(a - b) <= 1, `${name}: ${a} vs ${b}`)
  assert.ok(state.frame && state.link && state.main && state.header, 'page has a return link, main content and header')
  assert.ok(state.link.width >= 44 && state.link.height >= 44, 'return link has a 44px target')
  if (back !== undefined) assert.equal(state.destination, back, 'return link keeps its destination')
  aligned(state.link.left, state.frame.left, 'return link starts on the page baseline')
  aligned(state.main.left, state.frame.left, 'main content starts on the page baseline')
  aligned(state.header.left, state.frame.left, 'header starts on the page baseline')
  aligned(state.main.top - state.link.bottom, 24, 'return link and main content have a 24px gap')
  aligned(state.header.top, state.main.top, 'header starts at the top of main content')
  if (titleAtTop) {
    assert.ok(state.title, 'page has a title')
    aligned(state.title.left, state.header.left, 'title starts on the header baseline')
    aligned(state.title.top, state.header.top, 'title starts at the top of the header')
  }
  assert.ok(state.overflow <= 1, `page overflows by ${state.overflow}px`)
  return state
}
