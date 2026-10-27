// Run after npm run build: node --test tests/ui-ux-regressions.test.mjs
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const readPage = (path) => readFile(new URL(`../dist/${path}`, import.meta.url), 'utf8')

test('friend information uses native, labelled copy buttons', async () => {
  const html = await readPage('links/index.html')
  const fields = html.match(/<dl\b[^>]*class="friend-info\b[^"]*"[\s\S]*?<\/dl>/)?.[0]
  assert.ok(fields, 'friend information must use a description list')
  const buttons = [...fields.matchAll(/<button\b([^>]*data-copy-value[^>]*)>[\s\S]*?<\/button>/g)]
  assert.equal(buttons.length, 4)
  for (const [button, attributes] of buttons) {
    assert.match(attributes, /type="button"/)
    assert.match(attributes, /aria-label="复制 /)
    assert.match(attributes, /aria-describedby="friend-copy-status"/)
    assert.ok(!button.includes('onclick='), 'values must not be interpolated into inline scripts')
  }
  assert.match(html, /id="friend-copy-status"[^>]*role="status"/)
})

test('friend information retains the complete site and avatar URLs', async () => {
  const html = await readPage('links/index.html')
  assert.match(html, /data-copy-value="https:\/\/clerimia\.github\.io\/"/)
  assert.match(
    html,
    /data-copy-value="https:\/\/avatars\.githubusercontent\.com\/u\/128227262\?v=4"/
  )
})

test('policy overview addresses visitors and retains all policy destinations', async () => {
  const html = await readPage('terms/index.html')
  assert.ok(html.includes('站点政策'))
  assert.ok(html.includes('政策与说明'))
  assert.ok(!html.includes('Help Information'))
  assert.ok(!html.includes('You need to add md files'))
  for (const path of ['privacy-policy', 'terms-and-conditions', 'copyright', 'disclaimer']) {
    assert.ok(html.includes(`href="/terms/${path}"`), `${path} must remain reachable`)
  }
})

test('policy detail pages do not enter the article search index', async () => {
  for (const path of ['privacy-policy', 'terms-and-conditions', 'copyright', 'disclaimer']) {
    const html = await readPage(`terms/${path}/index.html`)
    assert.ok(!html.includes('data-pagefind-body'), `${path} remains outside article search`)
  }
})
