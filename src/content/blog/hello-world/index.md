---
title: '你好，世界'
description: '博客开张。第一篇记录这个站点是怎么搭起来的：Astro 6 + Pure 主题，以及为什么放弃了之前手写的脚手架。'
publishDate: '2026-09-17'
tags: ['Astro', '建站']
language: '中文'
---

博客终于开张了。这篇简单交代一下它是怎么来的。

## 为什么换掉手写的脚手架

这个站最早是从零手写的一套 Astro 脚手架：自己写布局、自己写组件、自己写 i18n、自己写终端和入场动画。能跑，但有个问题——**我一直在重新发明轮子**。

后来发现参考的站点其实是基于开源主题 [Astro Theme Pure](https://github.com/cworld1/astro-theme-pure) 做的，于是干脆换了过来：

| 之前 | 现在 |
| --- | --- |
| 手写布局与组件 | Pure 主题内置 |
| 手写代码块样式 | 主题自带行号 / 复制按钮 / 语言标签 / 折叠 |
| 手写搜索 | Pagefind 集成 |
| 手写 OG 图 | 主题内置 |

省下来的时间，可以拿来写真正的内容。

## 技术栈

- **Astro 6**：默认零 JS，页面在构建时就渲染好
- **UnoCSS**：原子化样式，比 Tailwind 更轻
- **内容集合**：文章就是 `src/content/` 下的 Markdown 文件

## 写一篇新文章的格式

```yaml title="frontmatter"
---
title: '文章标题'
description: '摘要，会用于 SEO 和列表页'
publishDate: '2026-09-17'
tags: ['标签一', '标签二']
draft: false
---
```

正文就用普通的 Markdown 写。代码块会自动带上语言标签和复制按钮：

```ts title="hello.ts"
const greeting = (name: string): string => `Hello, ${name}!`

console.log(greeting('world'))
```

## 接下来

先把内容写起来，视觉细节慢慢调。

> Stay hungry, stay foolish.
