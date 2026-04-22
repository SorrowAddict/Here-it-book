'use client'

import { FormEvent, useEffect, useState } from 'react'
import { fetchBookSearch } from '@/features/book-search/api'
import type {
  BookSearchResponse,
  BookSearchSort,
  BookSearchStatus,
} from '@/features/book-search/types'

export const useBookSearch = ({
  initialQuery = '',
  autoSearch = false,
  accumulatePages = false,
}: {
  initialQuery?: string
  autoSearch?: boolean
  accumulatePages?: boolean
}) => {
  const [inputValue, setInputValue] = useState(initialQuery)
  const [query, setQuery] = useState(autoSearch ? initialQuery.trim() : '')
  const [sort, setSort] = useState<BookSearchSort>('sim')
  const [page, setPage] = useState(1)
  const [retryKey, setRetryKey] = useState(0)
  const [status, setStatus] = useState<BookSearchStatus>(autoSearch ? 'loading' : 'idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [response, setResponse] = useState<BookSearchResponse | null>(null)

  useEffect(() => {
    if (!query) {
      return
    }

    const controller = new AbortController()

    const runSearch = async () => {
      setStatus('loading')
      setErrorMessage('')

      try {
        const data = await fetchBookSearch({
          query,
          page,
          sort,
          accumulatePages,
          signal: controller.signal,
        })

        setResponse(data)
        setStatus('success')
      } catch (error) {
        if (controller.signal.aborted) {
          return
        }

        setResponse(null)
        setStatus('error')
        setErrorMessage(error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.')
      }
    }

    runSearch()

    return () => {
      controller.abort()
    }
  }, [accumulatePages, page, query, retryKey, sort])

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmed = inputValue.trim()
    if (!trimmed) {
      setQuery('')
      setPage(1)
      setStatus('idle')
      setResponse(null)
      setErrorMessage('')
      return
    }

    setPage(1)
    setQuery(trimmed)
  }

  const changeSort = (nextSort: BookSearchSort) => {
    setSort(nextSort)
    setPage(1)
  }

  const retry = () => {
    setRetryKey((prev) => prev + 1)
  }

  return {
    inputValue,
    setInputValue,
    query,
    sort,
    page,
    status,
    response,
    errorMessage,
    setPage,
    submitSearch,
    changeSort,
    retry,
  }
}
