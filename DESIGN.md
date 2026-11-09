---
version: 0.1.0
name: clerimia
description: '安静，但有自己的声音。整体安静，局部鲜活。'
colors:
  # shadcn/ui theme tokens
  background: '#fafafa'
  foreground: '#263b2e'
  card: '#ffffff'
  card-foreground: '#263b2e'
  popover: '#ffffff'
  popover-foreground: '#263b2e'
  primary: '#3f7050'
  primary-foreground: '#ffffff'
  secondary: '#eeeeee'
  secondary-foreground: '#263b2e'
  muted: '#f5f5f5'
  muted-foreground: '#48604e'
  accent: '#d0e7d5'
  accent-foreground: '#263b2e'
  destructive: '#ab2e2e'
  destructive-foreground: '#ffffff'
  border: '#878787'
  input: '#878787'
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
  sidebar-accent: '#eeeeee'
  sidebar-accent-foreground: '#263b2e'
  sidebar-border: '#878787'
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
  term-edge: '#878787'
  term-muted: '#48604e'
  term-chrome: '#ffffff'
  term-chrome-edge: '#878787'
  term-foreground: '#263b2e'
colorsDark:
  # shadcn/ui theme tokens
  background: '#191d1c'
  foreground: '#eeeeee'
  card: '#262d29'
  card-foreground: '#eeeeee'
  popover: '#262d29'
  popover-foreground: '#eeeeee'
  primary: '#df9aae'
  primary-foreground: '#2b1920'
  secondary: '#334638'
  secondary-foreground: '#eeeeee'
  muted: '#262d29'
  muted-foreground: '#c8c8c8'
  accent: '#38232a'
  accent-foreground: '#eeeeee'
  destructive: '#ff857e'
  destructive-foreground: '#2b1920'
  border: '#66786c'
  input: '#66786c'
  ring: '#a9d8b4'
  chart-1: '#a9d8b4'
  chart-2: '#9fcbed'
  chart-3: '#d4b6e7'
  chart-4: '#e4c18a'
  chart-5: '#e2b3c6'
  sidebar: '#262d29'
  sidebar-foreground: '#eeeeee'
  sidebar-primary: '#df9aae'
  sidebar-primary-foreground: '#2b1920'
  sidebar-accent: '#334638'
  sidebar-accent-foreground: '#eeeeee'
  sidebar-border: '#66786c'
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
  status-error: '#ff857e'
  status-error-surface: '#3d2929'
  term-canvas: '#1e2721'
  term-edge: '#3a463d'
  term-muted: '#ababab'
  term-chrome: '#25342a'
  term-chrome-edge: '#435d49'
  term-foreground: '#a9d8b4'
typography:
  display:
    fontFamily: Satoshi
    fontSize: 'clamp(34px, 26.6px + 2vw, 48px)'
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: '0em'
  page-title:
    fontFamily: Satoshi
    fontSize: 'clamp(28px, 23.6px + 1.2vw, 36px)'
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: '0em'
  section:
    fontFamily: Satoshi
    fontSize: 'clamp(22px, 20.8px + 0.3vw, 24px)'
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
    fontSize: 'clamp(17px, 16.5px + 0.15vw, 18px)'
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
  base: 8px
  sm: 4.8px
  md: 6.4px
  lg: 8px
  xl: 11.2px
  2xl: 14.4px
  3xl: 17.6px
  4xl: 20.8px
  code: 4.8px
  control: 6.4px
  panel: 8px
  dialog: 11.2px
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

本文借鉴 [Vercel 设计文档](https://fchangjun.github.io/awesome-design-md-cn/design-md/vercel/DESIGN.md) 的组织方式，描述本站的设计意图和日常判断。本文同时承担设计规范的角色：色彩、排版、尺度与组件规则都写在下面，色值表由 `src/styles/tokens.css` 生成；[AGENTS.md](AGENTS.md) 是项目工作入口。设计灵感来源于 [Notion「个人博客网站前端 UI/UX 设计」](https://app.notion.com/p/40540f8bc1e6804ab903fa51c4225aae)（整理于 2026-10-26）。令牌与组件的画板在 `pencil-shadcn.pen` 中，语义契约遵循 [shadcn/ui Theming](https://ui.shadcn.com/docs/theming#base-colors) 的 surface / foreground 配对与半径派生规则。

## 1. 视觉主题与氛围

文章和创作是视觉中心。安静的背景、舒展的排版与稳定的层级为阅读留出空间；身份、行动和有意义的互动可以更鲜活。每一种视觉元素都应帮助理解、使用或感受内容。

若叶睦与 Mortis 启发了两套主题：外在的安静、内在的表达欲，以及不同自我能够共存的可能。两种角色是同一个人的不同面向，共用信息结构与交互方式。

- **若叶睦 · 日间**：安静、轻盈、柔和。近白画布、深灰绿文字和低饱和绿色营造清透的阅读环境。
- **墨提斯 · 夜间**：开放、活力、戏剧性。炭灰画布让正文保持安静，绿色延续身份，酒红在行动和适合的交互反馈中出现。
- **共同身份**：绿色、双头像和少量角色细节让日夜主题仍属于同一个人。角色元素提供情绪，内容负责表达。
- **内容优先**：通过对齐、留白与排版组织主次；装饰应让信息更易理解，或带来明确的情感价值。

<!-- color-tokens:start -->
## 2. 色彩与信息职责

色彩的首要任务是传递信息。`src/styles/tokens.css` 是唯一色值来源，并分为三层：

| 层 | 令牌 | 职责 |
| --- | --- | --- |
| 原语 | `--primitive-*` | 原始色值；只被语义层引用，组件不直接使用 |
| 语义 | `--background`、`--foreground`、`--primary` 等 | shadcn/ui 命名与成对角色；日夜主题在此切换 |
| 组件 | `bg-primary`、`text-muted-foreground` 等 | 组件只消费语义工具类 |

主题令牌采用 shadcn/ui 的命名（`background`、`foreground`、`card`、`popover`、`primary`、`secondary`、`muted`、`accent`、`destructive`、`border`、`input`、`ring`、`chart-1–5`、`sidebar`），`brand`、`primary-hover/active`、`status-*` 与终端 `term-*` 作为本站扩展。组件使用 `hsl(var(--token))` 或 Tailwind 4 语义类；品牌、行动与状态即使暂时同色，也保留各自职责。完整令牌表见本节。

日间画布与支持表面保持中性；绿色留给主要行动、身份与临时交互状态。`--accent` 专指交互悬停/选中（ghost 按钮、菜单高亮、选中行），`--secondary` 是次级实心表面，`--muted` 是弱化内容表面；三者职责不同，不互相替代。

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
| `--background` | `#fafafa` | `#191d1c` | 页面画布 |
| `--foreground` | `#263b2e` | `#eeeeee` | 正文与标题 |
| `--card` | `#ffffff` | `#262d29` | 面板与浮层表面 |
| `--primary` | `#3f7050` | `#df9aae` | 主要行动与链接 |
| `--primary-foreground` | `#ffffff` | `#2b1920` | 实心行动底上的文字 |
| `--muted-foreground` | `#48604e` | `#c8c8c8` | 弱化内容表面上的辅助文字 |
| `--ring` | `#315a40` | `#a9d8b4` | 键盘焦点 |
| `--brand` | `#3f7050` | `#a9d8b4` | 跨主题绿色身份 |

文字与必要的控件边界应按实际表面验证对比度，普通文字以 4.5:1、大号文字与必要控件边界以 3:1 为目标。日间 `--border` 对画布约 3.4:1；夜间 `--border` 对卡片约 3.0:1。信息提示配色和分类数据色已定义，真实组件与图表中的使用仍需验证。

### 原语色板

下表由原语通道换算为便于查看的十六进制色值；原语只用于定义语义令牌，组件应使用语义工具类。

| 色系 | 原语令牌 | 色值 |
| --- | --- | --- |
| neutral | `--primitive-neutral-0` | `#ffffff` |
| neutral | `--primitive-neutral-50` | `#fafafa` |
| neutral | `--primitive-neutral-100` | `#f5f5f5` |
| neutral | `--primitive-neutral-200` | `#eeeeee` |
| neutral | `--primitive-neutral-250` | `#f0f0f0` |
| neutral | `--primitive-neutral-300` | `#e3e3e3` |
| neutral | `--primitive-neutral-400` | `#c8c8c8` |
| neutral | `--primitive-neutral-450` | `#ababab` |
| neutral | `--primitive-neutral-500` | `#878787` |
| neutral | `--primitive-neutral-550` | `#66786c` |
| neutral | `--primitive-neutral-600` | `#48604e` |
| neutral | `--primitive-neutral-650` | `#43544a` |
| neutral | `--primitive-neutral-700` | `#3a463d` |
| neutral | `--primitive-neutral-750` | `#334638` |
| neutral | `--primitive-neutral-800` | `#263b2e` |
| neutral | `--primitive-neutral-850` | `#262d29` |
| neutral | `--primitive-neutral-900` | `#1e2721` |
| neutral | `--primitive-neutral-950` | `#191d1c` |
| green | `--primitive-green-50` | `#edf6ef` |
| green | `--primitive-green-100` | `#e4efe6` |
| green | `--primitive-green-200` | `#dcecde` |
| green | `--primitive-green-250` | `#d0e7d5` |
| green | `--primitive-green-300` | `#a9d8b4` |
| green | `--primitive-green-400` | `#7fb18d` |
| green | `--primitive-green-500` | `#5b8a68` |
| green | `--primitive-green-600` | `#3f7050` |
| green | `--primitive-green-650` | `#435d49` |
| green | `--primitive-green-700` | `#315a40` |
| green | `--primitive-green-800` | `#2b4e38` |
| green | `--primitive-green-850` | `#22382b` |
| green | `--primitive-green-900` | `#25342a` |
| green | `--primitive-green-950` | `#1a2a20` |
| wine | `--primitive-wine-50` | `#fff1f4` |
| wine | `--primitive-wine-100` | `#f5c4d0` |
| wine | `--primitive-wine-200` | `#e3a7b8` |
| wine | `--primitive-wine-300` | `#df9aae` |
| wine | `--primitive-wine-400` | `#c9748f` |
| wine | `--primitive-wine-500` | `#b05a76` |
| wine | `--primitive-wine-600` | `#8d3f5b` |
| wine | `--primitive-wine-700` | `#6b2f45` |
| wine | `--primitive-wine-800` | `#4a2131` |
| wine | `--primitive-wine-900` | `#38232a` |
| wine | `--primitive-wine-950` | `#2b1920` |
| blue | `--primitive-blue-50` | `#eef5fa` |
| blue | `--primitive-blue-100` | `#d9e9f5` |
| blue | `--primitive-blue-200` | `#9fcbed` |
| blue | `--primitive-blue-300` | `#6ba9d9` |
| blue | `--primitive-blue-400` | `#4485b8` |
| blue | `--primitive-blue-500` | `#2f6e9b` |
| blue | `--primitive-blue-600` | `#285e86` |
| blue | `--primitive-blue-700` | `#1f4a6b` |
| blue | `--primitive-blue-800` | `#1a3d58` |
| blue | `--primitive-blue-850` | `#1e3342` |
| blue | `--primitive-blue-900` | `#142f42` |
| blue | `--primitive-blue-950` | `#102432` |
| amber | `--primitive-amber-50` | `#fbf2e4` |
| amber | `--primitive-amber-100` | `#f7e7cf` |
| amber | `--primitive-amber-200` | `#e4c18a` |
| amber | `--primitive-amber-300` | `#d6a85e` |
| amber | `--primitive-amber-400` | `#bd8c3b` |
| amber | `--primitive-amber-500` | `#a06f24` |
| amber | `--primitive-amber-600` | `#805417` |
| amber | `--primitive-amber-700` | `#6a4512` |
| amber | `--primitive-amber-800` | `#533610` |
| amber | `--primitive-amber-850` | `#382e20` |
| amber | `--primitive-amber-900` | `#3f290d` |
| amber | `--primitive-amber-950` | `#291b0a` |
| red | `--primitive-red-50` | `#fbefee` |
| red | `--primitive-red-100` | `#f7dedc` |
| red | `--primitive-red-200` | `#ffaaa4` |
| red | `--primitive-red-300` | `#ff857e` |
| red | `--primitive-red-400` | `#e85d55` |
| red | `--primitive-red-500` | `#cf3f38` |
| red | `--primitive-red-600` | `#ab2e2e` |
| red | `--primitive-red-700` | `#8a2424` |
| red | `--primitive-red-800` | `#6b1d1d` |
| red | `--primitive-red-900` | `#521818` |
| red | `--primitive-red-950` | `#3d2929` |
| violet | `--primitive-violet-50` | `#f5effa` |
| violet | `--primitive-violet-100` | `#ebdff5` |
| violet | `--primitive-violet-200` | `#d4b6e7` |
| violet | `--primitive-violet-300` | `#b98fd3` |
| violet | `--primitive-violet-400` | `#9b6fbd` |
| violet | `--primitive-violet-500` | `#8255a6` |
| violet | `--primitive-violet-600` | `#704e86` |
| violet | `--primitive-violet-700` | `#5b3f6d` |
| violet | `--primitive-violet-800` | `#483255` |
| violet | `--primitive-violet-900` | `#36263f` |
| violet | `--primitive-violet-950` | `#251a2b` |
| rose | `--primitive-rose-50` | `#fbf0f4` |
| rose | `--primitive-rose-100` | `#f7e0e8` |
| rose | `--primitive-rose-200` | `#e2b3c6` |
| rose | `--primitive-rose-300` | `#d291aa` |
| rose | `--primitive-rose-400` | `#b96d8b` |
| rose | `--primitive-rose-500` | `#a15775` |
| rose | `--primitive-rose-600` | `#8a4f66` |
| rose | `--primitive-rose-700` | `#713f53` |
| rose | `--primitive-rose-800` | `#582f41` |
| rose | `--primitive-rose-900` | `#40222f` |
| rose | `--primitive-rose-950` | `#2b1720` |

### 主题语义令牌

| 语义令牌 | 日间 | 夜间 | 用途 |
| --- | --- | --- | --- |
| `--background` | `#fafafa` | `#191d1c` | 页面画布 |
| `--foreground` | `#263b2e` | `#eeeeee` | 正文与标题 |
| `--card` | `#ffffff` | `#262d29` | 面板与浮层表面 |
| `--card-foreground` | `#263b2e` | `#eeeeee` | 面板与浮层上的正文 |
| `--popover` | `#ffffff` | `#262d29` | 浮层表面 |
| `--popover-foreground` | `#263b2e` | `#eeeeee` | 浮层上的正文 |
| `--primary` | `#3f7050` | `#df9aae` | 主要行动与链接 |
| `--primary-foreground` | `#ffffff` | `#2b1920` | 实心行动底上的文字 |
| `--primary-hover` | `#315a40` | `#f5c4d0` | 已着行动色的悬停状态 |
| `--primary-active` | `#2b4e38` | `#e3a7b8` | 已着行动色的按下状态 |
| `--secondary` | `#eeeeee` | `#334638` | 次级实心表面与中性标签 |
| `--secondary-foreground` | `#263b2e` | `#eeeeee` | 中性局部表面上的正文 |
| `--muted` | `#f5f5f5` | `#262d29` | 弱化内容表面 |
| `--muted-foreground` | `#48604e` | `#c8c8c8` | 弱化内容表面上的辅助文字 |
| `--accent` | `#d0e7d5` | `#38232a` | 交互悬停与选中表面（ghost / 菜单 / 行） |
| `--accent-foreground` | `#263b2e` | `#eeeeee` | 行动弱表面上的正文 |
| `--destructive` | `#ab2e2e` | `#ff857e` | 破坏性操作背景（错误角色别名） |
| `--destructive-foreground` | `#ffffff` | `#2b1920` | 破坏性操作文字 |
| `--border` | `#878787` | `#66786c` | 分隔与默认边框 |
| `--input` | `#878787` | `#66786c` | 输入控件边框 |
| `--ring` | `#315a40` | `#a9d8b4` | 键盘焦点 |
| `--chart-1` | `#3f7050` | `#a9d8b4` | 无序分类数据系列 1 |
| `--chart-2` | `#285e86` | `#9fcbed` | 无序分类数据系列 2 |
| `--chart-3` | `#704e86` | `#d4b6e7` | 无序分类数据系列 3 |
| `--chart-4` | `#805417` | `#e4c18a` | 无序分类数据系列 4 |
| `--chart-5` | `#8a4f66` | `#e2b3c6` | 无序分类数据系列 5 |
| `--sidebar` | `#ffffff` | `#262d29` | 侧栏表面 |
| `--sidebar-foreground` | `#263b2e` | `#eeeeee` | 侧栏正文 |
| `--sidebar-primary` | `#3f7050` | `#df9aae` | 侧栏主要行动 |
| `--sidebar-primary-foreground` | `#ffffff` | `#2b1920` | 侧栏主要行动文字 |
| `--sidebar-accent` | `#eeeeee` | `#334638` | 侧栏选中表面 |
| `--sidebar-accent-foreground` | `#263b2e` | `#eeeeee` | 侧栏选中文字 |
| `--sidebar-border` | `#878787` | `#66786c` | 侧栏边线 |
| `--sidebar-ring` | `#315a40` | `#a9d8b4` | 侧栏焦点 |
| `--brand` | `#3f7050` | `#a9d8b4` | 跨主题绿色身份 |
| `--status-info` | `#285e86` | `#9fcbed` | 信息状态文字与图标 |
| `--status-info-surface` | `#eef5fa` | `#1e3342` | 信息状态弱表面 |
| `--status-success` | `#3f7050` | `#a9d8b4` | 成功状态文字与图标 |
| `--status-success-surface` | `#edf6ef` | `#22382b` | 成功状态弱表面 |
| `--status-warning` | `#805417` | `#e4c18a` | 警告状态文字与图标 |
| `--status-warning-surface` | `#fbf2e4` | `#382e20` | 警告状态弱表面 |
| `--status-error` | `#ab2e2e` | `#ff857e` | 错误状态文字与图标 |
| `--status-error-surface` | `#fbefee` | `#3d2929` | 错误状态弱表面 |
| `--term-canvas` | `#ffffff` | `#1e2721` | 终端画布 |
| `--term-edge` | `#878787` | `#3a463d` | 终端边线 |
| `--term-muted` | `#48604e` | `#ababab` | 终端辅助文字 |
| `--term-chrome` | `#ffffff` | `#25342a` | 终端标题栏 |
| `--term-chrome-edge` | `#878787` | `#435d49` | 终端标题栏边线 |
| `--term-foreground` | `#263b2e` | `#a9d8b4` | 终端标题栏文字 |

每个表面令牌都有对应的 `-foreground`。状态文字使用 `--status-*`，弱表面使用 `--status-*-surface`。两套主题的弱表面保持三级阶梯：`--muted`（弱化内容）< `--secondary`（选择与命中）< `--accent`（行动悬停）；日间为 `#f5f5f5 < #eeeeee < #d0e7d5`，夜间为 `#262d29 < #334638 < #38232a`。圆角以 `--radius: 8px` 为基准，按 shadcn/ui 的 `0.6 / 0.8 / 1 / 1.4 / 1.8 / 2.2 / 2.6` 派生为 `4.8 / 6.4 / 8 / 11.2 / 14.4 / 17.6 / 20.8px`。组件优先使用语义工具类，避免直接写色值。
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

实现以 `src/styles/tokens.css` 为统一来源，Tailwind 4 的 `text-{role}` 同时应用字号、行高、字重和字距（标题角色 600，其余 400，默认 `0em`）；`.dark` 类切换主题。组件文字使用 shadcn/ui 的 `text-xs / text-sm / text-base`（12 / 14 / 16px），界面默认 `text-sm`，标签与元信息用 `text-xs`，正文仍使用 `text-reading` 以保留长文节奏。`src/styles/global.css` 汇集语义映射与基础层，现有站点样式保留；`src/components/ui/` 放 shadcn/ui 风格的基础原语，`src/pages/design.astro` 是可在浏览器中检查的令牌与组件画板。JS 通过 `src/lib/tokens.ts` 读取 CSS 动效和复用媒体查询。（基础层已实现；页面级双主题与真实设备回归待完成。）

正文以 400 字重为起点，标题和重点以 600–700 为起点；部分层级在宽窄屏之间平滑变化。首页标语是展示例外：以更大的字号、两行排版和身份绿渐变承载创作理念；具体数值见本节表格。不要通过降低正文对比度来制造安静感。

## 4. 组件语言

### 基础原语（shadcn/ui）

组件语言以 shadcn/ui 的官方 registry 为基线，不手写组件外壳。基础集通过 `npx shadcn@latest add` 安装到 `src/components/ui/`，保留官方 API、`data-slot`、`class-variance-authority` 变体与 `cn` 合并；只做两类本地调整：让变体接入本站 token，以及把控件高度接到 `--control-height-*`。当前包括 `Button`、`Badge`、`Card`、`Input`、`Textarea`、`Label`、`Separator`、`Alert`、`Avatar`、`Skeleton`、`Field`、`InputGroup` 与 `Pagination`；需要更多组件时继续用 CLI 添加，不把整套组件库一次性搬进来。

站点外壳复用同一套原语：按钮型行动使用 `Button`；链接型行动在 `.astro` 中用 `buttonVariants(...)` 生成原生 `<a>` 的类名并标记 `data-slot="button"`（React 的 `asChild` 无法在 Astro 模板中合并 slot 子元素，因此不用于 `.astro`）；标签使用 `Badge`，面板使用 `Card`，分隔线使用 `Separator`，搜索失败提示使用 `Alert`，终端输入使用 `Input`，分页使用 `Pagination`。终端窗口、文章整卡、友链菜园、原生 disclosure 与返回顶部承担专门交互，保留自有结构。

- **Button**：官方 `default / secondary / outline / ghost / destructive / link` 变体与尺寸；默认高 `36px`，窄屏 `44px`。默认变体的悬停/按下使用 `--primary-hover / --primary-active`，破坏性按钮使用 `--destructive-foreground`，避免依赖已从语义色板移除的 `white`。焦点沿用官方 shadcn 的 `3px` ring。
- **Badge**：官方胶囊形基线，增加本站的 `info / success / warning / error` 状态变体；状态徽章必须同时有文字，颜色不是唯一信号。标签链接的命中区取控件高度（桌面 `36px`、窄屏 `44px`），胶囊间距由 `5px` 内边距形成，不再额外加 `gap`。
- **Card**：官方组合结构；按本站规则改为 `rounded-lg`（`8px`）且默认无阴影，标题/描述/操作区保持官方分工。
- **Input / Textarea / Label**：官方控件；输入框高 `36px`（窄屏 `44px`），边框使用 `--input`，聚焦环使用官方 `3px` ring。表单布局使用 `FieldGroup + Field + FieldLabel`，输入框内按钮使用 `InputGroup + InputGroupInput + InputGroupButton`。
- **Alert**：官方 `default / destructive` 之外增加 `info / success / warning / error` 弱表面变体；标题与描述提供文字说明，图标只做辅助。
- **Avatar / Separator / Skeleton**：官方组件；头像使用 `size="lg"` 得到 `40px` 圆形；分隔线 `1px`；骨架只用于加载占位，并遵循减少动态效果。
- **Pagination**：官方 `Pagination / PaginationContent / PaginationItem / PaginationLink`；站点分页保留左右对齐的纯文字链接样式，通过 `className` 降低按钮表面，不额外引入页码。

旧站点 CSS 的元素级规则（`button`、`a`、`input`）通过 `:not([data-slot])` 与新原语隔离，Tailwind 工具类可以在原语内部正常生效。此前手写的 `site/Button.astro` 已移除：链接型入口与行动使用 `buttonVariants` 套原生 `<a>`，按钮型行动使用 `Button`，两者共享同一套变体与焦点环。`/design` 画板继续覆盖基础原语的组合与变体。

### 链接、按钮与导航

链接负责前往目的地，按钮负责执行操作或打开浮层，开关表达状态。正文链接保留下划线；次级跳转复用 `TextArrowLink`，默认使用辅助文字色，交互时转为行动色。导航当前项通过 `aria-current` 和可辨识的视觉状态表达。返回入口复用 `Button` 的次级表面，不另写链接外壳。

主要行动应清楚，次要行动降低权重。同一页面中同一层级的相同动作采用一致表达。触屏不依赖悬停，键盘焦点立即可见，触屏目标优先至少 `44 × 44px`；桌面密集导航可按控件高度收紧到 `36px`。

### 文章列表与内容

详细文章列表使用单列卡片：默认透出画布，以细边线和圆角建立边界；文章链接悬停或键盘聚焦时使用行动弱表面，标签保持独立操作。归档使用紧凑行，不将每一项都做成卡片。正文的标题、引用、代码、图片说明与目录应支持阅读主线。行内代码留在文本流中，使用弱表面和等宽字体区分，不用硬边线撑高行距。

### 终端与身份细节

终端是可操作的站点入口，也承载个人身份。标题栏使用身份牌，用户名使用身份绿，提示符使用行动色；成功和错误结果配合文字说明。终端输入焦点是常驻状态，以光标和局部边线表达；按钮与链接保留独立焦点环。窗口红黄绿圆点借用 macOS 窗口语言，不承担本站状态语义。

### 友链菜园

友链页以菜园为灵感，藤蔓、嫩芽与月亮建立温柔的场景；朋友和他们的创作仍是主体。整张友链卡片作为单一外链，描述应完整可读。装饰服务于场景与识别，不遮盖内容或操作。实现见 [links/index.astro](src/pages/links/index.astro) 与 [links/](src/components/links/)。

### 终端子主题

终端不是另一张普通卡片，而是页面里的独立“设备”。它使用自己的 `--term-*` 画布、边线和辅助文字，以及等宽字体节奏；标题栏使用 `--term-chrome / --term-chrome-edge / --term-foreground`。窗口红黄绿圆点沿用 macOS 系统色，属于固定的外来窗口语言，不映射为本站成功、警告或错误。输入焦点是常驻状态，由光标和局部边线表达；按钮、链接和目录仍使用独立焦点环。实现见 [Terminal.astro](src/components/home/Terminal.astro) 与 [terminal.css](src/styles/site/terminal.css)。

### 实现锚点

| 约定 | 实现位置 |
| --- | --- |
| 基础原语 | [button.tsx](src/components/ui/button.tsx)、[badge.tsx](src/components/ui/badge.tsx)、[card.tsx](src/components/ui/card.tsx)、[input.tsx](src/components/ui/input.tsx)、[alert.tsx](src/components/ui/alert.tsx)、[field.tsx](src/components/ui/field.tsx)、[input-group.tsx](src/components/ui/input-group.tsx)、[pagination.tsx](src/components/ui/pagination.tsx) |
| 语义令牌与尺度 | [tokens.css](src/styles/tokens.css)、[sync-color-docs.mjs](scripts/sync-color-docs.mjs) |
| 浏览器令牌画板 | [design.astro](src/pages/design.astro)、[DesignSystemShowcase.tsx](src/components/design/DesignSystemShowcase.tsx) |
| 次级跳转 | [TextArrowLink.astro](src/components/site/TextArrowLink.astro) |
| 标签 | [TagLink.astro](src/components/tags/TagLink.astro) → [badge.tsx](src/components/ui/badge.tsx) |
| 分页 | [Paginator.astro](src/components/site/Paginator.astro) → [pagination.tsx](src/components/ui/pagination.tsx) |
| 文章列表卡片 | [PostPreview.astro](src/components/site/PostPreview.astro) |
| 页头与移动菜单 | [SiteHeader.astro](src/components/site/SiteHeader.astro) |
| 首页藤环动效 | [generate-hero-vine.mjs](scripts/generate-hero-vine.mjs) → [HeroVine.astro](src/components/home/HeroVine.astro) + [home.css](src/styles/site/home.css) |
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

基础间距采用 `4 / 8 / 12 / 16 / 20 / 24 / 32 / 48 / 72px`，控件高 `32 / 36 / 40px`，窄屏提升到 `44px`。圆角以 `--radius: 8px` 为基准，按 shadcn/ui 的 `0.6 / 0.8 / 1 / 1.4 / 1.8 / 2.2 / 2.6` 派生；按职责使用：行内代码 `4.8px`、控件 `6.4px`、面板与卡片 `8px`、对话框 `11.2px`，胶囊用于标签与状态。宽度、间距和断点的完整规则见上表与第 8 节。

## 6. 表面、边界与层次

| 层次 | 表达 | 适用场景 |
| --- | --- | --- |
| 画布 | 平面背景与留白 | 页面、普通阅读内容 |
| 分组 | 细边线或必要的局部表面 | 文章卡片、独立内容区域 |
| 浮层 | 独立表面，必要时使用阴影与遮罩 | 对话框、终端、移动目录 |
| 焦点 | 清晰且立即出现的焦点环 | 键盘进入链接、按钮和其他控件 |

优先使用位置、间距和排版表达关系。边线用于分组或交互边界；卡片默认只用 `1px` 边线，不添加阴影。`--elevation-xs / sm / md / lg / overlay` 只服务于浮层、对话框与需要离开画布的临时表面，日夜主题各自调整透明度。基础原语沿用 shadcn 的 `3px` focus ring；站点文字链接保留 `2px` outline 与 `4px` 偏移。不要叠加多种强调方式来表达同一个状态，也不要为了装饰而普遍增加渐变、阴影或新配色。首页标语和局部身份细节有已记录的视觉例外。

## 7. 动效与交互

动效用于回应操作或说明浮层的出现和消失；普通阅读内容保持稳定。指针反馈以短暂的颜色或边框变化为主，焦点不延迟。主题切换时正文与画布同步更新，避免过渡中出现低对比度。

首页首屏可以保留有节制的入场和身份动效，表达博客的个性：头像外沿从左下起笔、逆时针绕一圈的藤环；藤身生长到哪个位置，叶片就在那里依次展开，七片叶基本等距，在左上方收尾、不闭环。整枝长成后，另有一片较透明的叶子从末梢附近向下飘落；风来时整枝轻摆。手机宽度（`≤ 680px`）不显示。叶片依次出现和透明落叶是一次性入场动效，不循环。启用减少动态效果时，内容立即呈现，非必要位移、持续动画和落叶停止，交互与状态仍完整可用。浮层支持键盘进入、Escape 关闭和焦点恢复；具体行为见上表。

**藤环动效状态**：已实现；已核验桌面宽屏、`390px`、日夜主题与减少动态效果，真实设备待验证。

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
- 优先复用现有令牌与官方 shadcn/ui 组件；需要新组件时先用 `npx shadcn@latest add`，只改变体与 token 对接，不为一次性需求手写外壳。
- 使用语义工具类（如 `bg-muted`、`text-primary-foreground`、`text-status-error`），不要写十六进制色值。
- 修改颜色时先改原语，再改语义映射，最后运行 `node scripts/sync-color-docs.mjs` 更新文档与 `pencil-shadcn.pen` 的 Brand 主题。
- 新原语根节点带 `data-slot`，让旧站点元素级样式与新组件隔离；不要用 `!important` 压过旧样式。
- 表单用 `FieldGroup + Field`，输入框内按钮用 `InputGroup`，提示用 `Alert`，加载用 `Skeleton`；先查官方组件再考虑自绘。
- 在两套主题、真实内容与不同宽度下检查阅读、焦点和状态；新增或修改基础原语时同时检查 `/design`。
- 保留能增加识别性、可读性或情感价值的个人细节。

### 避免

- 让酒红长期装饰非行动内容，或把它直接当成错误色。
- 用颜色单独表达状态、数据类别或可操作性。
- 将同一个意思用颜色、下划线和背景反复强调。
- 为了统一外观而把所有内容包进卡片，或让装饰盖过文章。
- 在手机上通过缩小文字、裁掉内容或依赖悬停来容纳桌面布局。
- 在组件里直接引用 `--primitive-*`；原语只允许在 `tokens.css` 的语义映射中出现。
- 手写 shadcn/ui 已有组件的外壳，或用裸 `span` / `div` 代替 `Badge`、`Alert`、`Card`、`Separator`。
- 直接编辑生成的颜色章节，或引入 Tailwind 的原始色板绕过语义令牌。
- 把终端、身份牌或代码块改造成普通的 `card`；它们有各自的表面职责。

最终以四项标准评估设计：**清晰、舒适、一致、有我自己的声音**。访客应能理解主次、舒适阅读、预测同类操作，并从绿色、双头像与克制的细节中认出这里属于谁。

## 10. 给设计与编码代理的使用指南

开始修改界面前，先读本文和 [AGENTS.md](AGENTS.md)。先查找现有 token、组件和同类交互；如需调整具体色值、尺度或组件规则，同步更新对应章节，并在 `pencil-shadcn.pen` 中更新令牌画板，标明提案、实现和验证状态。

可以这样描述任务：

- **新增内容入口**：「使用现有次级跳转语言，让入口在日夜主题和键盘操作下清楚可辨；内容仍是视觉中心。」
- **设计反馈**：「明确这是信息、成功、警告还是错误；使用相应状态令牌，并提供文字或图标，验证实际表面上的对比度。」
- **新增基础控件**：「先在 `pencil-shadcn.pen` 的 Brand=Clerimia 主题里画状态，再在 `src/components/ui/` 实现 CVA 变体；根节点带 `data-slot`，只用语义工具类。」
- **新增图表**：「先确定数据关系与类别映射，再选择语义数据色；直接标注数值，并提供颜色以外的区分方式和等价文本。」
- **调整页面**：「沿用页框和返回入口的共同基线，检查宽屏与手机阅读列、焦点、溢出及两套主题；同时打开 `/design` 检查基础原语。」

这些示例用于传达设计意图；具体数值、现有实现和待验证事项仍以设计系统文字规范及代码为准。

## 11. Pencil 令牌基石

`pencil-shadcn.pen` 现在同时是 shadcn/ui 组件参考与本站的设计系统画板。画板以 `Brand: Clerimia` 为当前工作主题，保留 `Mode` 与 `Neutral / Default` 轴：当主题设为 `{ Mode: Light | Dark, Brand: Clerimia }` 时，`--background`、`--foreground`、`--primary`、`--border` 等令牌使用本站的苔绿/酒红映射；shadcn 组件因此可以直接在 Brand 主题下预览。原组件的其它 Base/Accent 变体不参与本次令牌画板。[shadcn/ui Theming](https://ui.shadcn.com/docs/theming#base-colors)

| 项目 | Pencil 实现 | 与网页的关系 |
| --- | --- | --- |
| 原语 | `--clerimia-neutral-* / green-* / wine-* / blue-* / amber-* / red-* / violet-* / rose-*` | 对应 `tokens.css` 的 `--primitive-*`，色值一致 |
| 语义 | `--background / foreground / card / popover / primary / secondary / muted / accent / destructive / border / input / ring / sidebar-*` | shadcn/ui 命名；Brand 主题提供 Light/Dark 两套值 |
| 扩展 | `--brand / primary-hover / primary-active / status-* / chart-* / term-*` | 对应 `tokens.css` 的站点扩展 |
| 尺度 | `--clerimia-radius-*`、`--clerimia-space-*`、`--clerimia-control-*`、`--clerimia-font-*` | 与网页的 8px 基准、4px 基线和 32/36/40/44px 控件高度一致 |
| 画板 | `clerimia: token foundation`（Light）与其深色副本（Dark） | 含原语、语义、排版、圆角/间距、基础组件与使用约定六段 |

画板使用 Inter 作为预览字体（Pencil 不提供自托管的 Satoshi）；网页仍使用 Satoshi / Microsoft YaHei。画板中的组件示例用于检查令牌组合与对比度，不替代真实组件的行为验证；网页实现见 `/design` 与 `src/components/ui/`。Pencil 画板已检查布局、裁剪与两套主题；浏览器端的键盘、触屏与真实设备验证仍待完成。
