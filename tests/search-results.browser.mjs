// Browser regression helper: open /search in the built preview before calling.
import assert from 'node:assert/strict'

export async function checkSearchResults(page, query = 'AI') {
  await page.waitForSelector('#site-search .pagefind-ui__search-input')
  await page.fill('#site-search .pagefind-ui__search-input', query)
  await page.waitForSelector('.pagefind-ui__result mark')
  const result = await page.evaluate(() => {
    const mark = document.querySelector('.pagefind-ui__result mark')
    const probe = document.createElement('span')
    probe.style.backgroundColor = 'var(--color-selection)'
    probe.style.color = 'var(--color-text)'
    document.body.appendChild(probe)
    const expected = { background: getComputedStyle(probe).backgroundColor, text: getComputedStyle(probe).color }
    probe.remove()
    return {
      count: document.querySelectorAll('.pagefind-ui__result').length,
      inputHeight: document.querySelector('#site-search .pagefind-ui__search-input').getBoundingClientRect().height,
      overflow: document.documentElement.scrollWidth > innerWidth,
      background: getComputedStyle(mark).backgroundColor,
      text: getComputedStyle(mark).color,
      expected
    }
  })
  assert.ok(result.count > 0)
  assert.ok(result.inputHeight >= 44)
  assert.equal(result.overflow, false)
  assert.equal(result.background, result.expected.background)
  assert.equal(result.text, result.expected.text)
  return result
}
