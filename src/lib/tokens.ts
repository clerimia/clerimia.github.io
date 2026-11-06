/** Media queries used by interactive components, in CSS pixels.
 * CSS media/container queries cannot read custom properties, so keep these
 * behavioral thresholds aligned with the documented page-frame rules.
 */
export const breakpoints = {
  compact: 680,
  navigation: 760,
  wide: 1000,
  articleContainer: 936
} as const

export const mediaQueries = {
  compact: `(max-width: ${breakpoints.compact}px)`,
  navigation: `(max-width: ${breakpoints.navigation}px)`,
  wide: `(min-width: ${breakpoints.wide}px)`,
  reducedMotion: '(prefers-reduced-motion: reduce)',
  coarsePointer: '(pointer: coarse)',
  darkPreference: '(prefers-color-scheme: dark)'
} as const

/** Motion values belong to tokens.css; JavaScript reads the active CSS values. */
export const motion = {
  feedback: '--motion-feedback',
  overlay: '--motion-overlay'
} as const

/** Browser-only: call when an interaction starts, after the global CSS loads. */
export function motionDuration(name: keyof typeof motion, element: Element = document.documentElement): number {
  if (window.matchMedia(mediaQueries.reducedMotion).matches) return 0
  const value = getComputedStyle(element).getPropertyValue(motion[name]).trim()
  const match = value.match(/^(\d+(?:\.\d+)?)(ms|s)$/)
  if (!match) throw new Error(`Missing or invalid CSS duration: ${motion[name]}`)
  return Number(match[1]) * (match[2] === 's' ? 1000 : 1)
}
