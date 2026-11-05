import type { APIRoute } from 'astro'
import { getKnowledgeEntries, knowledgeMeta } from '@/lib/knowledge'

import config from '@/site-config'

export const prerender = true

// A build-time index of public writing. Keeping it static means the same contract
// works on GitHub Pages and on a server adapter.
export const GET: APIRoute = async ({ site }) => {
  const entries = (await getKnowledgeEntries()).map(knowledgeMeta)
  const body = {
    site: {
      name: config.title,
      url: new URL('/', site ?? import.meta.env.SITE).href,
      description: config.description,
      language: config.locale.lang
    },
    content: {
      design: '/design.md',
      rss: '/rss.xml',
      sitemap: '/sitemap-index.xml',
      entry: '/api/knowledge/{collection}/{id}.json'
    },
    entries
  }

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}
