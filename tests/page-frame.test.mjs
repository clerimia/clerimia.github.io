// Run after npm run build: node --test tests/page-frame.test.mjs
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const pages = [
  ['about', '/'], ['links', '/'], ['blog', '/'], ['notes', '/'], ['musings', '/'],
  ['archives', '/blog'], ['search', '/blog'], ['terms', '/'],
  ['blog/tags', '/blog'], ['notes/tags', '/notes'], ['musings/tags', '/musings'],
  ['blog/tags/ai', '/blog/tags'], ['notes/tags/astro', '/notes/tags'],
  ['blog/ai-workloads-scion', '/blog'], ['notes/astro-theme-pure-notes', '/notes'],
  ['musings/2026-10-04-kaibisheng', '/musings'], ['terms/privacy-policy', '/terms']
]

for (const [path, back] of pages) {
  test(`${path}: return link and main content use the shared page frame`, async () => {
    const html = await readFile(new URL(`../dist/${path}/index.html`, import.meta.url), 'utf8')
    const links = [...html.matchAll(/<a\b([^>]*\bclass="[^"]*\bsite-back\b[^"]*"[^>]*)>/g)]
    assert.equal(links.length, 1, 'page has one shared return link')
    assert.match(links[0][1], new RegExp(`\\bhref="${back}"`), 'return destination remains correct')
    assert.match(html, /<main\b[^>]*\bclass="[^"]*\bsite-page-main\b/, 'main uses the shared spacing')
  })
}
