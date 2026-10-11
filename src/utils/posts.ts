import type { CollectionEntry } from 'astro:content'
import { getBlogCollection, sortMDByDate } from 'astro-pure/server'

export type PostSection = 'blog' | 'essays'

export async function getPosts(section?: PostSection) {
  const posts = sortMDByDate(await getBlogCollection()) as CollectionEntry<'blog'>[]
  return section ? posts.filter((post) => post.data.section === section) : posts
}

export function getPostUrl(post: CollectionEntry<'blog'>) {
  return `/${post.data.section}/${post.id}`
}
