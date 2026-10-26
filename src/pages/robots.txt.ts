import type { APIRoute } from 'astro'

// 明确拒绝把内容用于模型训练 / 生成式抓取的爬虫。
// 之前这里只有三个空的 User-agent 组，没有任何 Disallow——规范上等于「全站允许」，
// 一句话也没拦住。现在逐个给明确规则。
const restrictedCrawlers = [
  'GPTBot', // OpenAI
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot', // Anthropic
  'Claude-Web',
  'anthropic-ai',
  'Google-Extended', // Gemini 训练
  'CCBot', // Common Crawl
  'PerplexityBot',
  'Bytespider'
]

const robotsTxt = `
# 站点正文不授权用于模型训练；下列抓取器一律拒绝。
# 普通搜索引擎（Googlebot / Bingbot 等）与社交预览不受影响。
${restrictedCrawlers.map((bot) => `User-agent: ${bot}\nDisallow: /`).join('\n\n')}

User-agent: *
Allow: /

Sitemap: ${new URL('sitemap-index.xml', import.meta.env.SITE).href}
`.trim()

export const GET: APIRoute = () =>
  new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  })
