import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { runInNewContext } from 'node:vm'
import ts from 'typescript'

const header = await readFile(new URL('../src/components/SiteHeader.astro', import.meta.url), 'utf8')
const script = ts.transpile(header.match(/<script>([\s\S]*?)<\/script>/)[1])

// Execute the real header script in a document that initialized before the user changed theme.
function createPage(initialTheme) {
  const saved = new Map([['theme', initialTheme]])
  let dark = initialTheme === 'dark'
  const classes = new Set()
  const frames = new Map()
  let nextFrame = 0
  const attributes = new Map()
  const button = Object.assign(new EventTarget(), {
    setAttribute: (name, value) => attributes.set(name, value)
  })
  const document = Object.assign(new EventTarget(), {
    documentElement: {
      classList: {
        contains: (name) => name === 'dark' ? dark : classes.has(name),
        toggle: (name, force = !dark) => name === 'dark' ? (dark = force) : force,
        add: (name) => classes.add(name),
        remove: (name) => classes.delete(name)
      }
    },
    getElementById: () => button
  })
  const window = Object.assign(new EventTarget(), {
    matchMedia: () => ({ matches: false })
  })
  runInNewContext(script, {
    document,
    window,
    localStorage: { getItem: (key) => saved.get(key) ?? null, setItem: (key, value) => saved.set(key, value) },
    requestAnimationFrame: (callback) => { frames.set(++nextFrame, callback); return nextFrame },
    cancelAnimationFrame: (id) => frames.delete(id)
  })
  const flushFrame = () => {
    const pending = [...frames.values()]
    frames.clear()
    pending.forEach((callback) => callback())
  }
  return { document, window, button, saved, attributes, isDark: () => dark, classes, flushFrame }
}

for (const initial of ['light', 'dark']) {
  test(`prerender activation restores a theme changed from ${initial}`, () => {
    const page = createPage(initial)
    const next = initial === 'dark' ? 'light' : 'dark'
    page.saved.set('theme', next)
    page.document.dispatchEvent(new Event('prerenderingchange'))
    assert.equal(page.isDark(), next === 'dark')
    assert.equal(page.attributes.get('aria-pressed'), String(next === 'dark'))
    assert.equal(page.attributes.get('title'), next === 'dark' ? '切换到浅色' : '切换到深色')
    page.button.dispatchEvent(new Event('click'))
    assert.equal(page.isDark(), initial === 'dark')
    assert.equal(page.saved.get('theme'), initial)
  })
}

test('a page restored from the back-forward cache uses the latest theme', () => {
  const page = createPage('light')
  page.saved.set('theme', 'dark')
  page.window.dispatchEvent(new Event('pageshow'))
  assert.equal(page.isDark(), true)
  assert.equal(page.attributes.get('aria-pressed'), 'true')
})

test('a theme change in another tab updates this page and its toggle', () => {
  const page = createPage('light')
  page.saved.set('theme', 'dark')
  const event = new Event('storage')
  Object.defineProperty(event, 'key', { value: 'theme' })
  page.window.dispatchEvent(event)
  assert.equal(page.isDark(), true)
  assert.equal(page.attributes.get('aria-pressed'), 'true')
})

test('a theme changed by another site control updates the header toggle', () => {
  const page = createPage('light')
  page.document.documentElement.classList.toggle('dark', true)
  page.document.dispatchEvent(new Event('site:theme-change'))
  assert.equal(page.attributes.get('aria-pressed'), 'true')
  assert.equal(page.attributes.get('aria-label'), '切换到浅色')
})

test('theme changes pause color transitions until the new theme is painted', () => {
  const page = createPage('light')
  page.button.dispatchEvent(new Event('click'))
  assert.equal(page.isDark(), true)
  assert.ok(page.classes.has('theme-changing'))
  page.flushFrame()
  assert.ok(page.classes.has('theme-changing'))
  page.flushFrame()
  assert.ok(!page.classes.has('theme-changing'))
})
