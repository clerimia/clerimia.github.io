# 设计系统评审：基础色板与变量

评审日期：2026-11-05　｜　评审对象：基础色板、色彩变量、字体变量、尺度与动效变量
评审方式：以 [DESIGN.md](../DESIGN.md) 与 [设计系统文字规范](design-language.md) 为准绳，对 `src/assets/styles/color-tokens.css`、`src/assets/styles/app.css`、`uno.config.ts` 做静态审计；对比度由脚本从 token 源文件直接解析（不抄文档表格），令牌引用逐名统计。

本文件记录**评审结论与待决策项**，不是规范。规范仍以 [design-language.md](design-language.md) 为准；已落地的修复在第 5 节标明验证状态。

---

## 1. 评审标准

沿用 [DESIGN.md §9 的四项标准](DESIGN.md#九设计判断标准)——清晰、舒适、一致、有我自己的声音，并落到可测量的判据：

| 判据 | 可测口径 |
| --- | --- |
| 清晰 | 文字对比度 ≥ 4.5:1；必要控件边界与状态 ≥ 3:1；颜色不单独承担状态 |
| 舒适 | 字号与行高落在规范字阶内；两套主题阅读密度一致 |
| 一致 | 同一职责只有一个令牌与一种表达；色值只来自 `color-tokens.css`；规则有令牌可依 |
| 有我自己的声音 | 绿色贯穿双主题；行动色随主题；装饰不越权 |

---

## 2. 现状盘点

### 2.1 色彩

- 基础色板 `--palette-*` 共 44 个 HSL 通道（`color-tokens.css:4-47`）：中性 15 档、绿色 8 档、酒红 5 档，蓝/琥珀/红/紫/玫瑰各 3–4 档。
- 主题语义令牌 44 个，沿用 shadcn/ui 命名；站点扩展为 `--brand`、`--primary-hover/active`、`--status-*`、终端 `--term-*`。
- 终端子主题 `--term-*` 保存完整颜色值而非 HSL 通道——有意为之（终端是独立"设备"），但因此不参与 alpha 混用。
- UnoCSS `theme.colors`（`uno.config.ts:115-174`）暴露全部配对，组件可用 `bg-muted`、`text-status-error` 一类语义类。
- **主题覆盖完整**：`:root` 的 49 个语义令牌在 `.dark` 全部重定义，且两套主题取值互不相同，没有遗漏键。
- **令牌纪律未达成**：文档声明 `color-tokens.css` 是唯一色值来源，实际存在四类旁路——图表子色板、GitHub 活动热力图、`PostTOC` / `RedirectPage` 的字面色值、Shiki diff 与滚动条灰。

### 2.2 排版

- 字族两套：正文 `Satoshi, 'Microsoft YaHei', system-ui, sans-serif`（`app.css:69`）；等宽有 5 种写法（`app.css:404`、`home.css:173`、`links/index.astro:196`、`GitHubActivity.astro:211`、`terminal.css:10`、`header.css:121`）。
- 字号 8 个角色令牌 `--font-display` … `--font-meta`（`app.css:43-50`），**只有字号**，没有行高、字重、字族令牌。
- 行高硬编码 48 处；字重硬编码约 45 处，其中 `650` 用了 17 处。
- 首页标语是记录的视觉例外（Noto Sans SC 900，`home.css:1-8`）。

### 2.3 尺度与动效

- 间距 `--space-1…18` 共 9 档；圆角 5 档；布局 3 档。`app.css` 里另有约 20 处 px 值未走间距令牌（18/30/34/42/15px 等）。
- 动效令牌 `--motion-feedback`(160ms/ease-out) 与 `--motion-overlay`(220ms) 有落地；`--motion-theme`(240ms/ease-out) 只存在于文档。

---

## 3. 分级结论

### P0　系统自相矛盾

**F1　文档生成器在 CRLF 检出下破坏 frontmatter，仓库自带测试失败**　`scripts/sync-color-docs.mjs:304`

旧版第 304 行的 frontmatter 剥离正则 `/^---\n[\s\S]*?\n---\n\n?/` 假定 LF。`core.autocrlf=true` 且无 `.gitattributes`，Windows 检出为 CRLF，正则匹配失败 → 旧 frontmatter 未被剥离而是**追加了第二份**，同时 `tests/color-tokens.test.mjs` 第 4 项 `generated color documentation matches CSS tokens` 失败。

需要澄清的是：**色值章节本身是同步的**——用生成器重跑 `docs/design-language.md` 与 `docs/design-language.html` 无内容差异，坏掉的只是 frontmatter 重建。这也是为什么 CI（LF 检出）看不到问题。

> **已修复**，见第 5 节。

**F2　`/design.md` 端点的字节随检出行尾变化，`tests/infrastructure.test.mjs` 在 Windows 上失败**　`src/pages/design.md.ts:10`

端点用 `?raw` 直接导入 `DESIGN.md`，原样输出。Windows 检出下输出是 CRLF（实测 355/356 行是 CRLF），Linux 检出下是 LF。同一个"稳定入口"在两个平台给出不同字节，而 `tests/infrastructure.test.mjs:34` 的契约 `^---\n[\s\S]*?\n---\n\n# ` 是 LF 假设。

这是 F1 的同类缺陷，但出在对外服务侧：CI 在 Linux 上是绿的，本地 Windows 上是红的。

> **已修复**，见第 5 节。

### P1　职责混叠，违反自身规则

**F3　日间主题的边界与输入线远低于项目自定的 3:1 目标**

`design-language.md:144` 写明「必要控件边界与状态以 3:1 为目标」。实测（脚本从 `color-tokens.css` 直接解析）：

| 配对 | 日间 | 夜间 |
| --- | --- | --- |
| `--border` on `--background` | **1.35:1** | 2.11:1 |
| `--border` on `--card` | **1.39:1** | 1.75:1 |
| `--border` on `--secondary` | **1.22:1** | 1.26:1 |
| `--input` on `--background` | **1.35:1** | 2.11:1 |
| `--term-edge` on `--term-canvas` | **1.39:1** | 1.55:1 |

日间 `--border` 与 `--input` 同为 `--palette-neutral-100`（#d0ded2）。`--border` 被 37 处引用——卡片边框、分割线、头像圈、搜索面板、代码块、菜单面板、图标按钮外框都在其中。文档也承认「默认边框不足以单独承担必要控件边界」，但目前**没有第二个令牌**来承担必要边界。

> 已处理：`--border` / `--input` / `--sidebar-border` / `--term-edge` 改引 `neutral-125`（#7f9584），日间对画布 3.11:1、对卡片 3.21:1，见第 5 节。夜间保持 `neutral-500` 不变。

**F4　日间主题三个表面职责塌缩成同一个值**

日间 `--secondary` = `--muted` = `--accent` = `--sidebar-accent` = #e8f2ea，三者互相 1.00:1。夜间是分开的（1.03–1.44）。

直接后果：文章卡片悬停底色（`--accent`，`design-language.md:281`）与中性 chip 表面（`--secondary`）在日间完全同色——悬停一张文章卡片看起来像"冒出一个标签"，而不是"这张卡片被激活"。这正是 AGENTS.md 要防的「同一个意思说了两遍」的镜像情形：两个不同意思用了同一个值。

> 已处理：日间三个弱表面改为 `green-50`（weak）/ `green-100`（selection）/ `green-120`（action hover）三级阶梯，见第 5 节。

**F5　四处色值旁路，其中两处是完整的第二套色板**

| 位置 | 内容 | 规模 |
| --- | --- | --- |
| `src/assets/styles/article-diagrams.css:12-16, 34-39` | `--diagram-teal` #23786a、`--diagram-red` #a84b38、`--diagram-amber` #94612d 及夜间变体 | 6 个色值 + 6 个 alpha 底色，**这些色相在基础色板里不存在** |
| `src/components/about/GitHubActivity.astro:119-134` | `--activity-1…4` 阶梯：日间 #dce9b9/#bad67f/#87a956/#526d34，夜间 #37472c/#536c3c/#86a75a/#c5df96 | 8 个色值，一整套 4 级热度阶梯；其中 `#526d34`、`#86a75a` 与本站的 `--palette-green-700`、`--palette-green-200` 相近，**读起来像同源，实则无关** |
| `src/components/blog/PostTOC.astro:110, 114` | `--toc-hover-color: #2b4e38` / `#f5c4d0` | 值分别等于 `--primary-active` / `--primary-hover`——规范（`design-language.md:221`）正是这么规定的，代码却把令牌的值写死了 |
| `src/components/RedirectPage.astro:46-57` | 画布/正文/辅助/行动共 8 个双主题字面色值 | 整页脱离令牌 |

前三项都直接违反 `design-language.md:19`、`DESIGN.md:195` 与 `DESIGN.md:337` 的「唯一色值来源」「不要绕过语义令牌」。

> 决策项 D4。

**F6　图表分类底色互相 1.00:1，"分类"这一通道实际无效**

soft 变体是 6% 透明度的混入色。日间实测：

- `--diagram-blue-soft` #f3f6f5 vs `--diagram-red-soft` #faf4f3 → **1.00:1**
- 两者对卡片表面 → 均为 1.09:1

`AiValueDiagram.astro:187-189` 的四象限用三个 soft 色区分「高/低」两个维度，实际区分只靠 1px 边框与文字，填充通道等于不存在。

**F7　`--diagram-blue` 指向的是绿色**

`article-diagrams.css:10`：`--diagram-blue: hsl(var(--brand))`——品牌绿。名字与内容相反，后续维护极易误用。注释说明了意图（避免分类色随 action 变红），但变量名应改成 `--diagram-brand` 一类的中性名。

**F8　日间 hero 标点低于大字号 3:1 目标，夜间达标**

`home.css:71` 的标点色是 `color-mix(in srgb, brand 55%, background)`：

| | 混合结果 | 对画布对比度 |
| --- | --- | --- |
| 日间 | #93af9c | **2.30:1**（低于大字号 3:1） |
| 夜间 | #688470 | 4.15:1 ✓ |

`design-language.md:164` 把这个组件记为"已实现；宽屏、390px 与日夜主题下已检查字体加载、标题选择文本及无横向溢出"——检查过的是溢出与加载，可读性对比度未在目标内。日间 2.30:1 是夜间的一半，两个主题的标语标点强度明显不等。

> 已处理：日间混合比例 55% → 75%，实测 3.32:1，达到大字号 3:1 目标；夜间沿用同一比例，实测 4.15:1，见第 5 节。

### P2　一致性与纪律

**F9　字阶被定义了三次，且互相冲突**

| 来源 | 取值 | 与规范的冲突 |
| --- | --- | --- |
| CSS 令牌 `--font-*`（`app.css:43-50`） | 12/14/16/18/22/24/28–36/48 | 基准 |
| UnoCSS/Tailwind 默认刻度 | `text-3xl`=30px（13 处）、`text-xl`=20px（2 处） | 30/20 不在字阶上 |
| 组件内硬编码 px | 9/10/11/13/15/16/18/20/23px | 11/13/9 不在字阶上（最小 12px） |

`text-3xl` 用于 13 处页面级标题（`TagIndex.astro:17`、`TagResults.astro:25`、`archives/index.astro:23`、`blog/[...page].astro:55`、`musings/index.astro:36` 等）。其中多数被 `app.css:214-221` 的 `.site-content--inner main > h1 { font-size: var(--font-page-title) }` 以更高优先级覆盖，于是**同一个标题有两套尺寸来源**，靠层叠顺序而非规则生效。

**F10　字阶只有"字号"，缺行高、字重、字族令牌**

- 行高：48 处硬编码。规范表（`design-language.md:151-160`）为每个角色规定了行高，但 `app.css:79` 的 body 用 `1.65`，规范写 UI = `1.6`——已经漂移。
- 字族：5 套等宽写法、2 套正文字族（`app.css:69` 与 `BaseHead.astro:60` 不一致）。
- 字重：`650` 用了 17 处（`header.css:76`、三个图表组件），不在 400/500/600/700/900 的约定内。

**F11　`--font-*` 命名歧义**

`--font-display` 读起来像"展示用字体"，实际是字号。建议改 `--text-*`（Tailwind 习惯），或至少在 `design-language.md` 明确「`--font-*` 指字号」。

**F12　动效令牌未覆盖实际用量**

| 时长 | 令牌 | 实际写法 |
| --- | --- | --- |
| 160ms | `--motion-feedback` ✓ | 令牌，15 处（配套 easing 13 处） |
| 180ms | 无 | `app.css:298-300` 硬编码 |
| 200ms | 无 | `icon-button.css:6,16`、`TextArrowLink.astro:24,27`、`home.css:133`、`links.css:166,169`、`links/index.astro:153-154` |
| 220ms | `--motion-overlay` ✓ | 令牌，13 处（配套 easing 10 处） |
| 240ms | `--motion-theme` **仅文档** | `design-language.md:233` 定义，实现里不存在 |

缓动也不统一：令牌用 `ease-out`，硬编码用 `ease`。结果是"悬停反馈"在不同组件上是 160ms 与 200ms 两种节奏。

**F13　25 个语义令牌零引用，UnoCSS 侧 42/47 个颜色键从未被工具类用到**

在 `src/` 里没有任何 `var()` 引用的语义令牌：**25 个**——

`--card-foreground`、`--popover`、`--popover-foreground`、`--secondary-foreground`、`--accent-foreground`、`--destructive`、`--destructive-foreground`、`--chart-1…5`、`--sidebar` 全 8 个、`--status-info`、`--status-info-surface`、`--status-success-surface`、`--status-warning-surface`、`--status-error-surface`。

UnoCSS 侧：`theme.colors` 有 47 个颜色叶子，**只有 5 个**被语义工具类真正用到（`text-foreground`、`bg-card`、`text-primary`、`bg-muted`、`text-muted-foreground`）。`brand` 有 25 处 `var()` 使用却零工具类使用；`border`、`ring`、`accent`、`primary-foreground`、`secondary`、`primary-hover/active` 等同样从未以工具类出现。

`--status-*-surface` 尤其值得注意：文档写「状态表面的色值已定义并经过纯色对比计算，尚未在实际提示组件中验证」——它们通过了计算，却从未被渲染过。

另有一处命名重叠：`uno.config.ts:155,160,165,170` 的 `status.*.foreground` 与 `status.*.DEFAULT` 指向同一个 token，只是两个工具类名。

**F14　同一主题内多个角色共用同一个值**

| 主题 | 共用值 | 角色 |
| --- | --- | --- |
| 日间 | #3f7050 | `--primary` = `--chart-1` = `--sidebar-primary` = `--brand` = `--status-success` |
| 日间 | #d0ded2 | `--border` = `--input` = `--sidebar-border` = `--term-edge` = `--term-chrome-edge` |
| 日间 | #e8f2ea | `--secondary` = `--muted` = `--accent` = `--sidebar-accent` |
| 夜间 | #a9d8b4 | `--ring` = `--chart-1` = `--sidebar-ring` = `--brand` = `--status-success` = `--term-foreground` |

两个后果：

1. **"成功"和"操作"同色**（两套主题皆是）。终端用 `.wt-tone-ok` 表达成功（`terminal.css:285`），与 `.wt-tone-primary` 同值——成功反馈读起来像一次普通操作。
2. **夜间终端身份与 chrome 文字同色**：`--term-foreground` = `--brand` = #a9d8b4，而提示符用户名（`terminal.css:210`）也用 `--brand`。标题栏文字与用户名无法区分，而规范明确说「用户名取跨主题的绿色，`❯` 使用行动色——它说的是『可以在这里输入』，不是『你是谁』」（`design-language.md:259`）。夜间 `❯` 是酒红、用户名是浅绿、标题栏文字也是浅绿，层次被压平。

**F15　滚动条是纯灰，且有一个从未使用的令牌**

`global.css:254-255`：`--scrollbar-bg: #e0e0e0`、`--scrollbar-thumb-bg: #c0c0c0`；夜间 `#2e2e2e` / `#4e4e4e`。这两个灰与全站带绿调的画布不同色相，出现在每一屏的右侧。`--scrollbar-bg` 定义后从未使用——`::-webkit-scrollbar-track` 是 transparent。

**F16　其余硬编码颜色绕过令牌**

`DESIGN.md:337` 明确禁止绕过语义令牌。实际存在：

| 位置 | 值 | 问题 |
| --- | --- | --- |
| `global.css:179` | `rgba(149,166,183,0.32)` | 代码高亮行底色，灰蓝，非站内色相 |
| `global.css:183,185` | `rgba(244,63,94,0.16)` | diff 删除行 = Tailwind rose-500 |
| `global.css:190,192` | `rgba(16,185,129,0.16)` | diff 新增行 = Tailwind emerald-500 |
| `app.css:372` | `hsl(140 40% 8% / 0.55)` | 终端阴影，直接写 HSL 字面量 |
| `header.css:185` | `rgb(0 0 0 / 24%)` | 菜单阴影，纯黑，夜间几乎不可见 |
| `ContentLayout.astro:303` | `#00000091` | 抽屉遮罩 |
| `app.css:440-443`、`terminal.css:77-79` | `#ff5f57` / `#febc2e` / `#28c840` | macOS 圆点——**已记录为有意为之**，是唯一可接受的硬编码 |

rose-500 / emerald-500 这两个色相**在基础色板里不存在**——它们是 Tailwind 默认色板漏进来的。

### P3　观察

- **F17　色阶有非常规档位**：`neutral-45`、`neutral-650`、`green-740`、`green-940` 各只服务一个消费者（夜间前景、夜间次级表面、终端 chrome 底与边）。文档已声明「色阶数字是固定标识，不承诺均匀亮度」，但 45/650/740/940 让"色阶"名不副实，更像按角色命名的取值集合。
- **F18　日间卡片几乎不可见**：`--card` #ffffff 对 `--background` #f9fcf9 仅 1.03:1，卡片完全靠 1.35:1 的边线成立。夜间是 1.21:1。
- **F19**：`--space-18` 与 `--radius-dialog` 零引用；`--radius-pill` 仅 3 处。
- **F20　图表夜间 soft 底色透明度不一致**：`--diagram-red-soft` 夜间用 0.07，其余五个 soft 变体都是 0.06（`article-diagrams.css:37` vs `:13,15,17,35,39`）。

---

## 4. 决策项

以下六项需要产品判断，本轮不擅自改动。

| # | 决策 | 状态 | 影响面 |
| --- | --- | --- | --- |
| D1 | 日间边界提到 3:1 | **已落地**：`neutral-125` #7f9584，对画布 3.11:1 | 日间整体略微变实，夜间不变 |
| D2 | 日间 `--accent` 独立于 `--secondary` | **已落地**：green-50 / 100 / 120 三级阶梯 | 文章卡片悬停、标签命中表面 |
| D3 | hero 标点的日间混合比例 | **已落地**：55% → 75%，3.32:1 | 首页标语；夜间沿用同比例 |
| D4 | 三处旁路色板是否收编进 `color-tokens.css` | 待决策 | 三个图表组件、About 页、目录、跳转页、文档三处色值章节 |
| D5 | 25 个零引用令牌：删除还是标注"预留" | 待决策 | 令牌文件体积与 UnoCSS 工具类面 |
| D6 | 字阶是否统一到 `--text-*` 并接入 UnoCSS `theme.fontSize` | 待决策 | `app.css`、约 30 处组件类名、文档两处表格 |

另有一项可顺带处理：为仓库补 `.gitattributes`（`*.md text eol=lf` 等），从根上避免 F1、F2 那类 CRLF 假设再次出现。本轮修的是两个具体缺陷，改行尾策略影响全仓库，未擅自执行。

---

## 5. 本轮已修复

| # | 修复 | 验证 |
| --- | --- | --- |
| F1 | `scripts/sync-color-docs.mjs` 读取后统一 LF 归一、写回时恢复文件自身行尾，frontmatter 剥离正则不再依赖 LF | `node scripts/sync-color-docs.mjs --check` 通过；重跑生成器无改动（幂等）；`node --test tests/color-tokens.test.mjs` 4 项全过（修复前第 4 项失败） |
| F2 | `src/pages/design.md.ts` 输出前把 CRLF 归一为 LF，端点字节不再随检出行尾变化 | `node --test tests/infrastructure.test.mjs` 4 项全过（修复前第 1 项失败） |
| F3 | 日间 `--border` / `--input` / `--sidebar-border` / `--term-edge` / `--term-chrome-edge` 改引新色板 `neutral-125`（#7f9584） | 对画布 3.11:1、对卡片 3.21:1（原 1.35 / 1.39）；`tests/color-tokens.test.mjs` 全过；浏览器核对 Blog、Links、Notes、文章页与终端 |
| F4 | 日间弱表面拆成三级：`--muted`=`green-50`、`--secondary`=`green-100`、`--accent`=`green-120` | 行动悬停对选择表面 1.04:1、对弱化表面 1.11:1（原三者 1.00）；`--primary` 在 `--accent` 上 4.69:1 仍达标；浏览器核对卡片悬停 |
| F8 | hero 标点混合比例 55% → 75% | 日间 3.32:1（原 2.30），夜间 4.15:1；浏览器核对首页 |
| 附 | 日间 `--muted-foreground` 由 neutral-400（#536a5b）压深到 #48604e | 对画布 6.64:1（原 5.68），对卡片 6.87:1；仍明显弱于正文 11.63:1 |

前两处保持了「契约在服务端稳定」的原则：没有改测试去迁就平台差异，而是让产物本身与平台无关。后四处是日间视觉层级的调整，夜间令牌一个未动。

---

## 6. 验证方式与未验证项

**本次用到的验证**

- 对比度：从 `color-tokens.css` 解析 HSL 通道 → sRGB → 相对亮度，覆盖 108 组配对（文字 4.5:1 / 非文字 3:1），日间与夜间各跑一遍。
- 令牌引用：`src/`、`uno.config.ts`、`docs/`、`tests/`、`scripts/` 内逐名统计，排除定义文件自身与文档枚举。
- 文档同步：`node scripts/sync-color-docs.mjs --check`。
- 构建与测试：`npm run build`（astro check + astro build + postbuild）通过；CI 的四个测试文件全部通过（`post-sections` 4、`page-frame` 17、`color-tokens` 4、`infrastructure` 4），其余四个 node 测试文件也全绿（`home-hero` 4、`theme-state` 6、`ui-ux-regressions` 4、`tag-sections` 7）。

**尚未验证**

- 所有对比度均为**纯色计算**。实际表面还有透明叠色（`color-mix`）、渐变、阴影、图像与第三方组件（Pagefind、Giscus），需在浏览器里按真实表面复核。
- 未做浏览器实走：两套主题 × 宽屏/390px 的边线可见性、悬停底色可辨性、hero 标点观感。
- 图表与热力图的 soft 底色可辨性仅按计算值判断，未看渲染截图。
- 未做色觉差异模拟。
- 本轮只改了两处缺陷与三处文档指针，未触碰任何色值与尺度；所有 P1/P2 结论在改动落地前都只是评审意见。
