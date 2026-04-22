import type { BookSearchItem } from '@/features/book-search/types'
import { MOCK_BOOKS } from '@/mocks/mockBooks'

export function getBookDetailByIsbn(isbn: string): BookSearchItem | null {
  const normalized = isbn.trim()
  if (!normalized) {
    return null
  }

  return MOCK_BOOKS.find((book) => book.isbn === normalized) ?? null
}
