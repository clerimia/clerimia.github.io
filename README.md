# clerimia

个人博客，基于 [Astro](https://astro.build/) 与 [Astro Theme Pure](https://github.com/cworld1/astro-theme-pure) 构建。

- 线上地址：<https://clerimia.github.io/>
- 仓库：`clerimia/clerimia.github.io`（源码即部署源，推送到 `main` 自动发布）

## 技术栈

| 能力 | 方案 |
| --- | --- |
| 框架 | Astro 6（默认零 JS，静态输出） |
| 交互 | React 岛屿（`client:load`，用于首页终端） |
| 样式 | UnoCSS + 主题内置排版（typography） |
| 内容 | Content Collections（`blog` / `docs`） |
| 代码高亮 | Shiki（自带行号、语言标签、复制按钮、折叠） |
| 数学公式 | KaTeX |
| 全文搜索 | Pagefind |
| 评论 | Giscus（GitHub Discussions） |
| 图片灯箱 | medium-zoom |
| 部署 | GitHub Pages（GitHub Actions 自动构建） |

## 目录结构

```text
src/
├── site.config.ts          ★ 站点配置（标题/导航/页脚/友链/评论开关）
├── content.config.ts         内容集合 schema
├── content/
│   ├── blog/<slug>/index.md  博客文章
│   └── docs/<slug>/index.md  笔记
├── config/giscus.ts        ★ Giscus 评论参数
├── components/
│   ├── comments/             Giscus 评论与留言入口
│   ├── home/Terminal.tsx     首页可交互终端（React 岛屿）
│   ├── IntroOverlay.astro    入场粒子动画
│   └── links/ projects/ about/ home/
├── layouts/                  BaseLayout / CommonPage / BlogPost …
├── pages/                    路由（含 docs / tags / archives / search）
└── assets/
    ├── avatar.png            首页头像
    └── styles/terminal.css · intro.css   自建组件样式
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

## 自定义

- **站点信息 / 导航 / 社交**：`src/site.config.ts`
- **友链**：`public/links.json`
- **评论**：`src/config/giscus.ts`（参数取自 <https://giscus.app>）
- **头像**：替换 `src/assets/avatar.png`
- **终端文案 / 可跳转栏目**：`src/pages/index.astro` 中 `<Terminal />` 的 props
- **入场动画开关行为**：`src/components/IntroOverlay.astro`（24 小时冷却，尊重 `prefers-reduced-motion`）

## 部署

推送到 `main` 分支即触发 `.github/workflows/deploy.yml` 自动构建并发布到 GitHub Pages。

```bash
git add -A
git commit -m "post: 新文章"
git push origin main
```

仓库 `Settings → Pages → Source` 需设为 **GitHub Actions**（已配置）。

## 上游主题

站点使用 `astro-pure@1.4.7`（从 npm 安装）。`packages/` 与 `preset/` 为主题上游源码，仅作本地参考，已在 `.gitignore` 中排除。
