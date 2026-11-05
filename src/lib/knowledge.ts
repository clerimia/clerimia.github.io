import { getCollection } from 'astro:content'
import type { CollectionEntry } from 'astro:content'

export type KnowledgeEntry =
  CollectionEntry<'blog'> | CollectionEntry<'notes'> | CollectionEntry<'musings'>

export function knowledgeUrl(entry: KnowledgeEntry): string {
  if (entry.collection === 'blog') {
    return entry.data.section === 'essays' ? `/musings/${entry.id}` : `/blog/${entry.id}`
  }
  if (entry.collection === 'notes') return `/notes/${entry.id}`
  return `/musings/${entry.id}`
}

export function knowledgeMeta(entry: KnowledgeEntry) {
  const data = entry.data
  return {
    collection: entry.collection,
    id: entry.id,
    url: knowledgeUrl(entry),
    title: data.title ?? null,
    description: data.description ?? null,
    publishDate: data.publishDate?.toISOString() ?? null,
    updatedDate: data.updatedDate?.toISOString() ?? null,
    tags: data.tags,
    language: 'language' in data ? (data.language ?? 'zh-CN') : 'zh-CN',
    ...('section' in data && { section: data.section })
  }
}

export async function getKnowledgeEntries(): Promise<KnowledgeEntry[]> {
  const [blog, notes, musings] = await Promise.all([
    getCollection('blog', ({ data }) => !data.draft),
    getCollection('notes', ({ data }) => !data.draft),
    getCollection('musings', ({ data }) => !data.draft)
  ])

  // A moved essay can briefly exist in both collections; the public URL is the identity.
  const entries = new Map<string, KnowledgeEntry>()
  for (const entry of [...blog, ...notes, ...musings] as KnowledgeEntry[]) {
    entries.set(knowledgeUrl(entry), entry)
  }
  return [...entries.values()].sort((a, b) => {
    const first = a.data.updatedDate ?? a.data.publishDate
    const second = b.data.updatedDate ?? b.data.publishDate
    return (second?.getTime() ?? 0) - (first?.getTime() ?? 0)
  })
}
