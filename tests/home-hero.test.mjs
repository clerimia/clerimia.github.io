// Run after npm run build: node --test tests/home-hero.test.mjs
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const homePage = new URL('../dist/index.html', import.meta.url)
const readHome = () => readFile(homePage, 'utf8')

const readHero = (html) => {
  const hero = html.match(/<section\b[^>]*class="home-hero"[^>]*>[\s\S]*?<\/section>/)?.[0]
  assert.ok(hero, 'homepage must retain its labelled hero section')
  return hero
}

test('hero gives reading destinations priority over the optional terminal', async () => {
  const hero = readHero(await readHome())
  const actions = hero.match(/<div class="home-actions">[\s\S]*?<\/div>/)?.[0]
  assert.ok(actions, 'reading actions must exist in the hero')
  assert.match(actions, /class="home-reading-link"[^>]*href="\/blog"/)
  assert.match(actions, /class="home-notes-link"[^>]*href="\/notes"/)
  assert.ok(actions.indexOf('href="/notes"') < actions.indexOf('data-terminal-trigger'))
})

test('recent posts come immediately after the hero, with the quote after the posts', async () => {
  const html = await readHome()
  const hero = readHero(html)
  const latest = html.indexOf('class="home-latest"')
  const quote = html.indexOf('class="home-daily-note"')
  assert.ok(latest > html.indexOf(hero))
  assert.ok(quote > latest, 'daily quote must not delay the reading preview')
  assert.ok(!hero.includes('data-daily-quote'))
  assert.match(html, /<\/section>\s*<section class="home-latest"/)
})

test('terminal entry retains native button and dialog semantics', async () => {
  const hero = readHero(await readHome())
  const trigger = hero.match(/<button\b[^>]*data-terminal-trigger[^>]*>[\s\S]*?<\/button>/)?.[0]
  assert.ok(trigger)
  for (const attribute of [
    'data-terminal-trigger',
    'type="button"',
    'aria-haspopup="dialog"',
    'aria-controls="terminal-dialog"',
    'aria-expanded="false"'
  ]) {
    assert.ok(trigger.includes(attribute), `terminal must retain ${attribute}`)
  }
  assert.ok(trigger.includes('在终端里逛逛'), 'the entry has a visible accessible name')
  assert.ok(!trigger.includes('home-peek-out'), 'the large command inventory must not return')
})

test('hero preserves its identity and both theme avatars', async () => {
  const hero = readHero(await readHome())
  assert.match(hero, /aria-labelledby="home-hero-heading"/)
  assert.match(hero, /id="home-hero-heading"/)
  assert.match(hero, /class="home-name">clerimia/)
  assert.match(hero, /class="home-avatar--light"/)
  assert.match(hero, /class="home-avatar--dark"/)
})
