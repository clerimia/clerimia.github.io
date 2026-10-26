import type { PaginateFunction } from 'astro'
import { getCollection, type CollectionEntry } from 'astro:content'
import { getUniqueTagsWithCount, sortMDByDate } from 'astro-pure/server'
import config from '@/site-config'
import { getMusings, getPosts } from '@/utils/posts'

export const contentSections = ['blog', 'notes', 'musings'] as const
export type ContentSection = (typeof contentSections)[number]
export type TaggedEntry = CollectionEntry<'blog'> | CollectionEntry<'notes'> | CollectionEntry<'musings'>

export const sectionTitles: Record<ContentSection, string> = {
  blog: 'Blog',
  notes: 'Notes',
  musings: 'Musings'
}

export function getEntrySection(post: TaggedEntry): ContentSection {
  return post.collection === 'blog' && post.data.section === 'essays' ? 'musings' : post.collection
}

export function getTagUrl(section: ContentSection, tag?: string) {
  const base = `/${section}/tags`
  return tag === undefined ? base : `${base}/${encodeURIComponent(tag)}`
}

export async function getTaggedEntries(section: ContentSection): Promise<TaggedEntry[]> {
  if (section === 'blog') return getPosts('blog')
  if (section === 'musings') return getMusings()
  return sortMDByDate(await getCollection('notes', ({ data }) => !data.draft)) as CollectionEntry<'notes'>[]
}

export async function getSectionTags(section: ContentSection) {
  return getUniqueTagsWithCount(await getTaggedEntries(section))
}

export async function getTagPaths(section: ContentSection, paginate: PaginateFunction) {
  const entries = await getTaggedEntries(section)
  return getUniqueTagsWithCount(entries).flatMap(([tag]) =>
    paginate(entries.filter((post) => post.data.tags.includes(tag)), {
      pageSize: config.content.blogPageSize,
      params: { tag },
      props: { section }
    })
  )
}
