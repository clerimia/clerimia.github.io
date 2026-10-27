// Browser regression helper: open a site page before calling this function.
import assert from 'node:assert/strict'

export async function checkDesignSystemThemes(page) {
  for (const theme of ['light', 'dark']) {
    const dark = await page.evaluate(() => document.documentElement.classList.contains('dark'))
    if (dark !== (theme === 'dark')) await page.click('#site-theme-toggle', { label: '切换博客主题' })

    const state = await page.evaluate(() => {
      const color = (value) => {
        const probe = document.createElement('span')
        probe.style.color = value
        document.body.appendChild(probe)
        const result = getComputedStyle(probe).color
        probe.remove()
        return result
      }
      const contrast = (first, second) => {
        const luminance = (rgb) => {
          const components = rgb.match(/\d+(?:\.\d+)?/g).slice(0, 3).map(Number)
          return components.map((component) => {
            const value = component / 255
            return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
          }).reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0)
        }
        const [a, b] = [luminance(first), luminance(second)].sort((x, y) => x - y)
        return (b + 0.05) / (a + 0.05)
      }
      const canvas = color('var(--color-canvas)')
      const text = color('var(--color-text)')
      const muted = color('var(--color-text-muted)')
      const action = color('var(--color-action)')
      const actionInk = color('var(--color-action-ink)')
      const selection = color('var(--color-selection)')
      const focus = color('var(--color-focus)')
      const surface = color('var(--color-surface)')
      const dark = document.documentElement.classList.contains('dark')
      return {
        dark,
        pressed: document.getElementById('site-theme-toggle')?.getAttribute('aria-pressed'),
        canvas,
        body: getComputedStyle(document.body).backgroundColor,
        themeCanvas: color('hsl(var(--background))'),
        text,
        themeText: color('hsl(var(--foreground))'),
        action,
        themeAction: color('hsl(var(--primary))'),
        ratios: {
          text: contrast(text, canvas),
          muted: contrast(muted, canvas),
          action: contrast(action, canvas),
          actionInk: contrast(actionInk, action),
          selection: contrast(action, selection),
          focus: contrast(focus, canvas),
          success: contrast(color('var(--color-status-success)'), surface),
          warning: contrast(color('var(--color-status-warning)'), surface),
          error: contrast(color('var(--color-status-error)'), surface),
          ...(dark && { expression: contrast(color('var(--color-expression-ink)'), color('var(--color-expression-surface)')) })
        }
      }
    })

    assert.equal(state.dark, theme === 'dark')
    assert.equal(state.pressed, String(state.dark))
    assert.equal(state.body, state.canvas, 'the page uses the theme canvas')
    assert.equal(state.themeCanvas, state.canvas, 'theme background matches the semantic token')
    assert.equal(state.themeText, state.text, 'theme text matches the semantic token')
    assert.equal(state.themeAction, state.action, 'theme primary matches the semantic token')
    for (const [name, ratio] of Object.entries(state.ratios)) {
      assert.ok(ratio >= (name === 'focus' ? 3 : 4.5), `${theme} ${name} contrast is ${ratio.toFixed(2)}:1`)
    }
    console.log({ theme, ratios: state.ratios })
  }
}
