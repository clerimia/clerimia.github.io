import type { APIRoute } from 'astro'
import { getKnowledgeEntries } from '@/lib/knowledge'

import config from '@/site-config'

export const prerender = true

export const GET: APIRoute = async ({ site }) => {
  const entries = await getKnowledgeEntries()
  const counts = entries.reduce<Record<string, number>>((result, entry) => {
    result[entry.collection] = (result[entry.collection] ?? 0) + 1
    return result
  }, {})
  const origin = new URL('/', site ?? import.meta.env.SITE).href

  return new Response(
    JSON.stringify(
      {
        name: config.title,
        url: origin,
        description: config.description,
        language: config.locale.lang,
        author: config.author,
        endpoints: {
          design: '/design.md',
          knowledge: '/api/knowledge/index.json',
          rss: '/rss.xml',
          sitemap: '/sitemap-index.xml'
        },
        content: counts
      },
      null,
      2
    ),
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      }
    }
  )
}
