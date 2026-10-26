# clerimia

个人博客，基于 [Astro](https://astro.build/) 与 [Astro Theme Pure](https://github.com/cworld1/astro-theme-pure) 构建。

- 线上地址：<https://clerimia.github.io/>
- 仓库：`clerimia/clerimia.github.io`（源码即部署源，推送到 `main` 自动发布）

## 技术栈

| 能力 | 方案 |
| --- | --- |
| 框架 | Astro 6（默认零 JS，静态输出） |
| 交互 | 原生 JS（`is:inline` script，**不使用任何前端框架**） |
| 样式 | UnoCSS + 主题内置排版（typography） |
| 内容 | Content Collections（`blog` / `docs` / `musings`） |
| 代码高亮 | Shiki（自带行号、语言标签、复制按钮、折叠） |
| 数学公式 | KaTeX |
| 全文搜索 | Pagefind |
| 评论 | Giscus（GitHub Discussions） |
| 图片灯箱 | medium-zoom |
| 部署 | GitHub Pages（GitHub Actions 自动构建） |

> ⚠️ 两个必须保留的配置，改动前请先读注释：
>
> 1. **`package.json` 的 `overrides: { "vite": "^7" }`**：项目里若解析到 Vite 8，dev 模式下 UnoCSS 会报
>    `Missing field moduleType`，导致所有 CSS/JS 资源 500、页面样式全丢。Astro 6 需要 Vite 7。
> 2. **不要引入 `@astrojs/react`**：Astro 6 的 `vite-react-refresh-wrapper` 在 dev 下与 rolldown-vite 不兼容
>    （官方 issue [#16229](https://github.com/withastro/astro/issues/16229)，已标记为不修复），会引发同样的问题。

## 目录结构

```text
src/
├── site.config.ts          ★ 站点配置（标题/导航/页脚/友链/评论开关）
├── content.config.ts         内容集合 schema
├── content/
│   ├── blog/<slug>/index.md  博客文章 / 长随笔（section: essays）
│   ├── docs/<slug>/index.md  笔记
│   └── musings/<YYYY-MM-DD-slug>/index.md  随笔（短随想 / 语录）
├── config/giscus.ts        ★ Giscus 评论参数
├── components/
│   ├── comments/             Giscus 评论与留言入口
│   ├── home/Terminal.astro   首页可交互终端（原生 JS）
│   └── links/ projects/ about/ home/
├── layouts/                  BaseLayout / CommonPage / BlogPost …
├── pages/                    路由（含 docs / tags / archives / search）
└── assets/
    ├── avatar.png            首页头像
    └── styles/terminal.css   终端组件样式
public/
└── links.json                友链数据
```

## 常用命令

```bash
npm run dev      # 开发预览 http://localhost:4321
npm run build    # 类型检查 + 构建（输出 dist/，并生成 Pagefind 索引）
npm run preview  # 本地预览构建产物
npm run check    # 仅做类型检查
npm run format   # Prettier 格式化
```

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

笔记放 `src/content/docs/`，额外支持 `order` 字段控制目录中的排序。

长随笔同样放在 `src/content/blog/`，增加 `section: 'essays'`。页面统一发布在 `/musings/<slug>`，
首页、标签和 RSS 使用这个地址；旧 `/essays/<slug>` 与 `/blog/<slug>` 随笔地址保留跳转。

短随笔放 `src/content/musings/`，目录名建议用 `<YYYY-MM-DD-短slug>`，与长随笔一起显示在 Musings 栏目：

```yaml
---
title: '开随笔'        # 可省略，省略时列表只显示日期与正文预览
publishDate: '2026-10-04'
---

正文一两段即可。
```
## 自定义

- **站点信息 / 导航 / 社交**：`src/site.config.ts`
- **友链**：`public/links.json`
- **评论**：`src/config/giscus.ts`（参数取自 <https://giscus.app>）
- **头像**：替换 `src/assets/avatar.png`
- **终端文案 / 可跳转栏目**：`src/pages/index.astro` 中 `<Terminal />` 的 props

## 部署

推送到 `main` 分支即触发 `.github/workflows/deploy.yml` 自动构建并发布到 GitHub Pages。

```bash
git add -A
git commit -m "post: 新文章"
git push origin main
```

仓库 `Settings → Pages → Source` 需设为 **GitHub Actions**（已配置）。

## 上游主题

站点使用 `astro-pure@1.4.7`（从 npm 安装）。主题上游源码目录 `packages/` 与 `preset/` 已移出本项目，仅在有需要时再从
<https://github.com/cworld1/astro-theme-pure> 获取参考。
