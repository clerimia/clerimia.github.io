// 生成首页首屏头像环 src/components/home/HeroVine.astro。
// 用法：node scripts/generate-hero-vine.mjs
//
// 坐标以头像框为 100×100：头像圆心 (50 50)，半径 50。
// 藤环从左下起笔，逆时针绕过底部、右侧和顶部，在左上收尾，缺口留在左侧。
// 藤身与叶片共用一条生长时间轴：生长到哪个位置，哪片叶就在那里展开；
// 七片叶基本等距，整枝长成后另有一片较透明的叶子从末梢附近向下飘落，只播放一次。
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(root, 'src/components/home/HeroVine.astro')

const CX = 50
const CY = 50
const TAU = Math.PI * 2
const rad = (deg) => (deg * Math.PI) / 180

// 与 home.css 的 .home-vine__reveal 保持同一条缓动曲线，才能反推叶片出现时刻。
const GROW_DELAY = 0.55
const GROW_DURATION = 3.0
const GROW_EASE = 'cubic-bezier(0.35, 0.05, 0.25, 1)'
const FALL_DELAY = GROW_DELAY + GROW_DURATION + 0.72

const n2 = (v) => (Math.round(v * 100) / 100).toString()
const point = (p) => `${n2(p.x)} ${n2(p.y)}`

// 给定 CSS cubic-bezier 的输出进度，反求它发生的归一化时间。
function cubicBezierTimeAtProgress(x1, y1, x2, y2) {
  const cx = 3 * x1
  const bx = 3 * (x2 - x1) - cx
  const ax = 1 - cx - bx
  const cy = 3 * y1
  const by = 3 * (y2 - y1) - cy
  const ay = 1 - cy - by
  const sampleX = (t) => ((ax * t + bx) * t + cx) * t
  const sampleY = (t) => ((ay * t + by) * t + cy) * t

  return (progress) => {
    let lo = 0
    let hi = 1
    for (let i = 0; i < 28; i++) {
      const mid = (lo + hi) / 2
      if (sampleY(mid) < progress) lo = mid
      else hi = mid
    }
    return sampleX((lo + hi) / 2)
  }
}

const growTimeAt = cubicBezierTimeAtProgress(0.35, 0.05, 0.25, 1)
const growthTime = (s) => GROW_DELAY + GROW_DURATION * growTimeAt(s)

function tangentAt(points, i) {
  const a = points[Math.max(0, i - 1)]
  const b = points[Math.min(points.length - 1, i + 1)]
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.hypot(dx, dy) || 1
  return { x: dx / len, y: dy / len, angle: (Math.atan2(dy, dx) * 180) / Math.PI }
}

// 左右两条边分别取宽，避免整条藤看起来像从一条线挤出来的。
function ribbonPath(points, widthsL, widthsR) {
  const left = []
  const right = []
  for (let i = 0; i < points.length; i++) {
    const t = tangentAt(points, i)
    const nx = -t.y
    const ny = t.x
    left.push({ x: points[i].x + nx * (widthsL[i] / 2), y: points[i].y + ny * (widthsL[i] / 2) })
    right.push({ x: points[i].x - nx * (widthsR[i] / 2), y: points[i].y - ny * (widthsR[i] / 2) })
  }
  const d = ['M', point(left[0])]
  for (let i = 1; i < left.length; i++) d.push('L', point(left[i]))
  for (let i = right.length - 1; i >= 0; i--) d.push('L', point(right[i]))
  d.push('Z')
  return d.join(' ')
}

function centerlinePath(points) {
  const d = ['M', point(points[0])]
  for (let i = 1; i < points.length; i++) d.push('L', point(points[i]))
  return d.join(' ')
}

function leafPath(L, W) {
  const tip = { x: L, y: 0.02 * W }
  return [
    'M0 0',
    `C${n2(0.12 * L)} ${n2(-0.62 * W)} ${n2(0.52 * L)} ${n2(-0.72 * W)} ${n2(tip.x)} ${n2(tip.y)}`,
    `C${n2(0.6 * L)} ${n2(0.52 * W)} ${n2(0.16 * L)} ${n2(0.4 * W)} 0 0`,
    'Z'
  ].join(' ')
}

function leafPathAlt(L, W) {
  const tip = { x: L, y: -0.08 * W }
  return [
    'M0 0',
    `C${n2(0.1 * L)} ${n2(-0.5 * W)} ${n2(0.46 * L)} ${n2(-0.78 * W)} ${n2(tip.x)} ${n2(tip.y)}`,
    `C${n2(0.66 * L)} ${n2(0.34 * W)} ${n2(0.24 * L)} ${n2(0.5 * W)} 0 0`,
    'Z'
  ].join(' ')
}

function veinPath(L, W) {
  return `M${n2(0.05 * L)} 0 C${n2(0.35 * L)} ${n2(-0.16 * W)} ${n2(0.65 * L)} ${n2(-0.12 * W)} ${n2(0.94 * L)} ${n2(-0.01 * W)}`
}

function sideVeins(L, W) {
  return (
    `M${n2(0.34 * L)} ${n2(-0.04 * W)} Q${n2(0.42 * L)} ${n2(-0.4 * W)} ${n2(0.46 * L)} ${n2(-0.66 * W)} ` +
    `M${n2(0.52 * L)} ${n2(-0.05 * W)} Q${n2(0.6 * L)} ${n2(-0.36 * W)} ${n2(0.63 * L)} ${n2(-0.58 * W)}`
  )
}

// 卷须画成由粗到细的实体带，末端收成尖，不用等宽描边（等宽会在卷心留下一个圆点）。
function tendrilPath(scale) {
  const pts = []
  const steps = 46
  for (let i = 0; i <= steps; i++) {
    const s = i / steps
    const ang = -Math.PI + s * 1.9 * TAU
    const r = 2.7 * scale * (1 - 0.78 * s)
    pts.push({ x: 2.7 * scale + r * Math.cos(ang), y: 0.35 * scale + r * Math.sin(ang) * 0.82 })
  }
  const widths = pts.map((_, i) => 0.62 - 0.52 * (i / steps))
  return ribbonPath(pts, widths, widths)
}

// ---------- 藤环 ----------

const RING_START = 138 // 从左下起笔
const RING_SWEEP = -292 // 逆时针绕过底部、右侧和顶部，在左上收尾
const RING_CX = 49.5
const RING_CY = 50
const RING_R = 54

/* 环沿头像外沿收近；微小起伏与倾斜保留枝条感，不做成规整光环。 */
const ringRadius = (s) => RING_R + 0.8 * Math.sin(2.1 * TAU * s + 1.2)
const ringPoint = (thetaDeg, s) => {
  const th = rad(thetaDeg)
  const r = ringRadius(s)
  const x = r * Math.cos(th)
  const y = r * Math.sin(th) * 0.985
  const tilt = rad(-4)
  return {
    x: RING_CX + x * Math.cos(tilt) - y * Math.sin(tilt),
    y: RING_CY + x * Math.sin(tilt) + y * Math.cos(tilt)
  }
}

const ringSteps = 160
const ring = []
for (let i = 0; i <= ringSteps; i++) {
  const s = i / ringSteps
  const p = ringPoint(RING_START + RING_SWEEP * s, s)
  ring.push({ x: p.x, y: p.y, s })
}

const ringN = ring.length

// 藤身只留轻微粗细变化，两端自然收细，避免成为一圈厚色带。
const wobble = (i) => 1 + 0.03 * Math.sin(i * 0.21 + 1.3) + 0.015 * Math.sin(i * 0.06 + 4.1)

const widths = ring.map((p, i) => {
  const cap = Math.min(1, p.s / 0.07, (1 - p.s) / 0.13)
  return (0.45 + 1.85 * Math.sqrt(Math.max(0, cap))) * wobble(i)
})

const widthsL = widths.map((w, i) => w * (1 + 0.04 * Math.sin(i * 0.19 + 0.7)))
const widthsR = widths.map((w, i) => w * (1 + 0.04 * Math.sin(i * 0.23 + 2.9)))

// ---------- 叶与卷须 ----------

const BASE_LEAF_L = 19
const BASE_LEAF_W = 11.5

// s 是叶片在藤身上的归一化生长位置；七片叶基本等距，全部留在藤上。
// 右侧第五片保持朝外；顶部两片不挪位置，只让叶尖略向左下倾。
const ringLeafSpecs = [
  { s: 0.08, size: 0.7, off: 14 },
  { s: 0.22, size: 0.62, off: -12 },
  { s: 0.36, size: 0.82, off: 16 },
  { s: 0.5, size: 0.66, off: -10 },
  { s: 0.64, size: 0.78, off: 14, down: false },
  { s: 0.78, size: 0.82 * 0.97, angle: 222 },
  { s: 0.92, size: 0.82, angle: 187 }
]

const nodeIndices = ringLeafSpecs.map((spec) => Math.round(spec.s * (ringN - 1)))

for (const idx of nodeIndices) {
  for (let i = Math.max(0, idx - 4); i <= Math.min(widths.length - 1, idx + 4); i++) {
    const d = i - idx
    const bump = 1 + 0.1 * Math.exp(-(d * d) / 3.2)
    widths[i] *= bump
    widthsL[i] *= bump
    widthsR[i] *= bump
  }
}

const stemD = ribbonPath(ring, widthsL, widthsR)
const centerD = centerlinePath(ring)

const shadePts = ring.map((p, i) => {
  const t = tangentAt(ring, i)
  const off = widths[i] * 0.2
  return { x: p.x - t.y * off, y: p.y + t.x * off }
})
const stemShadeD = ribbonPath(
  shadePts,
  widths.map((w) => w * 0.32),
  widths.map((w) => w * 0.32)
)

function leafMarkup({ rotation, x, y, size, petiole, outline, delay, variant, alpha }) {
  const L = BASE_LEAF_L * size
  const W = BASE_LEAF_W * size
  const style = `--d:${delay.toFixed(2)}s; --o:${alpha.toFixed(2)}`
  const leafClass = outline
    ? "class='home-vine__leaf home-vine__leaf--outline'"
    : "class='home-vine__leaf'"
  const veins = size >= 0.8 ? `<path class='home-vine__vein home-vine__vein--side' d='${sideVeins(L, W)}'/>` : ''
  return [
    `<g transform='translate(${n2(x)} ${n2(y)}) rotate(${n2(rotation)})'>`,
    `<g class='home-vine__sprout' style='${style}'>`,
    `<g class='home-vine__sprout-inner'>`,
    `<path class='home-vine__petiole' d='M0 0 Q${n2(petiole * 0.5)} ${n2(-petiole * 0.35)} ${n2(petiole)} 0'/>`,
    `<g transform='translate(${n2(petiole)} 0)'>`,
    `<path ${leafClass} d='${(variant ? leafPathAlt : leafPath)(L, W)}'/>`,
    `<path class='home-vine__vein' d='${veinPath(L, W)}'/>`,
    veins,
    `</g>`,
    `</g>`,
    `</g>`,
    `</g>`
  ].join('')
}

function ringLeafMarkup(spec, i) {
  const s = spec.s
  const theta = RING_START + RING_SWEEP * s
  const p = ringPoint(theta, s)
  const outward = (Math.atan2(p.y - CY, p.x - CX) * 180) / Math.PI
  // 默认朝外下方垂；spec.angle 可直接指定叶尖朝向，用于需要单独调整的叶片。
  let rotation = spec.angle ?? outward + spec.off
  if (spec.angle == null && spec.down !== false && Math.sin(rad(rotation)) < 0) {
    rotation = -rotation
  }
  return leafMarkup({
    rotation,
    x: p.x,
    y: p.y,
    size: spec.size,
    petiole: 3.0 + (i % 3) * 0.4,
    outline: false,
    delay: growthTime(s),
    variant: i % 2 === 0,
    alpha: 0.8
  })
}

function tipTendril(p, angle, scale, delay) {
  return `<g transform='translate(${n2(p.x)} ${n2(p.y)}) rotate(${n2(angle)})'><path class='home-vine__tendril' d='${tendrilPath(scale)}' style='--d:${delay.toFixed(2)}s'/></g>`
}

const headP = ring[0]
const headTan = tangentAt(ring, 0)
const tailP = ring[ringN - 1]
const tailTan = tangentAt(ring, ringN - 1)

// 两头都收成卷须：起笔那头随起笔勾回，生长那头等整枝长成再甩出去。
const tipTendrils =
  tipTendril(headP, headTan.angle + 148, 0.66, GROW_DELAY + 0.25) +
  tipTendril(tailP, tailTan.angle - 42, 0.7, GROW_DELAY + GROW_DURATION)

const ringLeaves = ringLeafSpecs.map(ringLeafMarkup).join('')

// 另有一片较透明的叶子从末梢外缘脱离，不参与七片常驻叶的排布。
// 外层只做定位；落叶的初始朝向与翻转都交给 CSS，保证下坠方向不被父级旋转带偏。
const FALL_LEAF = leafPath(10.5, 6.2)
const fallingLeaf =
  `<g transform='translate(-15 23)'>` +
  `<path class='home-vine__fall-leaf' d='${FALL_LEAF}' style='--fall-d:${FALL_DELAY.toFixed(2)}s'/>` +
  `</g>`

const file = `---
// 由 scripts/generate-hero-vine.mjs 生成，请勿手改。
// 坐标以头像框为 100×100：头像圆心 (50 50)，半径 50。
---

<svg class='home-vine' viewBox='0 0 100 100' fill='none' aria-hidden='true'>
  <defs>
    <mask id='home-vine-reveal' maskUnits='userSpaceOnUse' x='-40' y='-40' width='180' height='180'>
      <path class='home-vine__reveal' d='${centerD}' pathLength='1' style='--dur:${GROW_DURATION}s; --delay:${GROW_DELAY}s; --ease:${GROW_EASE}'/>
    </mask>
    <filter id='home-vine-rough' x='-15%' y='-15%' width='130%' height='130%'>
      <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='7' result='noise'/>
      <feDisplacementMap in='SourceGraphic' in2='noise' scale='0.9' xChannelSelector='R' yChannelSelector='G'/>
    </filter>
  </defs>
  <g class='home-vine__sway'>
    <g class='home-vine__sway-inner'>
      <g mask='url(#home-vine-reveal)'>
        <g filter='url(#home-vine-rough)'>
          <path class='home-vine__stem' d='${stemD}'/>
          <path class='home-vine__stem-shade' d='${stemShadeD}'/>
        </g>
      </g>
      <g filter='url(#home-vine-rough)'>
        ${ringLeaves}
        ${tipTendrils}
      </g>
    </g>
  </g>
  <g class='home-vine__falls'>
    ${fallingLeaf}
  </g>
</svg>
`

fs.writeFileSync(OUT, file)
console.log('wrote', path.relative(root, OUT), file.length, 'bytes')
console.log('ringN', ringN, 'grow', GROW_DELAY, GROW_DURATION, 'fall', FALL_DELAY.toFixed(2))
console.log('head', headP.x.toFixed(2), headP.y.toFixed(2), 'tail', tailP.x.toFixed(2), tailP.y.toFixed(2))
