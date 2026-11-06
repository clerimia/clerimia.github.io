# clerimia

个人博客，基于 [Astro](https://astro.build/)、[Tailwind CSS](https://tailwindcss.com/) 与 [shadcn/ui](https://ui.shadcn.com/) 构建。

- 线上地址：<https://clerimia.github.io/>
- 仓库：`clerimia/clerimia.github.io`（源码即部署源，推送到 `main` 自动发布）

## 技术栈

| 能力     | 方案                                                        |
| -------- | ----------------------------------------------------------- |
| 框架     | Astro 6（静态输出，内容页默认零 JS）                        |
| 样式     | Tailwind CSS 4 + `@tailwindcss/typography`，token 在 `src/styles/tokens.css` |
| 组件     | shadcn/ui（源码在 `src/components/ui/`，可自行修改）+ 站点组件在 `src/components/site/` |
| 交互     | 原生 JS（`is:inline` script）为主；需要复杂交互时用 React 19 island |
| 内容     | Content Collections（`blog` / `notes` / `musings`）          |
| 代码高亮 | Shiki（自带行号、语言标签、复制按钮、折叠）                  |
| 数学公式 | KaTeX                                                       |
| 全文搜索 | Pagefind（搜索页由 React island 承载）                      |
| 评论     | Giscus（GitHub Discussions）                                |
| 图片灯箱 | medium-zoom                                                 |
| 部署     | GitHub Pages（GitHub Actions 自动构建）                     |

> ⚠️ 必须保留的配置，改动前请先读注释：
>
> 1. **`package.json` 的 `overrides: { "vite": "^7" }`**：Astro 6 需要 Vite 7；解析到 Vite 8 会让
>    `astro-pure` 时代遗留的 UnoCSS 集成报错，并影响 dev 模式的资源加载。
> 2. **`@astrojs/react` 固定在 5.x**：6.x 及以上要求 Vite 8，与上一条冲突。升级 Astro 时三者一起升。

## 目录结构

```text
src/
├── site.config.ts          ★ 站点配置（标题/导航/页脚/友链/评论开关）
├── content.config.ts         内容集合 schema
├── content/
│   ├── blog/<slug>/index.md  博客文章 / 长随笔（section: essays）
│   ├── notes/<slug>/index.md 笔记
│   └── musings/<YYYY-MM-DD-slug>/index.md  随笔（短随想 / 语录）
├── config/giscus.ts        ★ Giscus 评论参数
├── components/
│   ├── ui/                  shadcn/ui 组件源码（React）
│   ├── site/                站点外壳与通用组件（页头、页脚、文章卡片、目录…）
│   ├── islands/             React island（.tsx 及其 .astro 包装）
│   └── blog/ home/ links/ tags/ comments/ about/  页面级组件
├── layouts/                  BaseLayout / CommonPage / BlogPost …
├── lib/                      cn()、token、图标、SEO、内容查询等共享模块
├── pages/                    路由（含 notes / tags / archives / search）
├── plugins/                  Markdown / rehype 插件
├── styles/                   tokens.css、global.css、prose.css 与 site/ 下的页面样式
└── assets/                   图片资源（头像、插图）
public/
└── links.json                友链数据
```

## 常用命令

```bash
npm run dev           # 开发预览 http://localhost:4321
npm run build         # 类型检查 + 构建 + sitemap 后处理 + Pagefind 索引
npm run preview       # Astro 预览构建产物
npm run preview:local # 零依赖静态服务器，模拟 GitHub Pages 的 dist/
npm run check         # 仅做类型检查
npm run test          # 运行 tests/*.test.mjs
npm run verify:infra  # 构建后校验 sitemap、结构化数据和 Agent 接口
npm run verify:urls   # 核对 urls.txt 中的历史路由仍然存在
npm run verify:islands# 核对文章正文仍是静态渲染
npm run format        # Prettier 格式化
```

## 基础设施

站点保持 Astro 静态输出和 GitHub Pages 部署。React 只用于少数 island（目前是搜索页），不引入服务端运行时。

- **构建**：`scripts/postbuild.mjs` 会从 sitemap 移除搜索页、404、API、`.well-known` 和旧地址跳转页，并按内容 frontmatter 的 `updatedDate` / `publishDate` 补上 `lastmod`；之后由 `pagefind --site dist` 生成搜索索引。
- **环境变量**：`SITE_URL` 决定站点正式地址，写在 `.env`（不入库，模板见 `.env.example`），影响 canonical、RSS、sitemap 与 Agent 接口里的绝对 URL。
- **设计契约**：[DESIGN.md](DESIGN.md) 顶部 frontmatter 由 `src/styles/tokens.css` 生成，包含颜色、排版、圆角、间距和布局；主题令牌采用 shadcn/ui 的命名（`background` / `foreground`、`card`、`popover`、`primary`、`secondary`、`muted`、`accent`、`destructive`、`border`、`input`、`ring`、`chart-1–5`、`sidebar-*`），本站的 `brand`、`primary-hover/active`、`status-*`、`term-*` 作为扩展。
- **工具类**：Tailwind 4 暴露完整的前景/背景配对，组件优先使用 `bg-primary`、`text-primary-foreground`、`text-status-error` 这类语义类，而不是直接写色值。
- **SEO**：页面输出 canonical、Open Graph、Twitter Card 和 schema.org JSON-LD；文章包含 `BlogPosting`，搜索页与 404 标记为 `noindex`。
- **Agent 接口**：构建时生成静态 JSON/Markdown，部署后可直接读取：
  - `/design.md`：设计思想与规范入口
  - `/api/knowledge/index.json`：公开内容索引
  - `/api/knowledge/{collection}/{id}.json`：单篇内容的元数据与 Markdown 正文
  - `/.well-known/site-manifest.json`：站点信息与接口清单
- **校验**：`tests/infrastructure.test.mjs` 在部署构建中检查上述接口、sitemap 排除项和结构化数据；`urls.txt` 是路由黄金清单，`npm run verify:urls` 用来确认历史地址没有丢失。

## 写一篇文章

在 `src/content/blog/` 下新建目录，写 `index.md`：

```yaml
---
title: '文章标题'
description: '摘要，用于 SEO 与列表页'
publishDate: '2026-09-17'
tags: ['标签一', '标签二']
draft: false
---
正文用普通 Markdown 写即可。
```

笔记放 `src/content/notes/`，额外支持 `order` 字段控制目录中的排序。

长随笔同样放在 `src/content/blog/`，增加 `section: 'essays'`。页面统一发布在 `/musings/<slug>`，
首页、标签和 RSS 使用这个地址；旧 `/essays/<slug>` 与 `/blog/<slug>` 随笔地址保留跳转。

短随笔放 `src/content/musings/`，目录名建议用 `<YYYY-MM-DD-短slug>`，与长随笔一起显示在 Musings 栏目：

```yaml
---
title: '开随笔' # 可省略，省略时列表只显示日期与正文预览
publishDate: '2026-10-04'
---
正文一两段即可。
```

## 自定义

- **站点信息 / 导航 / 社交**：`src/site.config.ts`
- **友链**：`public/links.json`
- **评论**：`src/config/giscus.ts`（参数取自 <https://giscus.app>）
- **头像**：替换 `src/assets/avatar.png`
- **终端文案 / 可跳转栏目**：`src/components/site/TerminalDialog.astro` 中 `<Terminal />` 的 props

## 部署

推送到 `main` 分支即触发 `.github/workflows/deploy.yml` 自动构建并发布到 GitHub Pages。

```bash
git add -A
git commit -m "post: 新文章"
git push origin main
```

仓库 `Settings → Pages → Source` 需设为 **GitHub Actions**（已配置）。

## 第三方来源

站点的组件外壳最初来自 [Astro Theme Pure](https://github.com/cworld1/astro-theme-pure)（Apache-2.0），
重建时保留了其中必要的实现思路并改写为本地代码，出处记录在 [docs/rebuild/third-party.md](docs/rebuild/third-party.md)。
图标沿用上游的 SVG 造型，已按本站设计系统的尺寸与描边调整。
