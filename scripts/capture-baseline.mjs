import fs from 'node:fs/promises'
import path from 'node:path'

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  return (await Promise.all(entries.map(e => e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name)))).flat()
}
const files = await walk('dist')
const urls = files.filter(p => p.endsWith('.html'))
  .map(p => '/' + path.relative('dist', p).split(path.sep).join('/').replace(/(^|\/)index\.html$/, ''))
  .map(p => p === '/' ? p : p.replace(/\/$/, '')).sort()
await fs.mkdir('docs/rebuild', { recursive: true })
await fs.writeFile('urls.txt', urls.join('\n') + '\n', { flag: 'wx' })
const metrics = {
  commit: 'cf08de85a370c0b7452e9ef0866943fd9497581d', node: process.version,
  buildPages: 67, htmlRoutes: urls.length, distFiles: files.length,
  sitemapEntries: (await fs.readFile('dist/sitemap-0.xml', 'utf8')).match(/<loc>/g).length,
  tests: { total: 50, pass: 48, fail: 2 }
}
await fs.writeFile('docs/rebuild/baseline.json', JSON.stringify(metrics, null, 2) + '\n', { flag: 'wx' })
await fs.cp('dist', 'node_modules/.foundation-baseline', { recursive: true })
for (const [from, to] of [['E:/DevCache/temp/blog-foundation-baseline.log', 'build.log'], ['E:/DevCache/temp/blog-foundation-tests.log', 'tests.log']]) {
  await fs.writeFile('docs/rebuild/' + to, (await fs.readFile(from, 'utf8')).replace(/\x1b\[[0-9;]*m/g, ''))
}
console.log(metrics)
