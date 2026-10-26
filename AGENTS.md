# AGENTS.md

给在本仓库工作的编码代理。面向人类的入门说明见 [README.md](README.md)。

## 先读

- [Design.md](Design.md) —— UI/UX 设计原则。改任何**页面结构、视觉样式、组件外观、文案层级、主题、动效或可访问性**之前先读；设计方向与取舍以其中的原则和判断标准为依据。
- [README.md](README.md) —— 技术栈、目录结构、内容写法、部署，以及「两个必须保留的配置」（Vite 7 override、不引入 `@astrojs/react`）。动依赖或构建配置前先读。

## 工作约定

- **样式**：UnoCSS + `src/assets/styles/*.css`。设计 token 集中在 `src/assets/styles/app.css` 的 `:root` / `.dark`；新样式先复用已有 token，再考虑新增。
- **交互**：原生 JS，`is:inline` script；项目不使用前端框架。
- **主题**：日间与夜间共用布局和排版，只换色板、头像与少量反馈。改颜色或主题相关代码时两套都要看。
- **内容**：博客 `src/content/blog/`，笔记 `src/content/docs/`，短随笔 `src/content/musings/`；schema 在 `src/content.config.ts`。
- **验证**：UI 改动跑 `npm run check` 与 `npm run build`，并在桌面宽屏与 390px 宽、日夜两套主题下各走一遍关键页面（首页、列表、文章详情）。

## 判断标准

设计取舍按 [Design.md 的「设计判断标准」](Design.md#九设计判断标准) 评估。
