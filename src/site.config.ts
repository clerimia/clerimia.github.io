import type { CardListData } from '@/lib/site-types'

const tagline = '一边创作，一边成为自己'

export const theme = {
  title: 'clerimia',
  author: 'clerimia',
  description: tagline,
  tagline,
  // The resolved shape used by BaseHead, rather than an integration input string.
  favicon: { href: '/favicon/favicon.ico', type: 'image/x-icon' },
  socialCard: '/images/social-card.png',
  locale: {
    lang: 'zh-CN',
    attrs: 'zh_CN',
    dateLocale: 'zh-CN',
    dateOptions: { day: 'numeric', month: 'short', year: 'numeric' } satisfies Intl.DateTimeFormatOptions
  },
  titleDelimiter: '•',
  header: {
    menu: [
      { title: 'Blog', link: '/blog' },
      { title: 'Notes', link: '/notes' },
      { title: 'Musings', link: '/musings' },
      { title: 'Links', link: '/links' },
      { title: 'About', link: '/about' }
    ]
  },
  footer: {
    social: [
      { icon: 'github', label: 'GitHub', href: 'https://github.com/clerimia' },
      { icon: 'rss', label: 'RSS', href: '/rss.xml' }
    ]
  },
  content: {
    externalLinks: { content: ' ↗', properties: { style: 'user-select:none' } },
    blogPageSize: 8,
    share: ['weibo', 'x', 'bluesky'] as const
  }
}

export const integ = {
  links: {
    logbook: [
      { date: '2026-11-08', content: '新增友链：Evan——已识乾坤大，犹怜草木青。' },
      { date: '2026-10-28', content: '新增友链：Zaixi Personal Blog。' },
      { date: '2026-10-27', content: '新增友链：Joye Blog。' },
      { date: '2026-09-17', content: '这里记录友链的变化，欢迎来交换链接。' },
      { date: '2026-09-17', content: '先把站点搭起来，再慢慢写内容。' }
    ],
    applyTip: [
      { name: 'Name', val: theme.title },
      { name: 'Desc', val: theme.description },
      { name: 'Link', val: 'https://clerimia.github.io/' },
      { name: 'Avatar', val: 'https://avatars.githubusercontent.com/u/128227262?v=4' }
    ],
    cacheAvatar: false
  },
  pagefind: true,
  quote: { server: 'https://v1.hitokoto.cn/?c=a' },
  typography: { class: 'prose text-base' },
  mediumZoom: {
    enable: true,
    selector: '.prose .zoomable',
    options: { className: 'zoomable' }
  }
}

export const terms: CardListData = {
  title: 'Site Policies',
  list: [
    { title: '隐私政策', link: '/terms/privacy-policy' },
    { title: '使用条款', link: '/terms/terms-and-conditions' },
    { title: '版权声明', link: '/terms/copyright' },
    { title: '免责声明', link: '/terms/disclaimer' }
  ]
}

export default { ...theme, integ }
