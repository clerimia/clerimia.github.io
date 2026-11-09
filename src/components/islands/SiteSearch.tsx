import { CircleAlert } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

const formatURL = (path: string) => path.replace(/(.)\/(#.*)?$/, '$1$2')
const escapeHTML = (text: string) =>
  text.replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      })[character]!
  )

type SearchResult = {
  url: string
  excerpt: string
  meta: Record<string, string>
  sub_results: Array<{ url: string }>
}

export default function SiteSearch({
  baseUrl = '/',
  dev = false
}: {
  baseUrl?: string
  dev?: boolean
}) {
  const container = useRef<HTMLDivElement>(null)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    // The Pagefind index only exists in a production build.
    if (dev) return
    let disposed = false
    let search: { destroy: () => void } | undefined
    setError(false)
    async function mount() {
      try {
        // Pagefind owns its result DOM; React owns only this mount point and lifecycle.
        const { PagefindUI } = await import('@pagefind/default-ui')
        if (disposed || !container.current) return
        search = new PagefindUI({
          element: container.current,
          baseUrl,
          bundlePath: `${baseUrl.replace(/\/$/, '')}/pagefind/`,
          showImages: false,
          showSubResults: true,
          showEmptyFilters: false,
          translations: {
            placeholder: '搜索文章…',
            clear_search: '清空',
            load_more: '加载更多结果',
            search_label: '搜索本站内容',
            filters_label: '筛选',
            zero_results: '没有找到与「[SEARCH_TERM]」相关的内容',
            many_results: '找到 [COUNT] 条与「[SEARCH_TERM]」相关的内容',
            one_result: '找到 1 条与「[SEARCH_TERM]」相关的内容',
            alt_search: '没有与「[SEARCH_TERM]」相关的内容，以下是与「[DIFFERENT_TERM]」相关的结果',
            search_suggestion: '可以试试：[DIFFERENT_TERM]',
            searching: '搜索「[SEARCH_TERM]」…'
          },
          processResult: (result: SearchResult) => {
            result.url = formatURL(result.url)
            if (result.meta.description) {
              result.excerpt = escapeHTML(result.meta.description)
              delete result.meta.description
            }
            result.sub_results = result.sub_results.map((subResult) => ({
              ...subResult,
              url: formatURL(subResult.url)
            }))
            return result
          }
        })
      } catch {
        if (!disposed) setError(true)
      }
    }
    void mount()
    return () => {
      disposed = true
      search?.destroy()
    }
  }, [baseUrl, attempt, dev])

  if (dev) {
    return (
      <p>
        开发模式下搜索索引尚未生成：请先运行 <code>npm run build</code>，再通过预览查看搜索。
      </p>
    )
  }

  return (
    <>
      <div id='site-search' ref={container} />
      {error && (
        <Alert variant='error' className='my-4'>
          <CircleAlert />
          <AlertTitle>搜索暂时无法加载</AlertTitle>
          <AlertDescription>
            <p>请稍后重试，或先通过归档浏览文章。</p>
            <Button variant='outline' size='sm' onClick={() => setAttempt((value) => value + 1)}>
              重试
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </>
  )
}
