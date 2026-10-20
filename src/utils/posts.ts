import { type CollectionEntry, getCollection } from 'astro:content'
import { getBlogCollection, sortMDByDate } from 'astro-pure/server'

export type PostSection = 'blog' | 'essays'

export async function getPosts(section?: PostSection) {
  const posts = sortMDByDate(await getBlogCollection()) as CollectionEntry<'blog'>[]
  return section ? posts.filter((post) => post.data.section === section) : posts
}

// Long essays live in the musings collection (section: 'essays'); short notes don't set it.

export function getPostUrl(post: CollectionEntry<'blog'>) {
  return `/blog/${post.id}`
}

export function getPostSectionUrl(post: CollectionEntry<'blog'>) {
  return post.data.section === 'essays' ? '/musings' : '/blog'
}

export type MusingEntry = CollectionEntry<'blog'> | CollectionEntry<'musings'>

export function getMusingUrl(post: MusingEntry) {
  return post.collection === 'blog' ? `/blog/${post.id}` : `/musings/${post.id}`
}

export async function getMusings(): Promise<MusingEntry[]> {
  const [essays, shortMusings] = await Promise.all([
    getCollection('musings', ({ data }) => !data.draft && data.section === 'essays'),
    getCollection('musings', ({ data }) => !data.draft && !data.section)
  ])
  return [...essays, ...shortMusings].sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime()
  )
}
