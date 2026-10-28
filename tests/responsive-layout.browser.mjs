// Browser regression helper: call after opening a page and setting its viewport.
import assert from 'node:assert/strict'

export async function checkResponsiveLayout(
  page,
  { article = false, sidebar = false, wide = false } = {}
) {
  const state = await page.evaluate(() => {
    const rect = (element) => {
      if (!element) return null
      const box = element.getBoundingClientRect()
      return {
        left: box.left,
        right: box.right,
        top: box.top,
        bottom: box.bottom,
        width: box.width,
        height: box.height
      }
    }
    const navigation = document.querySelector('.site-nav')
    const navBox = rect(navigation)
    const sidebar = document.querySelector('.article-sidebar')
    const button = document.getElementById('sidebar-btn')
    return {
      viewport: document.documentElement.clientWidth,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      navBox,
      navVisible: getComputedStyle(navigation).visibility !== 'hidden',
      navInert: navigation.inert,
      navLinks: [...navigation.querySelectorAll('a')].filter((link) => getComputedStyle(link).display !== 'none').map((link) => ({
        text: link.textContent.trim(),
        ...rect(link)
      })),
      headerActions: [
        ...document.querySelectorAll('.site-header__actions > a, .site-header__actions > button')
      ]
        .filter((element) => element.getClientRects().length > 0)
        .map(rect),
      article: rect(document.querySelector('.reading-column')),
      articleTags: [...document.querySelectorAll('.article-tags a')].map(rect),
      sidebar: sidebar && {
        ...rect(sidebar),
        position: getComputedStyle(sidebar).position,
        display: getComputedStyle(sidebar).display,
        visibility: getComputedStyle(sidebar).visibility,
        inert: sidebar.inert
      },
      button: button && { ...rect(button), display: getComputedStyle(button).display }
    }
  })

  assert.ok(state.overflow <= 1, `page overflows by ${state.overflow}px`)
  assert.ok(state.navLinks.length, 'primary navigation exists')
  if (!state.navVisible)
    assert.equal(state.navInert, true, 'collapsed navigation is not keyboard reachable')
  for (const link of state.navVisible ? state.navLinks : []) {
    assert.ok(link.width >= 44 && link.height >= 44, `${link.text} has a 44px target`)
    assert.ok(
      link.left >= state.navBox.left - 1 &&
        link.right <= Math.min(state.navBox.right, state.viewport) + 1,
      `${link.text} remains visible`
    )
    assert.ok(
      link.top >= state.navBox.top - 1 && link.bottom <= state.navBox.bottom + 1,
      `${link.text} is not clipped vertically`
    )
  }
  for (const action of state.headerActions)
    assert.ok(action.width >= 44 && action.height >= 44, 'header action has a 44px target')

  if (article) {
    for (const tag of state.articleTags)
      assert.ok(tag.width >= 44 && tag.height >= 44, 'article tag has a 44px target')
    assert.ok(
      state.article && state.article.width <= 761,
      'reading column stays within its maximum width'
    )
    if (!sidebar) {
      assert.equal(state.sidebar, null, 'a page without a directory reserves no sidebar')
      assert.equal(state.button, null, 'a page without a directory has no directory button')
    } else if (wide) {
      assert.equal(state.sidebar?.position, 'sticky')
      assert.ok(state.article.width >= 679, 'the directory does not squeeze the reading column')
      assert.ok(
        state.sidebar.left - state.article.right >= 31,
        'a gap separates the directory and reading column'
      )
      assert.equal(state.button?.display, 'none')
    } else {
      assert.equal(state.sidebar?.visibility, 'hidden')
      assert.equal(state.sidebar?.inert, true)
      assert.notEqual(state.button?.display, 'none')
      assert.ok(
        state.button?.width >= 44 && state.button?.height >= 44,
        'directory button has a 44px target'
      )
    }
  }
  return state
}
