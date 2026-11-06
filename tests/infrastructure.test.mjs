import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import { test } from 'node:test'

// These checks describe the deploy contract, so they run after `npm run build`.
const dist = new URL('../dist/', import.meta.url)
const file = (relative) => new URL(relative, dist)
const exists = async (relative) => {
  await access(file(relative))
  return true
}

async function sitemapUrls() {
  const xml = await readFile(file('sitemap-0.xml'), 'utf8')
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, loc]) =>
    decodeURIComponent(new URL(loc).pathname)
  )
}

async function htmlFor(pathname) {
  const relative = pathname.replace(/^\/+|\/+$/g, '')
  for (const candidate of [`${relative}/index.html`, `${relative}.html`, 'index.html']) {
    try {
      return await readFile(file(candidate), 'utf8')
    } catch {
      // try the next shape
    }
  }
  return null
}

test('agent endpoints are present and readable', async () => {
  const design = await readFile(file('design.md'), 'utf8')
  assert.match(design, /^---\r?\n[\s\S]*?\r?\n---\r?\n\r?\n# /, 'design.md should keep frontmatter and a Markdown body')

  const manifest = JSON.parse(await readFile(file('.well-known/site-manifest.json'), 'utf8'))
  assert.equal(manifest.endpoints.design, '/design.md')
  assert.equal(manifest.endpoints.knowledge, '/api/knowledge/index.json')
  assert.ok(Object.values(manifest.content).reduce((sum, count) => sum + count, 0) > 0)

  const index = JSON.parse(await readFile(file('api/knowledge/index.json'), 'utf8'))
  assert.ok(index.entries.length > 0)
  for (const entry of index.entries) {
    const endpoint = `api/knowledge/${entry.collection}/${entry.id}.json`
    assert.ok(await exists(endpoint), `${endpoint} is missing`)
    const content = JSON.parse(await readFile(file(endpoint), 'utf8'))
    assert.equal(content.canonical, entry.url)
    assert.equal(typeof content.body, 'string')
  }
})

test('sitemap excludes app-only routes and redirect stubs', async () => {
  const urls = await sitemapUrls()
  for (const pathname of urls) {
    assert.ok(pathname !== '/search' && pathname !== '/404', `${pathname} should not be indexed`)
    assert.ok(!pathname.startsWith('/api/'), `${pathname} should not be indexed`)
    assert.ok(!pathname.startsWith('/.well-known/'), `${pathname} should not be indexed`)
    const html = await htmlFor(pathname)
    assert.ok(html, `${pathname} has no built HTML`)
    assert.ok(!/http-equiv=["']refresh["']/i.test(html), `${pathname} is a redirect stub`)
  }
})

test('article pages expose BlogPosting structured data', async () => {
  const urls = await sitemapUrls()
  const articlePath = urls.find((pathname) => /^\/(?:blog|notes|musings)\//.test(pathname))
  assert.ok(articlePath, 'expected at least one article in the sitemap')
  const html = await htmlFor(articlePath)
  assert.ok(html)
  const match = html.match(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/)
  assert.ok(match, `${articlePath} has no JSON-LD`)
  const data = JSON.parse(match[1])
  assert.ok(data['@graph'].some((node) => node['@type'] === 'BlogPosting'))
  const person = data['@graph'].find((node) => node['@type'] === 'Person')
  for (const url of person?.sameAs ?? []) {
    assert.match(url, /^https?:\/\//, `sameAs should be absolute: ${url}`)
  }
})

test('search and 404 are marked noindex', async () => {
  for (const pathname of ['/search', '/404']) {
    const html = await htmlFor(pathname)
    assert.ok(html, `${pathname} has no built HTML`)
    assert.match(html, /<meta[^>]+name=["']robots["'][^>]+content=["']noindex/i)
  }
})
