import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

export async function verifyUrls(listPath = 'urls.txt', directory = 'dist') {
  const root = path.resolve(directory)
  const routes = (await readFile(listPath, 'utf8')).split(/\r?\n/).filter(Boolean)
  const missing = []
  for (const route of routes) {
    const relative = decodeURIComponent(route).replace(/^\//, '')
    const candidates = relative === '' ? ['index.html'] : [relative, `${relative}/index.html`, `${relative}.html`]
    let exists = false
    for (const candidate of candidates) {
      const filename = path.resolve(root, candidate)
      if (!filename.startsWith(root + path.sep)) throw new Error(`Invalid route: ${route}`)
      try { if ((await stat(filename)).isFile()) { exists = true; break } } catch {}
    }
    if (!exists) missing.push(route)
  }
  if (missing.length) throw new Error(`Missing ${missing.length} routes:\n${missing.join('\n')}`)
  return routes.length
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  console.log(`[routes] ${await verifyUrls(process.argv[2])} baseline routes preserved`)
}
