import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { remarkContent, rehypeExternalLinks } from './src/plugins/content'
import { defineConfig, svgoOptimizer } from 'astro/config'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

// Local integrations
import rehypeAutolinkHeadings from './src/plugins/rehype-auto-link-headings.ts'
// Shiki
import {
  addCollapse,
  addCopyButton,
  addLanguage,
  addTitle,
  updateStyle
} from './src/plugins/shiki-custom-transformers.ts'
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerRemoveNotationEscape
} from './src/plugins/shiki-official/transformers.ts'
import { loadEnv } from 'vite'

// SITE_URL is the one deploy-time secret-ish input; everything else derives from it.
const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), 'SITE_')

// https://astro.build/config
export default defineConfig({
  // [Basic]
  site: env.SITE_URL ?? 'https://clerimia.github.io',
  output: 'static',
  scopedStyleStrategy: 'where',
  trailingSlash: 'never',
  // root: './my-project-directory',
  // 默认只绑定 localhost。需要手机真机调试时再临时改成 { host: true }，
  // 否则同一局域网内的其他人也能打开你的草稿。
  server: { host: false },
  // 页面底部的小黑框是 Astro 开发工具栏，仅 dev 模式存在；按需关闭。
  devToolbar: { enabled: false },
  // https://docs.astro.build/en/guides/prefetch/
  prefetch: {
    // prefetchAll: true,
    defaultStrategy: 'viewport'
  },

  // [Output]
  // 纯静态站点（GitHub Pages）：不配置 adapter，构建产物为静态文件。
  // 若将来需要 SSR / 按需渲染，可安装 @astrojs/vercel 等 adapter 并设置 output: 'server'。

  // [Assets]
  image: {
    responsiveStyles: true,
    service: { entrypoint: 'astro/assets/services/sharp' },
    // domains: ['ghchart.rshah.org'],
    remotePatterns: [{ protocol: 'https' }]
  },
  // [Fonts]
  // Satoshi 改为自托管（public/fonts/ + app.css 中的 @font-face），
  // 与模板站一致，避免构建期依赖 fontshare CDN。

  // [Markdown]
  markdown: {
    remarkPlugins: [remarkMath, remarkContent],
    rehypePlugins: [
      rehypeExternalLinks,
      [rehypeKatex, {}],
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          // aria-hidden + tabindex 让它不进 Tab 序列；data-pagefind-ignore 避免
          // 搜索结果摘要里出现一串没意义的「#」。
          properties: {
            className: ['anchor'],
            ariaHidden: 'true',
            tabIndex: -1,
            'data-pagefind-ignore': 'true'
          },
          content: { type: 'text', value: '#' }
        }
      ]
    ],
    // https://docs.astro.build/en/guides/syntax-highlighting/
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      transformers: [
        // Two copies of @shikijs/types (one under node_modules
        // and another nested under @astrojs/markdown-remark → shiki).
        // Official transformers
        // @ts-ignore this happens due to multiple versions of shiki types
        transformerNotationDiff(),
        // @ts-ignore this happens due to multiple versions of shiki types
        transformerNotationHighlight(),
        // @ts-ignore this happens due to multiple versions of shiki types
        transformerRemoveNotationEscape(),
        // Custom transformers
        // @ts-ignore this happens due to multiple versions of shiki types
        updateStyle(),
        // @ts-ignore this happens due to multiple versions of shiki types
        addTitle(),
        // @ts-ignore this happens due to multiple versions of shiki types
        addLanguage(),
        // @ts-ignore this happens due to multiple versions of shiki types
        addCopyButton(2000), // timeout in ms
        // @ts-ignore this happens due to multiple versions of shiki types
        addCollapse(15) // max lines that needs to collapse
      ]
    }
  },

  // [Integrations]
  integrations: [mdx({ optimize: true }), sitemap(), react()],
  vite: { plugins: [tailwindcss()] },

  // [Experimental]
  experimental: {
    // Allow compatible editors to support intellisense features for content collection entries
    // https://docs.astro.build/en/reference/experimental-flags/content-intellisense/
    contentIntellisense: true,
    // Enable SVGO optimization for SVG assets
    // https://docs.astro.build/en/reference/experimental-flags/svg-optimization/
    svgOptimizer: svgoOptimizer(),
    // Enables pre-rendering your prefetched pages on the client in supported browsers.
    // https://docs.astro.build/en/reference/experimental-flags/client-prerender/
    clientPrerender: true,
    // https://docs.astro.build/en/reference/experimental-flags/queued-rendering/
    queuedRendering: {
      enabled: true
    }
  }
})
