import { readFile } from 'node:fs/promises'
import assert from 'node:assert/strict'

const index = JSON.parse(await readFile('dist/api/knowledge/index.json', 'utf8'))
let count = 0
for (const entry of index.entries) {
  const pathname = decodeURIComponent(entry.url).replace(/^\/|\/$/g, '')
  const html = await readFile(`dist/${pathname}/index.html`, 'utf8')
  // Article content is prerendered. Interactions may become islands later, but
  // must never turn the body into client-only rendering.
  assert.match(html, /id="main-content"/, `${pathname}: missing static content shell`)
  assert.match(html, /class="site-content/, `${pathname}: missing prerendered content`)
  assert.doesNotMatch(html, /client="only"/, `${pathname}: client-only rendering is not allowed`)
  const islands = [...html.matchAll(/<astro-island\b/g)].length
  console.log(`[islands] /${pathname}: ${islands}`)
  count++
}
console.log(`[islands] ${count} static articles checked; interactive islands are allowed by the agreed scope`)
