import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'

const css = await readFile(new URL('../src/assets/styles/color-tokens.css', import.meta.url), 'utf8')
const blocks = [...css.matchAll(/(?:^|\n)(:root, \.token-theme|\.dark)\s*\{([^}]*)\}/g)]
const declarations = (text) =>
  Object.fromEntries(
    [...text.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map(([, key, value]) => [key, value.trim()])
  )
const light = declarations(blocks[0][2])
const dark = { ...light, ...declarations(blocks[1][2]) }

function resolve(name, values, visited = []) {
  assert.ok(!visited.includes(name), `circular token ${name}`)
  assert.ok(values[name], `missing token ${name}`)
  return values[name].replace(/var\((--[\w-]+)\)/g, (_, child) =>
    resolve(child, values, [...visited, name])
  )
}

function luminance(name, values) {
  const resolved = resolve(name, values)
  const color = resolved.startsWith('hsl(') ? resolved : `hsl(${resolved})`
  const match = color.match(/^hsl\(\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*\)$/)
  assert.ok(match, `${name} is not a complete HSL color: ${color}`)
  const [h, s, l] = match.slice(1).map(Number)
  const a = (s / 100) * Math.min(l / 100, 1 - l / 100)
  const channel = (n) => {
    const k = (n + h / 30) % 12
    const value = l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  }
  return channel(0) * 0.2126 + channel(8) * 0.7152 + channel(4) * 0.0722
}

function contrast(first, second, values) {
  const [low, high] = [luminance(first, values), luminance(second, values)].sort((a, b) => a - b)
  return (high + 0.05) / (low + 0.05)
}

test('paired theme tokens remain legible in both themes', () => {
  const pairs = [
    ['--foreground', '--background'],
    ['--card-foreground', '--card'],
    ['--popover-foreground', '--popover'],
    ['--primary-foreground', '--primary'],
    ['--secondary-foreground', '--secondary'],
    ['--muted-foreground', '--muted'],
    ['--accent-foreground', '--accent'],
    ['--destructive-foreground', '--destructive'],
    ['--primary', '--background'],
    ['--primary', '--card'],
    ['--primary', '--accent'],
    ['--primary-hover', '--accent'],
    ['--primary-active', '--accent'],
    ['--sidebar-foreground', '--sidebar'],
    ['--sidebar-primary-foreground', '--sidebar-primary'],
    ['--sidebar-accent-foreground', '--sidebar-accent'],
    ...['info', 'success', 'warning', 'error'].flatMap((status) => [
      [`--status-${status}`, `--status-${status}-surface`],
      [`--status-${status}`, '--background'],
      [`--status-${status}`, '--card'],
      [`--status-${status}`, '--term-canvas']
    ])
  ]
  for (const [theme, values] of [
    ['light', light],
    ['dark', dark]
  ]) {
    for (const [foreground, surface] of pairs) {
      const ratio = contrast(foreground, surface, values)
      assert.ok(ratio >= 4.5, `${theme} ${foreground} on ${surface}: ${ratio.toFixed(2)}:1`)
    }
  }
})

test('theme tokens map directly to the palette', () => {
  assert.equal(resolve('--background', light), resolve('--palette-neutral-25', light))
  assert.equal(resolve('--background', dark), resolve('--palette-neutral-950', dark))
  assert.equal(resolve('--primary', light), resolve('--palette-green-700', light))
  assert.equal(resolve('--primary', dark), resolve('--palette-wine-300', dark))
  assert.equal(resolve('--ring', light), resolve('--palette-green-800', light))
  assert.equal(resolve('--ring', dark), resolve('--palette-green-200', dark))
  assert.equal(resolve('--destructive', light), resolve('--palette-red-700', light))
  assert.equal(resolve('--destructive', dark), resolve('--palette-red-200', dark))
  assert.equal(resolve('--chart-1', light), resolve('--palette-green-700', light))
  assert.equal(resolve('--chart-5', dark), resolve('--palette-rose-200', dark))
  assert.notEqual(resolve('--muted', dark), resolve('--secondary', dark), 'dark muted and selection differ')
  assert.notEqual(resolve('--accent', dark), resolve('--secondary', dark), 'dark accent and selection differ')
})

test('duplicate color layers and legacy aliases are gone', () => {
  const removed = [
    '--token-canvas',
    '--color-canvas',
    '--color-text',
    '--color-action',
    '--color-selection',
    '--color-identity',
    '--color-data-1',
    '--data-1',
    '--paper',
    '--ink',
    '--quiet',
    '--rule',
    '--leaf',
    '--wash',
    '--card-tint',
    '--chip-tint',
    '--active-tint'
  ]
  for (const name of removed) {
    assert.ok(!(name in light), `${name} should be removed`)
    assert.ok(!(name in dark), `${name} should be removed`)
  }
})

test('generated color documentation matches CSS tokens', () => {
  execFileSync(process.execPath, ['scripts/sync-color-docs.mjs', '--check'], {
    cwd: new URL('..', import.meta.url)
  })
})
