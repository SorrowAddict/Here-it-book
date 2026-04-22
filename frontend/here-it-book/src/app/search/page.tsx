import { BookSearchView } from '@/components/book/BookSearchView'

type SearchPageProps = {
  searchParams: Promise<{ query?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { query = '' } = await searchParams

  return (
    <main className="mx-auto w-full max-w-5xl py-10">
      <BookSearchView initialQuery={query} autoSearch={Boolean(query.trim())} />
    </main>
  )
}
