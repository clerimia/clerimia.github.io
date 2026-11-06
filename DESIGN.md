---
version: alpha
name: clerimia
description: '安静，但有自己的声音。整体安静，局部鲜活。'
colors:
  # shadcn/ui theme tokens
  background: '#f9fcf9'
  foreground: '#263b2e'
  card: '#ffffff'
  card-foreground: '#263b2e'
  popover: '#ffffff'
  popover-foreground: '#263b2e'
  primary: '#3f7050'
  primary-foreground: '#ffffff'
  secondary: '#e4efe6'
  secondary-foreground: '#263b2e'
  muted: '#edf6ef'
  muted-foreground: '#48604e'
  accent: '#dcecde'
  accent-foreground: '#263b2e'
  destructive: '#ab2e2e'
  destructive-foreground: '#ffffff'
  border: '#7f9584'
  input: '#7f9584'
  ring: '#315a40'
  chart-1: '#3f7050'
  chart-2: '#285e86'
  chart-3: '#704e86'
  chart-4: '#805417'
  chart-5: '#8a4f66'
  sidebar: '#ffffff'
  sidebar-foreground: '#263b2e'
  sidebar-primary: '#3f7050'
  sidebar-primary-foreground: '#ffffff'
  sidebar-accent: '#e4efe6'
  sidebar-accent-foreground: '#263b2e'
  sidebar-border: '#7f9584'
  sidebar-ring: '#315a40'
  # site extensions
  brand: '#3f7050'
  primary-hover: '#315a40'
  primary-active: '#2b4e38'
  status-info: '#285e86'
  status-info-surface: '#eef5fa'
  status-success: '#3f7050'
  status-success-surface: '#edf6ef'
  status-warning: '#805417'
  status-warning-surface: '#fbf2e4'
  status-error: '#ab2e2e'
  status-error-surface: '#fbefee'
  term-canvas: '#ffffff'
  term-edge: '#7f9584'
  term-muted: '#48604e'
  term-chrome: '#ffffff'
  term-chrome-edge: '#7f9584'
  term-foreground: '#263b2e'
colorsDark:
  # shadcn/ui theme tokens
  background: '#191d1c'
  foreground: '#eaf1eb'
  card: '#262d29'
  card-foreground: '#eaf1eb'
  popover: '#262d29'
  popover-foreground: '#eaf1eb'
  primary: '#df9aae'
  primary-foreground: '#2b1920'
  secondary: '#334638'
  secondary-foreground: '#eaf1eb'
  muted: '#262d29'
  muted-foreground: '#aebeb2'
  accent: '#38232a'
  accent-foreground: '#eaf1eb'
  destructive: '#ffaaa4'
  destructive-foreground: '#2b1920'
  border: '#43544a'
  input: '#43544a'
  ring: '#a9d8b4'
  chart-1: '#a9d8b4'
  chart-2: '#9fcbed'
  chart-3: '#d4b6e7'
  chart-4: '#e4c18a'
  chart-5: '#e2b3c6'
  sidebar: '#262d29'
  sidebar-foreground: '#eaf1eb'
  sidebar-primary: '#df9aae'
  sidebar-primary-foreground: '#2b1920'
  sidebar-accent: '#334638'
  sidebar-accent-foreground: '#eaf1eb'
  sidebar-border: '#43544a'
  sidebar-ring: '#a9d8b4'
  # site extensions
  brand: '#a9d8b4'
  primary-hover: '#f5c4d0'
  primary-active: '#e3a7b8'
  status-info: '#9fcbed'
  status-info-surface: '#1e3342'
  status-success: '#a9d8b4'
  status-success-surface: '#22382b'
  status-warning: '#e4c18a'
  status-warning-surface: '#382e20'
  status-error: '#ffaaa4'
  status-error-surface: '#3d2929'
  term-canvas: '#1e2721'
  term-edge: '#3a463d'
  term-muted: '#93a89a'
  term-chrome: '#25342a'
  term-chrome-edge: '#435d49'
  term-foreground: '#a9d8b4'
typography:
  display:
    fontFamily: Satoshi
    fontSize: 'clamp(34px, calc(26.6px + 2vw), 48px)'
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: '0em'
  page-title:
    fontFamily: Satoshi
    fontSize: 'clamp(28px, calc(23.6px + 1.2vw), 36px)'
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: '0em'
  section:
    fontFamily: Satoshi
    fontSize: 'clamp(22px, calc(20.8px + 0.3vw), 24px)'
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: '0em'
  item-title:
    fontFamily: Satoshi
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: '0em'
  lead:
    fontFamily: Satoshi
    fontSize: 'clamp(17px, calc(16.5px + 0.15vw), 18px)'
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: '0em'
  reading:
    fontFamily: Satoshi
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: '0em'
  ui:
    fontFamily: Satoshi
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: '0em'
  meta:
    fontFamily: Satoshi
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: '0em'
rounded:
  base: 10px
  code: 6px
  control: 10px
  panel: 16px
  dialog: 24px
  pill: 999px
spacing:
  space-1: 4px
  space-2: 8px
  space-3: 12px
  space-4: 16px
  space-5: 20px
  space-6: 24px
  space-8: 32px
  space-12: 48px
  space-18: 72px
layout:
  wide: 1080px
  reading: 760px
  aside: 224px
---

# Design System: clerimia

> **安静，但有自己的声音。整体安静，局部鲜活。**

这里是一个承载文章、项目与持续变化的思考的个人博客。「一边创作，一边成为自己」既是创作理念，也是设计的起点：界面让内容被看见，也在合适的细节里留下个人的声音。

本文借鉴 [Vercel 设计文档](https://fchangjun.github.io/awesome-design-md-cn/design-md/vercel/DESIGN.md) 的组织方式，描述本站的设计意图和日常判断。本文同时承担设计规范的角色：色彩、排版、尺度与组件规则都写在下面，色值表由 `src/styles/tokens.css` 生成；[AGENTS.md](AGENTS.md) 是项目工作入口。设计灵感来源于 [Notion「个人博客网站前端 UI/UX 设计」](https://app.notion.com/p/40540f8bc1e6804ab903fa51c4225aae)（整理于 2026-10-26）。

## 1. 视觉主题与氛围

文章和创作是视觉中心。安静的背景、舒展的排版与稳定的层级为阅读留出空间；身份、行动和有意义的互动可以更鲜活。每一种视觉元素都应帮助理解、使用或感受内容。

若叶睦与 Mortis 启发了两套主题：外在的安静、内在的表达欲，以及不同自我能够共存的可能。两种角色是同一个人的不同面向，共用信息结构与交互方式。

- **若叶睦 · 日间**：安静、轻盈、柔和。近白画布、深灰绿文字和低饱和绿色营造清透的阅读环境。
- **墨提斯 · 夜间**：开放、活力、戏剧性。炭灰画布让正文保持安静，绿色延续身份，酒红在行动和适合的交互反馈中出现。
- **共同身份**：绿色、双头像和少量角色细节让日夜主题仍属于同一个人。角色元素提供情绪，内容负责表达。
- **内容优先**：通过对齐、留白与排版组织主次；装饰应让信息更易理解，或带来明确的情感价值。

<!-- color-tokens:start -->
## 2. 色彩与信息职责

色彩的首要任务是传递信息。`src/styles/tokens.css` 是唯一色值来源：基础色板 HSL 通道 → 日夜主题令牌。主题令牌采用 shadcn/ui 的命名（`background`、`foreground`、`card`、`popover`、`primary`、`secondary`、`muted`、`accent`、`destructive`、`border`、`input`、`ring`、`chart-1–5`、`sidebar`），`brand`、`primary-hover/active`、`status-*` 与终端 `term-*` 作为本站扩展。组件使用 `hsl(var(--token))` 或 Tailwind 4 语义类；品牌、行动与状态即使暂时同色，也保留各自职责。完整令牌表见本节。

| 类别 | 职责 |
| --- | --- |
| 品牌色 | 绿色贯穿双主题，表达共同身份 |
| 中性色 | 建立画布、文字、表面与边界层级 |
| 语义色 | 信息、成功、警告、错误各有前景与弱表面，并配文字或图标 |
| 交互状态色 | 行动、悬停、按下、焦点职责独立；酒红行动色不等同错误 |
| 数据可视化色 | 固定映射无序系列，并配标签、线型或纹理 |

### 双主题速查

| 语义令牌 | 日间 | 夜间 | 用途 |
| --- | --- | --- | --- |
| `--background` | `#f9fcf9` | `#191d1c` | 页面画布 |
| `--foreground` | `#263b2e` | `#eaf1eb` | 正文与标题 |
| `--card` | `#ffffff` | `#262d29` | 面板与浮层表面 |
| `--primary` | `#3f7050` | `#df9aae` | 主要行动与链接 |
| `--primary-foreground` | `#ffffff` | `#2b1920` | 实心行动底上的文字 |
| `--muted-foreground` | `#48604e` | `#aebeb2` | 弱化内容表面上的辅助文字 |
| `--ring` | `#315a40` | `#a9d8b4` | 键盘焦点 |
| `--brand` | `#3f7050` | `#a9d8b4` | 跨主题绿色身份 |

文字与必要的控件边界应按实际表面验证对比度，普通文字以 4.5:1、必要控件边界与状态以 3:1 为目标。信息提示配色和分类数据色已定义，真实组件与图表中的使用仍需验证。

### 基础色板

下表由色板通道换算为便于查看的十六进制色值；通道是内部基础值，组件应使用语义令牌。

| 基础色板通道 | 色值 |
| --- | --- |
| `--palette-neutral-0` | `#ffffff` |
| `--palette-neutral-25` | `#f9fcf9` |
| `--palette-neutral-45` | `#eaf1eb` |
| `--palette-neutral-50` | `#e8f2ea` |
| `--palette-neutral-100` | `#d0ded2` |
| `--palette-neutral-125` | `#7f9584` |
| `--palette-neutral-200` | `#aebeb2` |
| `--palette-neutral-300` | `#93a89a` |
| `--palette-neutral-400` | `#48604e` |
| `--palette-neutral-500` | `#43544a` |
| `--palette-neutral-600` | `#3a463d` |
| `--palette-neutral-650` | `#334638` |
| `--palette-neutral-700` | `#263b2e` |
| `--palette-neutral-800` | `#262d29` |
| `--palette-neutral-900` | `#1e2721` |
| `--palette-neutral-950` | `#191d1c` |
| `--palette-green-50` | `#edf6ef` |
| `--palette-green-100` | `#e4efe6` |
| `--palette-green-120` | `#dcecde` |
| `--palette-green-200` | `#a9d8b4` |
| `--palette-green-700` | `#3f7050` |
| `--palette-green-740` | `#435d49` |
| `--palette-green-800` | `#315a40` |
| `--palette-green-900` | `#2b4e38` |
| `--palette-green-940` | `#25342a` |
| `--palette-green-950` | `#22382b` |
| `--palette-wine-100` | `#f5c4d0` |
| `--palette-wine-200` | `#e3a7b8` |
| `--palette-wine-300` | `#df9aae` |
| `--palette-wine-900` | `#38232a` |
| `--palette-wine-950` | `#2b1920` |
| `--palette-blue-50` | `#eef5fa` |
| `--palette-blue-200` | `#9fcbed` |
| `--palette-blue-700` | `#285e86` |
| `--palette-blue-950` | `#1e3342` |
| `--palette-amber-50` | `#fbf2e4` |
| `--palette-amber-200` | `#e4c18a` |
| `--palette-amber-700` | `#805417` |
| `--palette-amber-950` | `#382e20` |
| `--palette-red-50` | `#fbefee` |
| `--palette-red-200` | `#ffaaa4` |
| `--palette-red-700` | `#ab2e2e` |
| `--palette-red-950` | `#3d2929` |
| `--palette-violet-200` | `#d4b6e7` |
| `--palette-violet-700` | `#704e86` |
| `--palette-rose-200` | `#e2b3c6` |
| `--palette-rose-700` | `#8a4f66` |

### 主题语义令牌

| 语义令牌 | 日间 | 夜间 | 用途 |
| --- | --- | --- | --- |
| `--background` | `#f9fcf9` | `#191d1c` | 页面画布 |
| `--foreground` | `#263b2e` | `#eaf1eb` | 正文与标题 |
| `--card` | `#ffffff` | `#262d29` | 面板与浮层表面 |
| `--card-foreground` | `#263b2e` | `#eaf1eb` | 面板与浮层上的正文 |
| `--popover` | `#ffffff` | `#262d29` | 浮层表面 |
| `--popover-foreground` | `#263b2e` | `#eaf1eb` | 浮层上的正文 |
| `--primary` | `#3f7050` | `#df9aae` | 主要行动与链接 |
| `--primary-foreground` | `#ffffff` | `#2b1920` | 实心行动底上的文字 |
| `--primary-hover` | `#315a40` | `#f5c4d0` | 已着行动色的悬停状态 |
| `--primary-active` | `#2b4e38` | `#e3a7b8` | 已着行动色的按下状态 |
| `--secondary` | `#e4efe6` | `#334638` | 标签与搜索命中等中性局部表面 |
| `--secondary-foreground` | `#263b2e` | `#eaf1eb` | 中性局部表面上的正文 |
| `--muted` | `#edf6ef` | `#262d29` | 弱化内容表面 |
| `--muted-foreground` | `#48604e` | `#aebeb2` | 弱化内容表面上的辅助文字 |
| `--accent` | `#dcecde` | `#38232a` | 局部行动弱表面 |
| `--accent-foreground` | `#263b2e` | `#eaf1eb` | 行动弱表面上的正文 |
| `--destructive` | `#ab2e2e` | `#ffaaa4` | 破坏性操作背景（错误角色别名） |
| `--destructive-foreground` | `#ffffff` | `#2b1920` | 破坏性操作文字 |
| `--border` | `#7f9584` | `#43544a` | 分隔与默认边框 |
| `--input` | `#7f9584` | `#43544a` | 输入控件边框 |
| `--ring` | `#315a40` | `#a9d8b4` | 键盘焦点 |
| `--chart-1` | `#3f7050` | `#a9d8b4` | 无序分类数据系列 1 |
| `--chart-2` | `#285e86` | `#9fcbed` | 无序分类数据系列 2 |
| `--chart-3` | `#704e86` | `#d4b6e7` | 无序分类数据系列 3 |
| `--chart-4` | `#805417` | `#e4c18a` | 无序分类数据系列 4 |
| `--chart-5` | `#8a4f66` | `#e2b3c6` | 无序分类数据系列 5 |
| `--sidebar` | `#ffffff` | `#262d29` | 侧栏表面 |
| `--sidebar-foreground` | `#263b2e` | `#eaf1eb` | 侧栏正文 |
| `--sidebar-primary` | `#3f7050` | `#df9aae` | 侧栏主要行动 |
| `--sidebar-primary-foreground` | `#ffffff` | `#2b1920` | 侧栏主要行动文字 |
| `--sidebar-accent` | `#e4efe6` | `#334638` | 侧栏选中表面 |
| `--sidebar-accent-foreground` | `#263b2e` | `#eaf1eb` | 侧栏选中文字 |
| `--sidebar-border` | `#7f9584` | `#43544a` | 侧栏边线 |
| `--sidebar-ring` | `#315a40` | `#a9d8b4` | 侧栏焦点 |
| `--brand` | `#3f7050` | `#a9d8b4` | 跨主题绿色身份 |
| `--status-info` | `#285e86` | `#9fcbed` | 信息状态文字与图标 |
| `--status-info-surface` | `#eef5fa` | `#1e3342` | 信息状态弱表面 |
| `--status-success` | `#3f7050` | `#a9d8b4` | 成功状态文字与图标 |
| `--status-success-surface` | `#edf6ef` | `#22382b` | 成功状态弱表面 |
| `--status-warning` | `#805417` | `#e4c18a` | 警告状态文字与图标 |
| `--status-warning-surface` | `#fbf2e4` | `#382e20` | 警告状态弱表面 |
| `--status-error` | `#ab2e2e` | `#ffaaa4` | 错误状态文字与图标 |
| `--status-error-surface` | `#fbefee` | `#3d2929` | 错误状态弱表面 |
| `--term-canvas` | `#ffffff` | `#1e2721` | 终端画布 |
| `--term-edge` | `#7f9584` | `#3a463d` | 终端边线 |
| `--term-muted` | `#48604e` | `#93a89a` | 终端辅助文字 |
| `--term-chrome` | `#ffffff` | `#25342a` | 终端标题栏 |
| `--term-chrome-edge` | `#7f9584` | `#435d49` | 终端标题栏边线 |
| `--term-foreground` | `#263b2e` | `#a9d8b4` | 终端标题栏文字 |

每个表面令牌都有对应的 `-foreground`。状态文字使用 `--status-*`，弱表面使用 `--status-*-surface`。两套主题的三个弱表面都保持三级阶梯：`--muted`（弱化内容）< `--secondary`（选择与命中）< `--accent`（行动悬停）；日间由绿阶 `green-50 / 100 / 120` 承担，夜间用面板色、选择表面与酒红弱表面。`--border` 使用 `neutral-125`，对画布约 3.1:1，足以让卡片与控件外框立住；更重的分隔需要新的层级，而不是继续压深同一个令牌。组件优先使用语义工具类，避免直接写色值。
<!-- color-tokens:end -->

## 3. 排版规则

排版首先服务于中文、英文、代码和长文的舒适阅读。正文使用 Satoshi，中文回退 Microsoft YaHei 和 system-ui；代码与终端使用 ui-monospace、Consolas、monospace。中文标题从正常字距开始，英文品牌字标可以独立微调。

| 层级 | 宽屏 / 窄屏起点 | 行高 | 职责 |
| --- | --- | --- | --- |
| Display | 48 / 34px | 1.2 | 展示性标题 |
| Page title | 36 / 28px | 1.25 / 1.3 | 页面与文章标题 |
| Section | 24 / 22px | 1.35 | 区块标题 |
| Item title | 18px | 1.45 | 文章条目标题 |
| Lead | 18 / 17px | 1.75 | 简介与引言 |
| Reading | 16px | 1.8 | 长文正文 |
| UI | 14px | 1.6 | 导航、按钮与短摘要 |
| Meta | 12px | 1.5 | 日期与少量辅助信息 |

实现以 `src/styles/tokens.css` 为统一来源，Tailwind 4 的 `text-{role}` 同时应用字号、行高、字重和字距（标题角色 600，其余 400，默认 `0em`）；`.dark` 类切换主题。`src/styles/global.css` 汇集语义映射、typography 与现有站点样式，正文的标题锚点、现代行内代码、引用、表格、列表、图片、键盘标记和 Shiki 覆盖保留。JS 通过 `src/lib/tokens.ts` 读取 CSS 动效和复用媒体查询。（迁移已实现；静态契约测试验证，构建及双主题浏览器回归待主流程验证。）

正文以 400 字重为起点，标题和重点以 600–700 为起点；部分层级在宽窄屏之间平滑变化。首页标语是展示例外：以更大的字号、两行排版和身份绿渐变承载创作理念；具体数值见本节表格。不要通过降低正文对比度来制造安静感。

## 4. 组件语言

### 链接、按钮与导航

链接负责前往目的地，按钮负责执行操作或打开浮层，开关表达状态。正文链接保留下划线；次级跳转复用 `TextArrowLink`，默认使用辅助文字色，交互时转为行动色。导航当前项通过 `aria-current` 和可辨识的视觉状态表达。

主要行动应清楚，次要行动降低权重。同一页面中同一层级的相同动作采用一致表达。触屏不依赖悬停，键盘焦点立即可见，目标优先至少 `44 × 44px`。

### 文章列表与内容

详细文章列表使用单列卡片：默认透出画布，以细边线和圆角建立边界；文章链接悬停或键盘聚焦时使用行动弱表面，标签保持独立操作。归档使用紧凑行，不将每一项都做成卡片。正文的标题、引用、代码、图片说明与目录应支持阅读主线。

### 终端与身份细节

终端是可操作的站点入口，也承载个人身份。标题栏使用身份牌，用户名使用身份绿，提示符使用行动色；成功和错误结果配合文字说明。终端输入焦点是常驻状态，以光标和局部边线表达；按钮与链接保留独立焦点环。窗口红黄绿圆点借用 macOS 窗口语言，不承担本站状态语义。

### 友链菜园

友链页以菜园为灵感，藤蔓、嫩芽与月亮建立温柔的场景；朋友和他们的创作仍是主体。整张友链卡片作为单一外链，描述应完整可读。装饰服务于场景与识别，不遮盖内容或操作。实现见 [links/index.astro](src/pages/links/index.astro) 与 [links/](src/components/links/)。

### 终端子主题

终端不是另一张普通卡片，而是页面里的独立“设备”。它使用自己的 `--term-*` 画布、边线和辅助文字，以及等宽字体节奏；标题栏使用 `--term-chrome / --term-chrome-edge / --term-foreground`。窗口红黄绿圆点沿用 macOS 系统色，属于固定的外来窗口语言，不映射为本站成功、警告或错误。输入焦点是常驻状态，由光标和局部边线表达；按钮、链接和目录仍使用独立焦点环。实现见 [Terminal.astro](src/components/home/Terminal.astro) 与 [terminal.css](src/styles/site/terminal.css)。

### 实现锚点

| 约定 | 实现位置 |
| --- | --- |
| 次级跳转 | [TextArrowLink.astro](src/components/site/TextArrowLink.astro) |
| 文章列表卡片 | [PostPreview.astro](src/components/site/PostPreview.astro) |
| 页头与移动菜单 | [SiteHeader.astro](src/components/site/SiteHeader.astro) |
| 色彩契约 | [tokens.css](src/styles/tokens.css)、[sync-color-docs.mjs](scripts/sync-color-docs.mjs) |
| Tailwind 4 语义映射 | [tokens.css](src/styles/tokens.css)、[global.css](src/styles/global.css) |
| 页面框架 | [BaseLayout.astro](src/layouts/BaseLayout.astro)、[ContentLayout.astro](src/layouts/ContentLayout.astro) |

## 5. 布局与空间

页面以阅读路径而非填满屏幕为目标。首页先介绍作者，再引导探索文章与作品；文章页优先保证正文行长。页头、返回入口和内容共享左基线，阅读列限宽后仍靠左。

| 尺度 | 设计值 | 作用 |
| --- | --- | --- |
| 站点页框 | 最大 `1080px` | 容纳导航与页面内容 |
| 阅读列 | 最大 `760px` | 长文与长段文字 |
| 文章目录 | `224px`，与正文间距 `32px` | 空间充足时并列 |
| 页面边距 | `20 / 24 / 32px` | 随视口宽度变化 |
| 返回入口到内容 | `24px` | 保持内页节奏一致 |

基础间距采用 `4 / 8 / 12 / 16 / 20 / 24 / 32 / 48 / 72px`。圆角按职责选择：代码 `6px`、控件 `10px`、面板 `16px`、对话框 `24px`，胶囊用于合适的标签或状态。宽度、间距和断点的完整规则见上表与第 8 节。

## 6. 表面、边界与层次

| 层次 | 表达 | 适用场景 |
| --- | --- | --- |
| 画布 | 平面背景与留白 | 页面、普通阅读内容 |
| 分组 | 细边线或必要的局部表面 | 文章卡片、独立内容区域 |
| 浮层 | 独立表面，必要时使用阴影与遮罩 | 对话框、终端、移动目录 |
| 焦点 | 清晰且立即出现的焦点环 | 键盘进入链接、按钮和其他控件 |

优先使用位置、间距和排版表达关系。边线用于分组或交互边界；阴影主要服务于浮层。不要叠加多种强调方式来表达同一个状态，也不要为了装饰而普遍增加渐变、阴影或新配色。首页标语和局部身份细节有已记录的视觉例外。

## 7. 动效与交互

动效用于回应操作或说明浮层的出现和消失；普通阅读内容保持稳定。指针反馈以短暂的颜色或边框变化为主，焦点不延迟。主题切换时正文与画布同步更新，避免过渡中出现低对比度。

首页首屏可以保留有节制的入场、枝叶和身份轨道动效，表达博客的个性。启用减少动态效果时，内容立即呈现，非必要位移和持续动画停止，交互与状态仍完整可用。浮层支持键盘进入、Escape 关闭和焦点恢复；具体行为见上表。

## 8. 响应式行为

从手机单列阅读和触屏操作出发，随可用空间增加再安排目录或并列内容。日夜主题共享相同的布局、阅读顺序和操作方式。

| 视口宽度 | 布局变化 |
| --- | --- |
| `≤ 680px` | 两侧 `20px`；单列，首页简介与头像上下排列 |
| `> 680px` 且 `< 1000px` | 两侧 `24px`；正文单列，目录收进入口 |
| `≥ 1000px` | 两侧 `32px`；内容容器足够宽时，正文与目录并列 |

页头在 `760px` 以下将栏目与搜索收入菜单；文章目录并列还要求内容容器至少 `936px`。长标题和链接允许换行，代码与表格在各自区域滚动，页面本身避免横向溢出。验证应覆盖宽屏、手机宽度、两套主题、键盘与减少动态效果；浏览器模拟不能替代真实设备。

<a id="九设计判断标准"></a>

## 9. 设计判断：应该与避免

### 应该

- 先问访客在这屏需要理解什么、下一步能做什么，再决定视觉强调。
- 用绿色连接身份，用主题行动色回应操作，让状态和焦点各司其职。
- 优先复用现有令牌、组件与交互语言；为新规则说明场景和验证方式。
- 使用语义工具类（如 `bg-muted`、`text-primary-foreground`、`text-status-error`），不要写十六进制色值。
- 修改颜色时先改 [tokens.css](src/styles/tokens.css)，再运行 `node scripts/sync-color-docs.mjs` 更新文档。
- 在两套主题、真实内容与不同宽度下检查阅读、焦点和状态。
- 保留能增加识别性、可读性或情感价值的个人细节。

### 避免

- 让酒红长期装饰非行动内容，或把它直接当成错误色。
- 用颜色单独表达状态、数据类别或可操作性。
- 将同一个意思用颜色、下划线和背景反复强调。
- 为了统一外观而把所有内容包进卡片，或让装饰盖过文章。
- 在手机上通过缩小文字、裁掉内容或依赖悬停来容纳桌面布局。
- 直接编辑生成的颜色章节，或引入 Tailwind 的原始色板绕过语义令牌。
- 把终端、身份牌或代码块改造成普通的 `card`；它们有各自的表面职责。

最终以四项标准评估设计：**清晰、舒适、一致、有我自己的声音**。访客应能理解主次、舒适阅读、预测同类操作，并从绿色、双头像与克制的细节中认出这里属于谁。

## 10. 给设计与编码代理的使用指南

开始修改界面前，先读本文和 [AGENTS.md](AGENTS.md)。先查找现有 token、组件和同类交互；如需调整具体色值、尺度或组件规则，同步更新对应章节，并标明提案、实现和验证状态。

可以这样描述任务：

- **新增内容入口**：「使用现有次级跳转语言，让入口在日夜主题和键盘操作下清楚可辨；内容仍是视觉中心。」
- **设计反馈**：「明确这是信息、成功、警告还是错误；使用相应状态令牌，并提供文字或图标，验证实际表面上的对比度。」
- **新增图表**：「先确定数据关系与类别映射，再选择语义数据色；直接标注数值，并提供颜色以外的区分方式和等价文本。」
- **调整页面**：「沿用页框和返回入口的共同基线，检查宽屏与手机阅读列、焦点、溢出及两套主题。」

这些示例用于传达设计意图；具体数值、现有实现和待验证事项仍以设计系统文字规范及代码为准。
