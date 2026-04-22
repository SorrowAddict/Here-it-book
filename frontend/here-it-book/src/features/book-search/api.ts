import type { BookSearchResponse } from '@/features/book-search/types'
import { BOOKS_PER_PAGE, buildBookSearchUrl } from '@/features/book-search/utils'

export const fetchBookSearch = async ({
  query,
  page,
  sort,
  accumulatePages = false,
  signal,
}: {
  query: string
  page: number
  sort: 'sim' | 'date'
  accumulatePages?: boolean
  signal?: AbortSignal
}): Promise<BookSearchResponse> => {
  const target = accumulatePages
    ? `/api/v1/book/search?${new URLSearchParams({
        query,
        start: '1',
        display: String(Math.max(1, page) * BOOKS_PER_PAGE),
        sort,
      }).toString()}`
    : buildBookSearchUrl({
        query,
        page,
        sort,
        display: BOOKS_PER_PAGE,
      })

  const searchResponse = await fetch(target, { signal })

  if (!searchResponse.ok) {
    throw new Error(`검색 요청 실패 (${searchResponse.status})`)
  }

  return (await searchResponse.json()) as BookSearchResponse
}
