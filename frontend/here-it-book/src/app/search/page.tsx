'use client'

import { useSearchParams } from 'next/navigation'
import { BookSearchView } from '@/components/book/BookSearchView'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('query') ?? ''

  return (
    <main className="mx-auto w-full max-w-5xl py-10">
      <BookSearchView initialQuery={initialQuery} autoSearch={Boolean(initialQuery.trim())} />
    </main>
  )
}
