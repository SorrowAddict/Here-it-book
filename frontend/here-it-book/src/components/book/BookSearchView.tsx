'use client'

import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { FormEvent, useMemo, useSyncExternalStore } from 'react'
import { BookResultCard } from '@/components/book/BookResultCard'
import { useBookSearch } from '@/features/book-search/use-book-search'
import { toTotalPages } from '@/features/book-search/utils'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/search/SearchInput'

type BookSearchViewProps = {
  initialQuery?: string
  autoSearch?: boolean
  embedded?: boolean
  syncQueryInUrl?: boolean
}

export function BookSearchView({
  initialQuery = '',
  autoSearch = false,
  embedded = false,
  syncQueryInUrl = false,
}: BookSearchViewProps) {
  const router = useRouter()
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const {
    inputValue,
    setInputValue,
    query,
    page,
    status,
    response,
    errorMessage,
    setPage,
    submitSearch,
    retry,
  } = useBookSearch({ initialQuery, autoSearch, accumulatePages: isMobile })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    submitSearch(event)

    if (!syncQueryInUrl) {
      return
    }

    const trimmed = inputValue.trim()
    const target = trimmed ? `${pathname}?query=${encodeURIComponent(trimmed)}` : pathname
    router.replace(target, { scroll: false })
  }

  const totalPages = useMemo(() => {
    if (!response) {
      return 1
    }

    return toTotalPages(response.total, response.display)
  }, [response])

  const displayedItems = response?.items ?? []
  const isEmpty = status === 'success' && displayedItems.length === 0
  const showResultSection =
    displayedItems.length > 0 && (status === 'success' || (isMobile && status === 'loading'))
  const startPage = Math.max(1, page - 1)
  const endPage = Math.min(totalPages, page + 1)
  const visiblePages = Array.from(
    new Set(Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index)),
  )

  return (
    <section className={embedded ? 'mx-auto w-full max-w-5xl' : 'mx-auto w-full max-w-5xl px-6 py-10'}>
      {!embedded && (
        <>
          <p className="mb-2 w-fit rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            여깃북
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">도서 검색</h1>
          <p className="mt-2 text-sm text-slate-600">제목, 저자, 출판사 키워드로 검색할 수 있습니다.</p>
        </>
      )}

      <SearchInput
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSubmit}
        placeholder="예: 해리 포터"
        inputAriaLabel="도서 검색어"
        formClassName="mx-auto mt-6 max-w-2xl"
      />

      {!query && status === 'idle' && (
        <p className="mt-8 w-full rounded-md border border-dashed border-emerald-200 bg-emerald-50/40 px-4 py-8 text-center text-sm text-slate-600">
          검색어를 입력해 도서를 찾아보세요.
        </p>
      )}

      {status === 'loading' && (
        <p className="mt-8 w-full text-sm text-slate-600">검색 중입니다...</p>
      )}

      {status === 'error' && (
        <div className="mt-8 w-full rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <p>{errorMessage}</p>
          <Button type="button" variant="destructive" size="sm" className="mt-2" onClick={retry}>
            다시 시도
          </Button>
        </div>
      )}

      {isEmpty && (
        <p className="mt-8 w-full rounded-md border border-emerald-200 bg-emerald-50/40 px-4 py-8 text-center text-sm text-slate-600">
          검색 결과가 없습니다.
        </p>
      )}

      {showResultSection && response && (
        <section className="mt-8 w-full">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm text-slate-700">총 {response.total.toLocaleString()}건</p>
            <p className="text-xs text-slate-500">
              {page} / {totalPages} 페이지
            </p>
          </div>

          <ul className="space-y-3">
            {displayedItems.map((book) => (
              <BookResultCard key={book.isbn} book={book} />
            ))}
          </ul>

          <div className="mt-6 hidden w-full flex-wrap items-center justify-center gap-1.5 sm:flex">
            <button
              type="button"
              onClick={() => {
                setPage(Math.max(1, page - 1))
              }}
              disabled={page <= 1}
              aria-label="이전 페이지"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-200 text-slate-600 transition hover:bg-emerald-50 disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {visiblePages.map((pageNumber) => {
              const isActive = pageNumber === page

              return (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => {
                    setPage(pageNumber)
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={
                    isActive
                      ? 'inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-emerald-600 px-2 text-sm font-semibold text-white'
                      : 'inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-emerald-200 px-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'
                  }
                >
                  {pageNumber}
                </button>
              )
            })}

            {endPage < totalPages - 1 && (
              <>
                <span className="px-1 text-sm text-slate-400">...</span>
                <button
                  type="button"
                  onClick={() => {
                    setPage(totalPages)
                  }}
                  className="inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-emerald-200 px-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  {totalPages}
                </button>
              </>
            )}

            {endPage === totalPages - 1 && (
              <button
                type="button"
                onClick={() => {
                  setPage(totalPages)
                }}
                className="inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-emerald-200 px-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {totalPages}
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setPage(Math.min(totalPages, page + 1))
              }}
              disabled={page >= totalPages}
              aria-label="다음 페이지"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-200 text-slate-600 transition hover:bg-emerald-50 disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {isMobile && page < totalPages && (
            <div className="mt-6 flex w-full justify-center sm:hidden">
              <Button
                type="button"
                onClick={() => {
                  setPage((prev) => Math.min(totalPages, prev + 1))
                }}
                disabled={status === 'loading'}
                variant="outline"
                size="sm"
                className="!rounded-full px-5"
              >
                {status === 'loading' ? (
                  '불러오는 중...'
                ) : (
                  <span className="inline-flex items-center gap-1">
                    더보기
                    <ChevronDown className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </div>
          )}
        </section>
      )}
    </section>
  )
}

function useIsMobile() {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === 'undefined') {
        return () => {}
      }

      const mediaQuery = window.matchMedia('(max-width: 639px)')
      mediaQuery.addEventListener('change', onStoreChange)
      return () => {
        mediaQuery.removeEventListener('change', onStoreChange)
      }
    },
    () => {
      if (typeof window === 'undefined') {
        return false
      }

      return window.matchMedia('(max-width: 639px)').matches
    },
    () => false,
  )
}
