---
title: 'Pure 主题改造笔记'
description: '记录从手写脚手架迁移到 Astro Theme Pure 过程中遇到的实际问题与处理方式。'
publishDate: '2026-09-17'
tags: ['Astro', '主题']
order: 1
---

迁移过程中踩到的几个坑，记下来免得忘。

## 主题默认是 SSR + Vercel

`astro.config.ts` 里原本是：

```ts title="astro.config.ts"
adapter: vercel({ imageService: true }),
output: 'server',
```

要部署到 GitHub Pages 就得改成纯静态输出——去掉 adapter、不写 `output`（默认即 static）。同时 `site` 要改成实际域名，否则 sitemap 和 RSS 里的链接会指错。

## 主题没有路由级 i18n

配置里的 `locale` 只控制 `<html lang>`、日期格式这类**单站点**语言信息，并不提供 `/en/` 这样的多语言路由。

如果要中英双语，得自己在 `src/pages/` 下加一套镜像路由，并让主题组件接受 `locale` 参数——工作量不小，所以当前先做单语言。

## 远程图片会让构建失败

Astro 在优化远程图片时**不接受 301 重定向**：

```text
Error: Failed to load remote image https://... The request was redirected.
```

主题示例文章里用了 `gravatar.loli.net` 的头像，会重定向到 `cravatar.cn`，于是构建中断。处理办法是换掉这类地址，或者把图片下载到本地 `src/assets/` 由 Astro 托管。

## packages/pure 不该被类型检查

主题仓库是 monorepo，`packages/pure` 是发到 npm 的包源码。站点实际用的是 npm 上的 `astro-pure`，但根 `tsconfig.json` 的 `include: ["./**/*"]` 会把它一起扫进来，导致 `astro check` 报 15 个错。在 `exclude` 里加上 `./packages` 即可。
