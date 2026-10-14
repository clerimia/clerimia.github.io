// Run after npm run build: node --test tests/post-sections.test.mjs
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const dist = new URL('../dist/', import.meta.url)
const readPage = (path) => readFile(new URL(path, dist), 'utf8')
const essayTitle = '我还没有开始遗忘，就已经开始害怕遗忘'
const essayPath = '/musings/fear-of-forgetting'

test('blog and essay lists are disjoint', async () => {
  const blog = await readPage('blog/index.html')
  const essays = await readPage('musings/index.html')
  assert.ok(blog.includes('href="/blog/hello-world"'))
  assert.ok(!blog.includes(essayTitle))
  assert.ok(essays.includes(`href="${essayPath}"`))
  assert.ok(essays.includes(essayTitle))
  assert.ok(!essays.includes('href="/blog/hello-world"'))
  assert.ok(essays.includes('href="/musings/interview-beyond-the-result"'))
  assert.ok(essays.includes('href="/musings/2026-10-04-kaibisheng"'))
})

test('homepage places the essay only in its own section', async () => {
  const home = await readPage('index.html')
  const sections = [...home.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/g)].map(([html]) => html)
  const blog = sections.find((html) => /<h2>Blog<\/h2>/.test(html))
  const essays = sections.find((html) => /<h2>Musings<\/h2>/.test(html))
  assert.ok(blog?.includes('href="/blog/hello-world"'))
  assert.ok(!blog.includes(essayTitle))
  assert.ok(essays?.includes(`href="${essayPath}"`))
})

test('essay detail, return link, tag links and feed use the essay URL', async () => {
  const article = await readPage('musings/fear-of-forgetting/index.html')
  assert.ok(article.includes(essayTitle))
  assert.ok(article.includes('即使我终究会遗忘，也不必在阅读开始之前，就为遗忘感到恐惧。'))
  assert.match(article, /href="\/musings"[^>]*>[\s\S]*?返回/)
  assert.ok(!article.includes('<em>——一场关于记忆力的内心探索</em>'))
  assert.ok(article.includes('参与讨论'))
  assert.ok(article.includes('essays/fear-of-forgetting'))
  const tag = await readPage('tags/随笔/index.html')
  assert.ok(tag.includes(`href="${essayPath}"`))
  const feed = await readPage('rss.xml')
  assert.ok(feed.includes(`https://clerimia.github.io${essayPath}`))
  assert.ok(!feed.includes('https://clerimia.github.io/blog/fear-of-forgetting'))
})

test('blog archive excludes the essay and the old URL only redirects', async () => {
  assert.ok(!(await readPage('archives/index.html')).includes(essayTitle))
  const redirect = await readPage('blog/fear-of-forgetting/index.html')
  assert.ok(redirect.includes(`content="0;url=${essayPath}"`))
  assert.ok(redirect.includes('content="noindex"'))
  const oldEssay = await readPage('essays/fear-of-forgetting/index.html')
  assert.ok(oldEssay.includes(`content="0;url=${essayPath}"`))
  assert.ok((await readPage('essays/index.html')).includes('content="0;url=/musings"'))
})
