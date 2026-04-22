export type BookSearchSort = 'sim' | 'date'

export type BookSearchItem = {
  title: string
  image: string
  author: string
  publisher: string
  pubdate: string
  isbn: string
  description: string
  total_cnt: number
  borrowed_cnt: number
  available: number
  section?: string
  floor?: string
  direction?: string
  mapImageUrl?: string
}

export type BookSearchResponse = {
  lastBuildDate: string
  total: number
  start: number
  display: number
  items: BookSearchItem[]
}

export type BookSearchStatus = 'idle' | 'loading' | 'success' | 'error'
