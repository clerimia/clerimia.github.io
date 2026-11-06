export interface SiteMeta {
  title: string
  description?: string
  ogImage?: string
  articleDate?: string
}

export type CardList = { title: string; link?: string; children?: CardList }[]
export interface CardListData {
  title: string
  list: CardList
}
export interface TimelineEvent {
  date: string
  content: string
}
