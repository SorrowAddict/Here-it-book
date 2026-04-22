import { NextResponse } from 'next/server'
import type { BookSearchItem, BookSearchResponse, BookSearchSort } from '@/features/book-search/types'
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = (searchParams.get('query') ?? '').trim().toLowerCase()
  const start = parsePositiveInt(searchParams.get('start'), 1)
  const display = Math.min(parsePositiveInt(searchParams.get('display'), 10), 100)
  const sortParam = searchParams.get('sort')
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

  return NextResponse.json(response)
}
