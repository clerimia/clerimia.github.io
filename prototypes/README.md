# 首页视觉稿存档

评估问题：采用清新黄绿色、规整布局、柔和边框与阴影重做首屏，并将每日一言融入卡片。移除倾斜贴纸、虚线和错位阴影。

- `home-hero.html`：自包含预览，可直接双击打开。字体、头像、样式、交互脚本均已内嵌；离线保留一言，有网络时沿用本站一言接口更新。
- 该方案已应用到正式首页与全站公共布局，`home-hero.html` 保留为当时的自包含视觉稿。
- 复用：`Terminal.astro`、`astro-pure` 的 `Quote` / `Icon`、`astro:assets` 的 `Image`，文章列表来自现有内容集合。
- 头像随主题切换：浅色使用 `src/assets/avatar.png`，深色使用用户提供的 `src/assets/avatar-dark.png`，横图在圆形区域中对齐人物面部。
- 导航终端按钮与首屏入口共用挂载在 body 下的原生 dialog，不改变首屏布局。支持反引号快捷键、Esc / 遮罩 / 关闭按钮、焦点约束和关闭后返回对应入口；命令与历史记录在两入口间共享。
- 终端复用 `Terminal.astro` 的 `panel` 模式：常用命令按钮、真实输入框、固定输入区、独立滚动输出和按列排版的帮助。

正式实现位于 `src/pages/index.astro`、`src/layouts/BaseLayout.astro` 和全站组件中。
