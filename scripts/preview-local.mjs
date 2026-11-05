import { readFile, stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import path from 'node:path'

// Zero-dependency static preview for the exact files GitHub Pages will serve.
// `astro preview` is still available; this one mirrors a plain static host.
const root = path.resolve(process.cwd(), 'dist')
const port = Number(process.env.PORT ?? 4321)

const mime = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.webmanifest': 'application/manifest+json',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8'
}

async function resolveFile(pathname) {
  const decoded = decodeURIComponent(pathname)
  const target = path.resolve(root, `.${decoded}`)
  if (!target.startsWith(root + path.sep) && target !== root) return null
  const candidates = [target, path.join(target, 'index.html'), `${target}.html`]
  for (const candidate of candidates) {
    try {
      if ((await stat(candidate)).isFile()) return candidate
    } catch {
      // try the next candidate
    }
  }
  return null
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`)
  const file = await resolveFile(url.pathname)
  const notFound = !file
  const body = await readFile(notFound ? path.join(root, '404.html') : file).catch(() => null)
  if (!body) {
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Preview build not found. Run npm run build first.')
    return
  }
  response.writeHead(notFound ? 404 : 200, {
    'Content-Type': mime[path.extname(notFound ? '.html' : file)] ?? 'application/octet-stream'
  })
  response.end(request.method === 'HEAD' ? undefined : body)
})

server.listen(port, '127.0.0.1', () => {
  console.log(`Preview: http://127.0.0.1:${port}`)
})
