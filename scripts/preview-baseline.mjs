import { readFile, stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import path from 'node:path'

// Serves the captured pre-rebuild baseline copy for side-by-side comparison.
const root = path.resolve('node_modules/.foundation-baseline')
const port = 4599
const mime = { '.css': 'text/css', '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.ttf': 'font/ttf', '.webp': 'image/webp', '.xml': 'application/xml', '.ico': 'image/x-icon' }
createServer(async (req, res) => {
  const decoded = decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname)
  const target = path.resolve(root, `.${decoded}`)
  for (const candidate of [target, path.join(target, 'index.html'), `${target}.html`]) {
    try { if ((await stat(candidate)).isFile()) { res.writeHead(200, { 'Content-Type': mime[path.extname(candidate)] ?? 'application/octet-stream' }); return res.end(await readFile(candidate)) } } catch {}
  }
  res.writeHead(404, { 'Content-Type': 'text/html' }); res.end(await readFile(path.join(root, '404.html')).catch(() => 'missing'))
}).listen(port, '127.0.0.1', () => console.log(`Baseline: http://127.0.0.1:${port}`))
