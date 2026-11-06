import { readFile, writeFile } from 'node:fs/promises'

// CSS is the only color source. Regenerate the marked sections after changing tokens.
const css = await readFile(new URL('../src/styles/tokens.css', import.meta.url), 'utf8')
const sections = [...css.matchAll(/(?:^|\n)(:root, \.token-theme|\.dark)\s*\{([^}]*)\}/g)]
if (sections.length !== 2) throw new Error('Expected light and dark token blocks')
const declarations = (text) => Object.fromEntries([...text.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map(([, key, value]) => [key, value.trim()]))
const root = declarations(sections[0][2])
const dark = { ...root, ...declarations(sections[1][2]) }

const appRoot = css.match(/:root\s*\{([\s\S]*?)\n\}/)?.[1]
if (!appRoot) throw new Error('Expected shared :root scales in tokens.css')
const appTokens = declarations(appRoot)
const scale = (name, visited = []) => {
  if (visited.includes(name)) throw new Error(`Circular scale token: ${name}`)
  const value = appTokens[name]
  if (!value) throw new Error(`Missing scale token: ${name}`)
  return value.replace(/var\((--[\w-]+)\)/g, (_, child) => scale(child, [...visited, name]))
}

// The frontmatter is a machine-readable contract for agents and design tools.
// Colors and all four typography values come from tokens.css.
const yamlValue = (value) => {
  const text = String(value)
  return /^[\d.]+(?:px|ms)?$/.test(text) ? text : `'${text.replace(/'/g, "''")}'`
}
const statuses = { info: '信息', success: '成功', warning: '警告', error: '错误' }
// The canonical names follow shadcn/ui so copied components and agents can use
// the same vocabulary. Site roles stay as additive extensions, not replacements.
const shadcnColors = [
  ['background', '--background'],
  ['foreground', '--foreground'],
  ['card', '--card'],
  ['card-foreground', '--card-foreground'],
  ['popover', '--popover'],
  ['popover-foreground', '--popover-foreground'],
  ['primary', '--primary'],
  ['primary-foreground', '--primary-foreground'],
  ['secondary', '--secondary'],
  ['secondary-foreground', '--secondary-foreground'],
  ['muted', '--muted'],
  ['muted-foreground', '--muted-foreground'],
  ['accent', '--accent'],
  ['accent-foreground', '--accent-foreground'],
  ['destructive', '--destructive'],
  ['destructive-foreground', '--destructive-foreground'],
  ['border', '--border'],
  ['input', '--input'],
  ['ring', '--ring'],
  ...['1', '2', '3', '4', '5'].map((n) => [`chart-${n}`, `--chart-${n}`]),
  ['sidebar', '--sidebar'],
  ['sidebar-foreground', '--sidebar-foreground'],
  ['sidebar-primary', '--sidebar-primary'],
  ['sidebar-primary-foreground', '--sidebar-primary-foreground'],
  ['sidebar-accent', '--sidebar-accent'],
  ['sidebar-accent-foreground', '--sidebar-accent-foreground'],
  ['sidebar-border', '--sidebar-border'],
  ['sidebar-ring', '--sidebar-ring']
]
const extensionColors = [
  ['brand', '--brand'],
  ['primary-hover', '--primary-hover'],
  ['primary-active', '--primary-active'],
  ...Object.keys(statuses).flatMap((status) => [
    [`status-${status}`, `--status-${status}`],
    [`status-${status}-surface`, `--status-${status}-surface`]
  ]),
  ['term-canvas', '--term-canvas'],
  ['term-edge', '--term-edge'],
  ['term-muted', '--term-muted'],
  ['term-chrome', '--term-chrome'],
  ['term-chrome-edge', '--term-chrome-edge'],
  ['term-foreground', '--term-foreground']
]
const typography = ['display', 'page-title', 'section', 'item-title', 'lead', 'reading', 'ui', 'meta']

const rounded = [
  ['base', '--radius'],
  ['code', '--radius-code'],
  ['control', '--radius-control'],
  ['panel', '--radius-panel'],
  ['dialog', '--radius-dialog'],
  ['pill', '--radius-pill']
]
const spacing = [
  ['space-1', '--space-1'],
  ['space-2', '--space-2'],
  ['space-3', '--space-3'],
  ['space-4', '--space-4'],
  ['space-5', '--space-5'],
  ['space-6', '--space-6'],
  ['space-8', '--space-8'],
  ['space-12', '--space-12'],
  ['space-18', '--space-18']
]
const layout = [
  ['wide', '--layout-wide'],
  ['reading', '--layout-reading'],
  ['aside', '--layout-aside']
]

function buildFrontmatter() {
  const lines = [
    '---',
    'version: alpha',
    'name: clerimia',
    `description: ${yamlValue('安静，但有自己的声音。整体安静，局部鲜活。')}`,
    'colors:'
  ]
  lines.push('  # shadcn/ui theme tokens')
  for (const [name, token] of shadcnColors) {
    lines.push(`  ${name}: ${yamlValue(hex(token, root))}`)
  }
  lines.push('  # site extensions')
  for (const [name, token] of extensionColors) {
    lines.push(`  ${name}: ${yamlValue(hex(token, root))}`)
  }
  lines.push('colorsDark:')
  lines.push('  # shadcn/ui theme tokens')
  for (const [name, token] of shadcnColors) {
    lines.push(`  ${name}: ${yamlValue(hex(token, dark))}`)
  }
  lines.push('  # site extensions')
  for (const [name, token] of extensionColors) {
    lines.push(`  ${name}: ${yamlValue(hex(token, dark))}`)
  }
  lines.push('typography:')
  for (const role of typography) {
    lines.push(
      `  ${role}:`,
      '    fontFamily: Satoshi',
      `    fontSize: ${yamlValue(scale(`--font-${role}`))}`,
      `    fontWeight: ${scale(`--weight-${role}`)}`,
      `    lineHeight: ${scale(`--leading-${role}`)}`,
      `    letterSpacing: ${yamlValue(scale(`--tracking-${role}`))}`
    )
  }
  lines.push('rounded:')
  for (const [name, token] of rounded) lines.push(`  ${name}: ${yamlValue(scale(token))}`)
  lines.push('spacing:')
  for (const [name, token] of spacing) lines.push(`  ${name}: ${yamlValue(scale(token))}`)
  lines.push('layout:')
  for (const [name, token] of layout) lines.push(`  ${name}: ${yamlValue(scale(token))}`)
  lines.push('---')
  return lines.join('\n')
}

function resolve(name, values, visited = []) {
  if (visited.includes(name)) throw new Error(`Circular token: ${[...visited, name].join(' → ')}`)
  const value = values[name]
  if (!value) throw new Error(`Missing token: ${name}`)
  return value.replace(/var\((--[\w-]+)\)/g, (_, child) => resolve(child, values, [...visited, name]))
}

function hex(name, values) {
  const resolved = resolve(name, values)
  // Canonical theme tokens are raw HSL channels; terminal tokens are complete colors.
  const value = resolved.startsWith('hsl(') ? resolved : `hsl(${resolved})`
  const match = value.match(/^hsl\(\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*\)$/)
  if (!match) throw new Error(`Expected HSL color for ${name}: ${value}`)
  const [h, s, l] = match.slice(1).map(Number)
  const a = s / 100 * Math.min(l / 100, 1 - l / 100)
  const channel = (n) => {
    const k = (n + h / 30) % 12
    return Math.round(255 * (l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))))
  }
  return `#${[channel(0), channel(8), channel(4)].map((n) => n.toString(16).padStart(2, '0')).join('')}`
}

const rows = [
  ['background', '页面画布'], ['foreground', '正文与标题'],
  ['card', '面板与浮层表面'], ['card-foreground', '面板与浮层上的正文'],
  ['popover', '浮层表面'], ['popover-foreground', '浮层上的正文'],
  ['primary', '主要行动与链接'], ['primary-foreground', '实心行动底上的文字'],
  ['primary-hover', '已着行动色的悬停状态'], ['primary-active', '已着行动色的按下状态'],
  ['secondary', '标签与搜索命中等中性局部表面'], ['secondary-foreground', '中性局部表面上的正文'],
  ['muted', '弱化内容表面'], ['muted-foreground', '弱化内容表面上的辅助文字'],
  ['accent', '局部行动弱表面'], ['accent-foreground', '行动弱表面上的正文'],
  ['destructive', '破坏性操作背景（错误角色别名）'], ['destructive-foreground', '破坏性操作文字'],
  ['border', '分隔与默认边框'], ['input', '输入控件边框'], ['ring', '键盘焦点'],
  ...[1, 2, 3, 4, 5].map((n) => [`chart-${n}`, `无序分类数据系列 ${n}`]),
  ['sidebar', '侧栏表面'], ['sidebar-foreground', '侧栏正文'],
  ['sidebar-primary', '侧栏主要行动'], ['sidebar-primary-foreground', '侧栏主要行动文字'],
  ['sidebar-accent', '侧栏选中表面'], ['sidebar-accent-foreground', '侧栏选中文字'],
  ['sidebar-border', '侧栏边线'], ['sidebar-ring', '侧栏焦点'],
  ['brand', '跨主题绿色身份'],
  ...Object.entries(statuses).flatMap(([status, label]) => [
    [`status-${status}`, `${label}状态文字与图标`],
    [`status-${status}-surface`, `${label}状态弱表面`]
  ]),
  ['term-canvas', '终端画布'], ['term-edge', '终端边线'], ['term-muted', '终端辅助文字'],
  ['term-chrome', '终端标题栏'], ['term-chrome-edge', '终端标题栏边线'], ['term-foreground', '终端标题栏文字']
]
const paletteRows = Object.keys(root).filter((name) => name.startsWith('--palette-')).map((name) => [name, hexFromChannels(resolve(name, root))])
function hexFromChannels(channels) {
  return hex('temporary', { temporary: `hsl(${channels})` })
}
const markdownPalette = [
  '| 基础色板通道 | 色值 |',
  '| --- | --- |',
  ...paletteRows.map(([name, value]) => `| \`${name}\` | \`${value}\` |`)
].join('\n')
const markdownTable = (items) => [
  '| 语义令牌 | 日间 | 夜间 | 用途 |',
  '| --- | --- | --- | --- |',
  ...items.map(([name, description]) => `| \`--${name}\` | \`${hex(`--${name}`, root)}\` | \`${hex(`--${name}`, dark)}\` | ${description} |`)
].join('\n')
const overview = rows.filter(([name]) => ['background', 'foreground', 'card', 'muted-foreground', 'brand', 'primary', 'primary-foreground', 'ring'].includes(name))
const marker = (content) => `<!-- color-tokens:start -->\n${content}\n<!-- color-tokens:end -->`
const designContent = `## 2. 色彩与信息职责

色彩的首要任务是传递信息。\`src/styles/tokens.css\` 是唯一色值来源：基础色板 HSL 通道 → 日夜主题令牌。主题令牌采用 shadcn/ui 的命名（\`background\`、\`foreground\`、\`card\`、\`popover\`、\`primary\`、\`secondary\`、\`muted\`、\`accent\`、\`destructive\`、\`border\`、\`input\`、\`ring\`、\`chart-1–5\`、\`sidebar\`），\`brand\`、\`primary-hover/active\`、\`status-*\` 与终端 \`term-*\` 作为本站扩展。组件使用 \`hsl(var(--token))\` 或 Tailwind 4 语义类；品牌、行动与状态即使暂时同色，也保留各自职责。完整令牌表见本节。

| 类别 | 职责 |
| --- | --- |
| 品牌色 | 绿色贯穿双主题，表达共同身份 |
| 中性色 | 建立画布、文字、表面与边界层级 |
| 语义色 | 信息、成功、警告、错误各有前景与弱表面，并配文字或图标 |
| 交互状态色 | 行动、悬停、按下、焦点职责独立；酒红行动色不等同错误 |
| 数据可视化色 | 固定映射无序系列，并配标签、线型或纹理 |

### 双主题速查

${markdownTable(overview)}

文字与必要的控件边界应按实际表面验证对比度，普通文字以 4.5:1、必要控件边界与状态以 3:1 为目标。信息提示配色和分类数据色已定义，真实组件与图表中的使用仍需验证。

### 基础色板

下表由色板通道换算为便于查看的十六进制色值；通道是内部基础值，组件应使用语义令牌。

${markdownPalette}

### 主题语义令牌

${markdownTable(rows)}

每个表面令牌都有对应的 \`-foreground\`。状态文字使用 \`--status-*\`，弱表面使用 \`--status-*-surface\`。深色主题的 \`--muted\` 使用面板色，与 \`--secondary\` 选择表面分开；\`--accent\` 使用行动弱表面。组件优先使用语义工具类，避免直接写色值。`

async function update(path, content, { frontmatter } = {}) {
  const url = new URL(`../${path}`, import.meta.url)
  const original = await readFile(url, 'utf8')
  // Git may check out CRLF on Windows; compare generated content canonically.
  const normalized = original.replace(/\r\n/g, '\n')
  const pattern = /<!-- color-tokens:start -->[\s\S]*?<!-- color-tokens:end -->/
  if (!pattern.test(normalized)) throw new Error(`Missing generated section in ${path}`)
  let next = normalized.replace(pattern, marker(content))
  if (frontmatter) {
    next = `${frontmatter}\n\n${next.replace(/^---\n[\s\S]*?\n---\n\n?/, '')}`
  }
  if (process.argv.includes('--check')) {
    if (next !== normalized) throw new Error(`${path} is out of date; run node scripts/sync-color-docs.mjs`)
  } else if (next !== original) await writeFile(url, next)
}
await update('DESIGN.md', designContent, { frontmatter: buildFrontmatter() })
