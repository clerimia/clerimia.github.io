import config from '@/site-config'

type JsonLdNode = Record<string, unknown>

interface JsonLdInput {
  site: URL | undefined
  pathname: string
  title: string
  description?: string
  image?: string
  publishedDate?: string
  updatedDate?: string
  tags?: string[]
}

function socialUrls(): string[] {
  const social = config.footer.social as unknown
  if (Array.isArray(social)) {
    return social.flatMap((item) => {
      if (typeof item === 'string') return [item]
      if (item && typeof item === 'object' && 'href' in item && typeof item.href === 'string') {
        return [item.href]
      }
      return []
    })
  }
  if (social && typeof social === 'object') {
    return Object.values(social).filter((value): value is string => typeof value === 'string')
  }
  return []
}

// sameAs describes external identity profiles, not internal feeds or navigation.
function identityUrls(): string[] {
  return socialUrls().filter((value) => /^https?:\/\//.test(value))
}

export function absoluteUrl(pathname: string, site: URL | undefined): string {
  return new URL(pathname, site ?? import.meta.env.SITE).href
}

// One @graph keeps the site identity, page and article connected without repeating
// the same Person object in every block. Search engines accept either shape.
export function buildJsonLd({
  site,
  pathname,
  title,
  description,
  image,
  publishedDate,
  updatedDate,
  tags
}: JsonLdInput): JsonLdNode {
  const origin = new URL('/', site ?? import.meta.env.SITE).href.replace(/\/$/, '')
  const canonical = absoluteUrl(pathname, site)
  const personId = `${origin}/#person`
  const websiteId = `${origin}/#website`
  const webpageId = `${canonical}#webpage`

  const graph: JsonLdNode[] = [
    {
      '@type': 'Person',
      '@id': personId,
      name: config.author,
      url: `${origin}/`,
      ...(identityUrls().length > 0 && { sameAs: identityUrls() })
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: `${origin}/`,
      name: config.title,
      description: config.description,
      inLanguage: config.locale.lang,
      publisher: { '@id': personId }
    },
    {
      '@type': 'WebPage',
      '@id': webpageId,
      url: canonical,
      name: title,
      description,
      isPartOf: { '@id': websiteId },
      inLanguage: config.locale.lang
    }
  ]

  if (publishedDate) {
    graph.push({
      '@type': 'BlogPosting',
      '@id': `${canonical}#article`,
      headline: title,
      description,
      ...(image && { image }),
      datePublished: publishedDate,
      dateModified: updatedDate ?? publishedDate,
      author: { '@id': personId },
      publisher: { '@id': personId },
      mainEntityOfPage: { '@id': webpageId },
      inLanguage: config.locale.lang,
      ...(tags?.length && { keywords: tags.join(', ') })
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}

export function serializeJsonLd(data: JsonLdNode): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
