// Run after npm run build: node --test tests/tag-sections.test.mjs
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const dist = new URL('../dist/', import.meta.url)
const readPage = (path) => readFile(new URL(path, dist), 'utf8')

test('the Blog tag index excludes Musings tags', async () => {
  const html = await readPage('blog/tags/index.html')
  for (const tag of ['随笔', '记忆', 'astro']) {
    assert.ok(!html.includes(`/tags/${encodeURIComponent(tag)}`), `Blog tag index contains another section's tag ${tag}`)
  }
})

test('section overviews link to their own tag indexes', async () => {
  for (const section of ['blog', 'notes', 'musings']) {
    const html = await readPage(`${section}/index.html`)
    assert.ok(html.includes(`href="/${section}/tags"`))
    assert.ok(!html.includes('href="/tags'))
  }
})

test('old tag URLs redirect to a single scoped page', async () => {
  assert.ok((await readPage('tags/index.html')).includes('content="0;url=/blog/tags"'))
  for (const [section, tag] of [['blog', '写作'], ['notes', 'astro'], ['musings', '随笔']]) {
    const html = await readPage(`tags/${tag}/index.html`)
    assert.ok(html.includes(`url=/${section}/tags/${encodeURIComponent(tag)}`))
    assert.ok(html.includes('content="noindex"'))
  }
})

for (const [section, tag, post] of [
  ['blog', '写作', 'hello-world'],
  ['notes', 'astro', 'astro-theme-pure-notes'],
  ['musings', '随笔', 'fear-of-forgetting']
]) {
  test(`${section} has its own tag index and results`, async () => {
    const index = await readPage(`${section}/tags/index.html`)
    assert.ok(index.includes(`/${section}/tags/${encodeURIComponent(tag)}`))
    const result = await readPage(`${section}/tags/${tag}/index.html`)
    assert.ok(result.includes(`href="/${section}/${post}"`))
    for (const other of ['blog', 'notes', 'musings'].filter((value) => value !== section)) {
      assert.ok(!new RegExp(`href="/${other}/(?!tags)[^"]+"`).test(result), `${section} tag results link to ${other} entries`)
    }
  })
}

test('article tag links stay in their own section', async () => {
  for (const [section, post, tag] of [
    ['blog', 'hello-world', '写作'],
    ['notes', 'astro-theme-pure-notes', 'astro'],
    ['musings', 'fear-of-forgetting', '随笔']
  ]) {
    const html = await readPage(`${section}/${post}/index.html`)
    assert.ok(html.includes(`href="/${section}/tags/${encodeURIComponent(tag)}"`), `${section} article tag link is not scoped`)
    assert.ok(!html.includes('href="/tags/'), `${section} article still links to shared tags`)
  }
})
