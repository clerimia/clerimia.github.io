// Adapted from Astro Pure 1.4.7 (CWorld), Apache-2.0.
// Modified to preserve collection-specific types and retain only used helpers.
// Upstream: Astro Theme Pure, Apache-2.0.
import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content'

type Entry = CollectionEntry<CollectionKey>

/** Drafts are available in development, excluded from production routes and feeds. */
export async function getBlogCollection<K extends CollectionKey = 'blog'>(collection: K = 'blog' as K) {
  return getCollection(collection, ({ data }) => !import.meta.env.PROD || !data.draft)
}

export function sortMDByDate<T extends Entry>(entries: T[]): T[] {
  return entries.sort((a, b) =>
    new Date(b.data.updatedDate ?? b.data.publishDate ?? 0).valueOf() -
    new Date(a.data.updatedDate ?? a.data.publishDate ?? 0).valueOf()
  )
}

export function groupCollectionsByYear<K extends CollectionKey>(entries: CollectionEntry<K>[]): [number, CollectionEntry<K>[]][] {
  const groups = new Map<number, CollectionEntry<K>[]>()
  for (const entry of entries) {
    const date = entry.data.updatedDate ?? entry.data.publishDate
    if (!date) continue
    const year = new Date(date).getFullYear()
    const group = groups.get(year) ?? []
    group.push(entry)
    groups.set(year, group)
  }
  return [...groups].sort(([a], [b]) => b - a)
}

/** Accept already filtered entries so callers control draft visibility. */
export function getUniqueTagsWithCount(entries: Entry[]): [string, number][] {
  const counts = new Map<string, number>()
  for (const entry of entries) {
    for (const tag of entry.data.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
  }
  return [...counts].sort((a, b) => b[1] - a[1])
}
