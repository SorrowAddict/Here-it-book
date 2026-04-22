import type { BookSearchItem } from '@/features/book-search/types'
import { MOCK_BOOKS } from '@/mocks/mockBooks'

export type BookDetailItem = BookSearchItem & {
  section: string
  floor: number
  direction: 'left' | 'center' | 'right'
  map_url: string
  created_at: string
  updated_at: string
}

export function getBookDetailByIsbn(isbn: string): BookDetailItem | null {
  const normalized = isbn.trim()
  if (!normalized) {
    return null
  }

  const book = MOCK_BOOKS.find((item) => item.isbn === normalized)
  if (!book) {
    return null
  }

  const fallbackLocation = getLocationInfo(book.isbn)

  return {
    ...book,
    section: fallbackLocation.section,
    floor: fallbackLocation.floor,
    direction: fallbackLocation.direction,
    map_url: '/library_dummy_map.png',
    created_at: '2026-03-13T10:20:30Z',
    updated_at: '2026-03-13T10:20:30Z',
  }
}

function getLocationInfo(isbn: string): {
  section: string
  floor: number
  direction: 'left' | 'center' | 'right'
} {
  const sections = ['P1', 'P2', 'P3', 'P4']
  const floors = [1, 2, 3]
  const directions: Array<'left' | 'center' | 'right'> = ['left', 'center', 'right']
  const sum = isbn
    .split('')
    .map((char) => Number(char))
    .filter((value) => Number.isFinite(value))
    .reduce((acc, cur) => acc + cur, 0)

  return {
    section: sections[sum % sections.length],
    floor: floors[sum % floors.length],
    direction: directions[sum % directions.length],
  }
}
