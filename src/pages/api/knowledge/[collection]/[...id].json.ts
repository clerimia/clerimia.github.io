import type { APIRoute, GetStaticPaths } from 'astro'
import { getKnowledgeEntries, knowledgeMeta, knowledgeUrl } from '@/lib/knowledge'

export const prerender = true

export const getStaticPaths = (async () => {
  const entries = await getKnowledgeEntries()
  return entries.map((entry) => ({
    params: { collection: entry.collection, id: entry.id },
    props: { entry }
  }))
}) satisfies GetStaticPaths

export const GET: APIRoute = ({ props }) => {
  const entry = props.entry as Awaited<ReturnType<typeof getKnowledgeEntries>>[number]
  const body = {
    ...knowledgeMeta(entry),
    canonical: knowledgeUrl(entry),
    // Raw Markdown/MDX keeps the contract small and lets agents choose their own renderer.
    body: entry.body
  }

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}
