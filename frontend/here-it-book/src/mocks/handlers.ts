import { http, HttpResponse } from 'msw'
import type {
  BookSearchItem,
  BookSearchResponse,
  BookSearchSort,
} from '@/features/book-search/types'
import { MOCK_BOOKS } from '@/mocks/mockBooks'

const parsePositiveInt = (value: string | null, fallback: number): number => {
  if (!value) {
    return fallback
  }

  const parsed = Number(value)

  if (!Number.isInteger(parsed) || parsed < 1) {
    return fallback
  }

  return parsed
}

const sortBooks = (books: BookSearchItem[], sort: BookSearchSort): BookSearchItem[] => {
  if (sort === 'date') {
    return [...books].sort((a, b) => Number(b.pubdate) - Number(a.pubdate))
  }

  return books
}

export const handlers = [
  http.get('/api/health', () => {
    return HttpResponse.json({ ok: true })
  }),

  http.get('/api/v1/book/search', ({ request }) => {
    const url = new URL(request.url)
    const query = (url.searchParams.get('query') ?? '').trim().toLowerCase()
    const start = parsePositiveInt(url.searchParams.get('start'), 1)
    const display = Math.min(parsePositiveInt(url.searchParams.get('display'), 10), 100)
    const sortParam = url.searchParams.get('sort')
    const sort: BookSearchSort = sortParam === 'date' ? 'date' : 'sim'

    const filteredBooks = query
      ? MOCK_BOOKS.filter((book) => {
          const haystack = [book.title, book.author, book.publisher, book.description]
            .join(' ')
            .toLowerCase()

          return haystack.includes(query)
        })
      : []

    const sortedBooks = sortBooks(filteredBooks, sort)
    const offset = Math.max(start - 1, 0)
    const items = sortedBooks.slice(offset, offset + display)

    const response: BookSearchResponse = {
      lastBuildDate: new Date().toUTCString(),
      total: sortedBooks.length,
      start,
      display,
      items,
    }

    return HttpResponse.json(response)
  }),
]
