import { BookOpen, Lightbulb, MapPinned } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BookMapImage } from '@/components/book/BookMapImage'
import { getBookDetailByIsbn } from '@/features/book-detail/service'
import { formatPubdate } from '@/features/book-search/utils'

type BookDetailPageProps = {
  params: Promise<{ isbn: string }>
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { isbn } = await params
  const book = getBookDetailByIsbn(isbn)

  if (!book) {
    notFound()
  }

  const hasImage = Boolean(book.image?.trim())
  const directionLabel = toDirectionLabel(book.direction)

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <Link
        href="/"
        className="inline-flex items-center text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
      >
        ← 검색으로 돌아가기
      </Link>

      <section className="mt-4 rounded-2xl border border-emerald-100 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="h-48 w-36 shrink-0 overflow-hidden rounded-lg border border-emerald-100 bg-emerald-50">
            {hasImage ? (
              <img src={book.image} alt={`${book.title} 표지`} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-emerald-400">
                <BookOpen className="h-10 w-10" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                book.available > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
              }`}
            >
              {book.available > 0 ? '대출 가능' : '대출 불가'}
            </span>
            <div className="mt-2 flex flex-wrap items-start gap-2">
              <h1 className="min-w-0 text-2xl font-semibold text-slate-900 sm:text-3xl">{book.title}</h1>
            </div>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-600">
              <span>
                총 보유 <strong className="font-semibold text-slate-900">{book.total_cnt}</strong>권
              </span>
              <span className="text-emerald-300">|</span>
              <span>
                대출 중 <strong className="font-semibold text-slate-900">{book.borrowed_cnt}</strong>권
              </span>
              <span className="text-emerald-300">|</span>
              <span>
                이용 가능 <strong className="font-semibold text-emerald-700">{book.available}</strong>권
              </span>
            </p>

            <dl className="mt-5 grid grid-cols-1 gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <div>
                <dt className="text-slate-500">저자</dt>
                <dd className="mt-1 font-medium">{book.author}</dd>
              </div>
              <div>
                <dt className="text-slate-500">출판사</dt>
                <dd className="mt-1 font-medium">{book.publisher}</dd>
              </div>
              <div>
                <dt className="text-slate-500">출간일</dt>
                <dd className="mt-1 font-medium">{formatPubdate(book.pubdate)}</dd>
              </div>
              <div>
                <dt className="text-slate-500">ISBN</dt>
                <dd className="mt-1 font-medium">{book.isbn}</dd>
              </div>
            </dl>

            <p className="mt-5 text-sm leading-6 text-slate-700">{book.description}</p>
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-xl border border-emerald-100 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
              <MapPinned className="h-4 w-4 text-emerald-700" />
              서고 위치
            </p>
            <p className="mt-2 text-sm text-slate-700">
              <span className="font-semibold text-slate-900">{book.section}</span>
              <span className="mx-2 text-emerald-300">|</span>
              <span className="font-semibold text-slate-900">{book.floor}층</span>
              <span className="mx-2 text-emerald-300">|</span>
              <span className="font-semibold text-slate-900">{directionLabel}측 서가</span>
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            <Lightbulb className="h-4 w-4" />
            위치 LED 켜기
          </button>
        </div>

        <div className="mt-4">

          <BookMapImage
            src={book.map_url}
            alt={`${book.floor}층 ${book.section} 약도`}
            className="mt-4 w-full rounded-lg border border-emerald-100 bg-emerald-50/30 object-cover"
          />
        </div>
      </section>
    </main>
  )
}

function toDirectionLabel(direction: 'left' | 'center' | 'right') {
  if (direction === 'left') {
    return '좌'
  }

  if (direction === 'center') {
    return '중앙'
  }

  return '우'
}
