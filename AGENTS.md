# AGENTS.md

本文件是人和编码代理进入仓库的入口。面向人类的项目入门、内容写法与部署说明见 [README.md](README.md)。

## 设计文档：先理解方向，再使用规范

1. **[DESIGN.md](DESIGN.md) · 设计思想**：记录博客的定位、灵感、主题气质和判断标准，回答「为什么这样设计」。
2. **[docs/design-language.md](docs/design-language.md) · 设计系统文字规范**：定义色彩、排版、尺度、组件与验证方法，回答「具体如何设计和实现」。修改 UI 前先读本文件和 DESIGN.md。
3. **[docs/design-language.html](docs/design-language.html) · 设计系统可视化规范**：以色板、样例和表格帮助理解同一套系统，可在浏览器直接打开；涉及视觉选择时对照查看。

设计系统已在主题 token、首页和主要文章页面**部分落地**，其他页面和组件仍需逐步对照；实施与验证范围见文字规范。发生冲突时，先遵从用户当前明确要求，并结合 DESIGN.md 的方向判断；Markdown 与 HTML 如有不一致，先核实当前设计意图并保持两者同步，不要把旧代码或其中一份文档自动视为已验证结论。

修改设计方向、主题气质或长期判断标准时更新 DESIGN.md；修改具体系统规则、色值、尺度或组件约定时同步更新 Markdown 和 HTML，并标明提案、实现与验证状态。普通 UI 实现如果没有改变规范，不必为了记录实现而改写设计文档。需要突破规范时，记录场景、理由与验证方式。

## 开发约定

- **样式与设计**：使用 UnoCSS + `src/assets/styles/*.css`；现有 token 在 `src/assets/styles/app.css` 的 `:root` / `.dark`。先检查设计系统和已有 token、组件；符合目标的优先复用，不符合规范的按任务范围逐步调整。新增视觉规则要说明用途，不随意引入缺少职责的渐变、阴影、装饰或新配色。
- **交互**：原生 JS，`is:inline` script；项目不使用前端框架。
- **主题**：若叶睦（日间）安静、轻盈、柔和；墨提斯（夜间）开放、活力、戏剧性，以绿色与酒红表达。两主题共用信息架构、布局、排版与组件语言；修改相关 UI 时检查两套主题。
- **内容**：博客 `src/content/blog/`，笔记 `src/content/notes/`，短随笔 `src/content/musings/`；schema 在 `src/content.config.ts`。
- **依赖与构建**：修改依赖或构建配置前先读 [README.md](README.md)，尤其是必须保留的 Vite 7 override 和不引入 `@astrojs/react`。
- **验证**：UI 改动跑 `npm run check` 与 `npm run build`，并在桌面宽屏与 390px 宽、日夜两套主题下各走一遍关键页面（首页、列表、文章详情）。记录未完成的检查与待验证假设。

设计取舍按 [DESIGN.md 的「设计判断标准」](DESIGN.md#九设计判断标准) 评估：清晰、舒适、一致、有我自己的声音。
