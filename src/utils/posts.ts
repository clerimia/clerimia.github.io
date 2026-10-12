import { type CollectionEntry, getCollection } from 'astro:content'
import { getBlogCollection, sortMDByDate } from 'astro-pure/server'

export type PostSection = 'blog' | 'essays'

export async function getPosts(section?: PostSection) {
  const posts = sortMDByDate(await getBlogCollection()) as CollectionEntry<'blog'>[]
  return section ? posts.filter((post) => post.data.section === section) : posts
}

export function getPostUrl(post: CollectionEntry<'blog'>) {
  return `${getPostSectionUrl(post)}/${post.id}`
}

export function getPostSectionUrl(post: CollectionEntry<'blog'>) {
  return post.data.section === 'essays' ? '/musings' : '/blog'
}

export type MusingEntry = CollectionEntry<'blog'> | CollectionEntry<'musings'>

export async function getMusings(): Promise<MusingEntry[]> {
  const [essays, shortMusings] = await Promise.all([
    getPosts('essays'),
    getCollection('musings', ({ data }) => !data.draft)
  ])
  return [...essays, ...shortMusings].sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime()
  )
}
