import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'

// Two guarantees about the built site:
// 1. every published route still resolves to a file in dist/
// 2. article bodies stay server-rendered instead of becoming client-only

const root = path.resolve('dist')

async function exists(relative) {
  const target = path.resolve(root, relative)
  if (!target.startsWith(root + path.sep)) throw new Error(`Invalid path: ${relative}`)
  try {
    return (await stat(target)).isFile()
  } catch {
    return false
  }
}

const routes = (await readFile('urls.txt', 'utf8')).split(/\r?\n/).filter(Boolean)
const missing = []
for (const route of routes) {
  const relative = decodeURIComponent(route).replace(/^\//, '')
  const candidates = relative === '' ? ['index.html'] : [relative, `${relative}/index.html`, `${relative}.html`]
  let found = false
  for (const candidate of candidates) {
    if (await exists(candidate)) {
      found = true
      break
    }
  }
  if (!found) missing.push(route)
}
if (missing.length) throw new Error(`Missing ${missing.length} routes:\n${missing.join('\n')}`)
console.log(`[routes] ${routes.length} published routes preserved`)

const index = JSON.parse(await readFile(path.join(root, 'api/knowledge/index.json'), 'utf8'))
for (const entry of index.entries) {
  const pathname = decodeURIComponent(entry.url).replace(/^\/|\/$/g, '')
  const html = await readFile(path.join(root, pathname, 'index.html'), 'utf8')
  if (!html.includes('id="main-content"')) throw new Error(`${pathname}: missing prerendered content shell`)
  if (/client="only"/.test(html)) throw new Error(`${pathname}: article body must not render client-only`)
}
console.log(`[render] ${index.entries.length} articles are prerendered`)
