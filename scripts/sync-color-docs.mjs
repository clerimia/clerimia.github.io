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

色彩的首要任务是传递信息。\`src/styles/tokens.css\` 是唯一色值来源：基础色板 HSL 通道 → 日夜主题令牌。主题令牌采用 shadcn/ui 的命名（\`background\`、\`foreground\`、\`card\`、\`popover\`、\`primary\`、\`secondary\`、\`muted\`、\`accent\`、\`destructive\`、\`border\`、\`input\`、\`ring\`、\`chart-1–5\`、\`sidebar\`），\`brand\`、\`primary-hover/active\`、\`status-*\` 与终端 \`term-*\` 作为本站扩展。组件使用 \`hsl(var(--token))\` 或 Tailwind 4 语义类；品牌、行动与状态即使暂时同色，也保留各自职责。完整令牌及使用边界见[色彩系统](docs/design-language.md#01-色彩系统)。

| 类别 | 职责 |
| --- | --- |
| 品牌色 | 绿色贯穿双主题，表达共同身份 |
| 中性色 | 建立画布、文字、表面与边界层级 |
| 语义色 | 信息、成功、警告、错误各有前景与弱表面，并配文字或图标 |
| 交互状态色 | 行动、悬停、按下、焦点职责独立；酒红行动色不等同错误 |
| 数据可视化色 | 固定映射无序系列，并配标签、线型或纹理 |

### 双主题速查

${markdownTable(overview)}

文字与必要的控件边界应按实际表面验证对比度，普通文字以 4.5:1、必要控件边界与状态以 3:1 为目标。信息提示配色和分类数据色已定义，真实组件与图表中的使用仍需验证。`
const detailContent = `## 01 色彩系统

色彩首先传递信息：身份、阅读层级、反馈、操作状态和数据关系各自命名。\`src/styles/tokens.css\` 是唯一色值来源。基础色板 \`--palette-*\` 保存 HSL 通道，主题令牌直接引用色板；组件使用 \`hsl(var(--token))\` 或 Tailwind 4 语义类，不再维护第二套颜色别名。色阶数字是固定标识，不承诺均匀亮度，也不保证对比度。

主题令牌沿用 shadcn/ui 的命名与前景/背景配对：\`--background\` / \`--foreground\`、\`--card\` / \`--card-foreground\`、\`--popover\` / \`--popover-foreground\`、\`--primary\` / \`--primary-foreground\`、\`--secondary\` / \`--secondary-foreground\`、\`--muted\` / \`--muted-foreground\`、\`--accent\` / \`--accent-foreground\`、\`--destructive\` / \`--destructive-foreground\`、\`--border\`、\`--input\`、\`--ring\`、\`--chart-1–5\` 与 \`--sidebar-*\`。\`--brand\`、\`--primary-hover\`、\`--primary-active\`、\`--status-*\` 与终端 \`--term-*\` 是本站扩展。值保存为 HSL 通道，以兼容 \`hsl(var(--primary) / alpha)\` 和 Tailwind 4；终端子主题的 \`--term-*\` 使用完整颜色。

| 类别 | 色板与用途 |
| --- | --- |
| 品牌 | \`--palette-green-*\`；品牌和身份跨主题保持绿色 |
| 中性 | \`--palette-neutral-*\`；画布、文字、表面和边界 |
| 语义 | 蓝色信息、绿色成功、琥珀警告、红色错误；前景和弱表面成对 |
| 交互 | 日间绿色、夜间酒红；行动、悬停、按下与焦点分别命名 |
| 数据 | 绿、蓝、紫、琥珀、玫瑰；无序系列独立于界面状态命名 |

### 基础色板

下表由色板通道换算为便于查看的十六进制色值；通道是内部基础值，组件应使用语义令牌。

${markdownPalette}

### 主题语义令牌

${markdownTable(rows)}

每个表面令牌都有对应的 \`-foreground\`：\`background\` / \`foreground\`、\`card\` / \`card-foreground\`、\`popover\` / \`popover-foreground\`、\`primary\` / \`primary-foreground\`、\`secondary\` / \`secondary-foreground\`、\`muted\` / \`muted-foreground\`、\`accent\` / \`accent-foreground\`、\`destructive\` / \`destructive-foreground\`，以及 \`sidebar-*\`。状态文字使用 \`--status-*\`，弱表面使用 \`--status-*-surface\`。状态表面的色值已定义并经过纯色对比计算，尚未在实际提示组件中验证。

\`--background\`、\`--primary\`、\`--ring\` 等仍是 HSL 通道，可以用于 \`hsl(var(--primary) / 0.5)\`。深色主题的 \`--muted\` 使用面板色，与 \`--secondary\` 选择表面分开；\`--accent\` 使用行动弱表面。Tailwind 4 的 \`@theme inline\` 暴露完整配对以及 \`brand\`、\`status-*\`、\`chart-*\`、\`sidebar-*\`；组件优先使用语义工具类，避免直接写色值。

### 数据、对比度与使用边界

数据系列在同一图表及相关图表中保持映射；色序不表示大小或好坏。直接标注系列和数值，结合线型、形状或纹理区分，并提供表格或等价文本。连续值、发散值或超过四个类别需按实际数据另行设计。数据色已定义，真实图表和色觉差异仍待验证。

普通文字以 4.5:1、必要控件边界与状态以 3:1 为目标；状态配文字或图标，不只依赖颜色。实际表面、透明叠色、图像及第三方组件须另行验证。终端的红黄绿圆点沿用 macOS 系统色（\`#ff5f57\` / \`#febc2e\` / \`#28c840\`），属于外来窗口语言。身份牌边线为装饰层，默认边框不足以单独承担必要控件边界。`
const htmlRows = rows.map(([name, description]) => `                  <tr><td><code>--${name}</code></td><td>${hex(`--${name}`, root)}</td><td>${hex(`--${name}`, dark)}</td><td>${description}</td></tr>`).join('\n')
const htmlPalette = paletteRows.map(([name, value]) => `            <div class="palette-swatch"><span style="background:hsl(var(${name}))" aria-hidden="true"></span><code>${name}</code><small>${value}</small></div>`).join('\n')
const htmlContent = `<div class="subhead"><div><h3>颜色令牌 · 从代码生成</h3><p>基础色板 HSL 通道 → 主题角色 → 语义颜色和兼容通道；同一职责在日夜主题保留同一个名字。</p></div></div>
          <div class="grid two" aria-label="日夜主题配色示例">
            <article class="card token-theme" style="background:hsl(var(--background));color:hsl(var(--foreground))">
              <h4 style="color:hsl(var(--brand))">若叶睦 · 日间</h4><p style="color:hsl(var(--muted-foreground))">绿色身份 · 安静阅读</p>
              <span class="pill" style="display:inline-block;margin-top:12px;background:hsl(var(--primary));color:hsl(var(--primary-foreground))">主要行动</span>
            </article>
            <article class="card token-theme dark" style="background:hsl(var(--background));color:hsl(var(--foreground))">
              <h4 style="color:hsl(var(--brand))">墨提斯 · 夜间</h4><p style="color:hsl(var(--muted-foreground))">绿色身份 · 酒红行动</p>
              <span class="pill" style="display:inline-block;margin-top:12px;background:hsl(var(--primary));color:hsl(var(--primary-foreground))">主要行动</span>
            </article>
          </div>
          <p>主题令牌沿用 shadcn/ui 的命名与配对（background/foreground、card、popover、primary、secondary、muted、accent、destructive、border/input/ring、chart-1–5、sidebar）；brand、primary-hover/active、status、term 是本站扩展。值保留 HSL 通道以支持 alpha 与 Tailwind 4；直接写 CSS 时使用 <code>hsl(var(--token))</code>。</p>
          <p>品牌保持绿色；中性色组织阅读层级；信息、成功、警告、错误使用对应前景与弱表面；行动状态与焦点独立。数据色用于无序分类，需搭配标签、线型或纹理。状态提示和真实图表仍待实际组件验证。</p>
          <p>Tailwind 4 暴露完整的前景/背景配对，以及 <code>brand</code>、<code>status-*</code>、<code>chart-*</code>、<code>sidebar-*</code> 语义工具类；组件优先使用这些类，而不是直接写色值。</p>
          <div class="subhead"><div><h3>基础色板</h3><p>色块直接引用 CSS 通道，色值由同一来源生成。</p></div></div>
          <div class="palette-swatches">
${htmlPalette}
          </div>
          <div class="subhead"><div><h3>语义令牌与主题映射</h3><p>前景和表面按用途配对。</p></div></div>
          <div class="tablebox" tabindex="0" role="region" aria-label="可横向滚动的主题色表"><table>
            <thead><tr><th>语义令牌</th><th>若叶睦 · 日间</th><th>墨提斯 · 夜间</th><th>用途</th></tr></thead>
            <tbody>
${htmlRows}
            </tbody></table></div>
          <div class="hint">前景与表面成对使用；普通文字目标为 4.5:1，必要边界及状态目标为 3:1。透明叠色、图像和真实组件需单独验证，状态不能只靠颜色区分。</div>`

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
await update('docs/design-language.md', detailContent)
await update('docs/design-language.html', htmlContent)
