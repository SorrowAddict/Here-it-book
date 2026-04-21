type BookDetailPageProps = {
  params: Promise<{ isbn: string }>
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { isbn } = await params

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold">도서 상세</h1>
      <p className="mt-4 text-sm text-zinc-600">ISBN: {isbn}</p>
    </main>
  )
}
