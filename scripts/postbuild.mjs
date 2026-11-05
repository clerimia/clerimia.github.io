import { readdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

// Post-build sitemap hygiene:
// 1. remove app-only routes (search, 404, API, well-known)
// 2. remove static redirect stubs (their canonical points elsewhere)
// 3. add lastmod from content frontmatter so crawlers can see updates
const root = process.cwd()
const dist = path.join(root, 'dist')
const sitemapPath = path.join(dist, 'sitemap-0.xml')
const contentRoot = path.join(root, 'src', 'content')
const collections = ['blog', 'notes', 'musings']

const sitemap = await readFile(sitemapPath, 'utf8')
const originMatch = sitemap.match(/<loc>(.*?)<\/loc>/)
if (!originMatch) throw new Error('Sitemap has no <loc> entries')

const decodePath = (value) => {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...(await walk(full)))
    else if (/\.mdx?$/.test(entry.name)) files.push(full)
  }
  return files
}

function frontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  const result = {}
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/)
    if (field) result[field[1]] = field[2].trim().replace(/^['"]|['"]$/g, '')
  }
  return result
}

function normalizedDate(value) {
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date.toISOString().slice(0, 10)
}

async function collectLastmod() {
  const result = new Map()
  for (const collection of collections) {
    const directory = path.join(contentRoot, collection)
    let files = []
    try {
      files = await walk(directory)
    } catch {
      continue
    }
    for (const file of files) {
      const data = frontmatter(await readFile(file, 'utf8'))
      if (data.draft === 'true') continue
      const id = path
        .relative(directory, file)
        .split(path.sep)
        .join('/')
        .replace(/\/index\.mdx?$/, '')
        .replace(/\.mdx?$/, '')
      const url =
        collection === 'blog'
          ? data.section === 'essays'
            ? `/musings/${id}`
            : `/blog/${id}`
          : collection === 'notes'
            ? `/notes/${id}`
            : `/musings/${id}`
      const date = normalizedDate(data.updatedDate ?? data.publishDate)
      if (date) result.set(url, date)
    }
  }
  return result
}

async function fileExists(file) {
  try {
    return (await stat(file)).isFile()
  } catch {
    return false
  }
}

async function htmlFileFor(pathname) {
  const relative = decodePath(pathname).replace(/^\/+|\/+$/g, '')
  if (!relative) return path.join(dist, 'index.html')
  const target = path.resolve(dist, relative)
  if (!target.startsWith(path.resolve(dist) + path.sep)) return null
  for (const candidate of [path.join(target, 'index.html'), `${target}.html`]) {
    if (await fileExists(candidate)) return candidate
  }
  return null
}

async function isRedirect(file) {
  if (!file) return false
  const html = await readFile(file, 'utf8')
  return /http-equiv=["']refresh["']/i.test(html)
}

const lastmod = await collectLastmod()
const excluded = (pathname) =>
  new Set(['/search', '/404']).has(pathname) ||
  pathname.startsWith('/api/') ||
  pathname.startsWith('/.well-known/')

let kept = 0
let removed = 0
let dated = 0
const urls = []

for (const match of sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
  const block = match[1]
  const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1]
  if (!loc) continue
  const pathname = decodePath(new URL(loc).pathname)
  if (excluded(pathname)) {
    removed++
    continue
  }
  if (await isRedirect(await htmlFileFor(pathname))) {
    removed++
    continue
  }
  const date = lastmod.get(pathname)
  const withDate =
    date && !block.includes('<lastmod>') ? `${block}<lastmod>${date}</lastmod>` : block
  if (date) dated++
  urls.push(`<url>${withDate}</url>`)
  kept++
}

const header = sitemap.slice(0, sitemap.indexOf('<url>'))
await writeFile(sitemapPath, `${header}${urls.join('')}</urlset>`)
console.log(`[sitemap] kept ${kept}, removed ${removed}, lastmod ${dated}`)
