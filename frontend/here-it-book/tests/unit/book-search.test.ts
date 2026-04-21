import { describe, expect, it } from 'vitest'
import {
  buildBookSearchUrl,
  formatPubdate,
  toStartFromPage,
  toTotalPages,
} from '@/features/book-search/utils'

describe('book search utils', () => {
  it('formats YYYYMMDD pubdate', () => {
    expect(formatPubdate('20241120')).toBe('2024.11.20')
  })

  it('returns original value when pubdate is invalid', () => {
    expect(formatPubdate('2024-11-20')).toBe('2024-11-20')
  })

  it('calculates start index from page', () => {
    expect(toStartFromPage(1, 10)).toBe(1)
    expect(toStartFromPage(3, 10)).toBe(21)
    expect(toStartFromPage(0, 10)).toBe(1)
  })

  it('calculates total pages', () => {
    expect(toTotalPages(0, 10)).toBe(1)
    expect(toTotalPages(10, 10)).toBe(1)
    expect(toTotalPages(11, 10)).toBe(2)
  })

  it('builds search url with query params', () => {
    const url = buildBookSearchUrl({
      query: '해리',
      page: 2,
      display: 10,
      sort: 'date',
    })

    expect(url).toContain('/api/v1/book/search?')
    expect(url).toContain('query=%ED%95%B4%EB%A6%AC')
    expect(url).toContain('start=11')
    expect(url).toContain('display=10')
    expect(url).toContain('sort=date')
  })
})
