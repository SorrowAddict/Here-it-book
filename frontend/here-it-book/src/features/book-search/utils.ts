import type { BookSearchSort } from '@/features/book-search/types'

export const BOOKS_PER_PAGE = 10

export const formatPubdate = (pubdate: string): string => {
  if (!/^\d{8}$/.test(pubdate)) {
    return pubdate
  }

  const year = pubdate.slice(0, 4)
  const month = pubdate.slice(4, 6)
  const day = pubdate.slice(6, 8)

  return `${year}.${month}.${day}`
}

export const toStartFromPage = (page: number, display = BOOKS_PER_PAGE): number => {
  return (Math.max(1, page) - 1) * display + 1
}

export const toTotalPages = (total: number, display = BOOKS_PER_PAGE): number => {
  return Math.max(1, Math.ceil(total / display))
}

export const buildBookSearchUrl = ({
  query,
  page,
  display = BOOKS_PER_PAGE,
  sort,
}: {
  query: string
  page: number
  display?: number
  sort: BookSearchSort
}): string => {
  const params = new URLSearchParams({
    query,
    start: String(toStartFromPage(page, display)),
    display: String(display),
    sort,
  })

  return `/api/v1/book/search?${params.toString()}`
}
