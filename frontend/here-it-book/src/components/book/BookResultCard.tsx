import { BookOpen } from 'lucide-react'
import Link from 'next/link'
import type { BookSearchItem } from '@/features/book-search/types'
import { formatPubdate } from '@/features/book-search/utils'

type BookResultCardProps = {
  book: BookSearchItem
}

export function BookResultCard({ book }: BookResultCardProps) {
  const hasImage = Boolean(book.image?.trim())

  return (
    <li>
      <Link
        href={`/book/${book.isbn}`}
        className="block rounded-lg border border-emerald-200 bg-white p-4 transition hover:border-emerald-300 hover:bg-emerald-50/30"
      >
        <div className="flex items-start gap-4">
          <div className="h-24 w-18 shrink-0 overflow-hidden rounded-md border border-emerald-100 bg-emerald-50">
            {hasImage ? (
              <img src={book.image} alt={`${book.title} 표지`} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-emerald-400">
                <BookOpen className="h-6 w-6" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1 pt-1">
            <p className="text-sm font-semibold text-slate-900">{book.title}</p>
            <p className="mt-1 text-xs text-slate-600">
              {book.author} | {book.publisher} | {formatPubdate(book.pubdate)}
            </p>
            <p className="mt-2 line-clamp-2 text-sm text-slate-700">{book.description}</p>
            <p className="mt-2 text-xs text-slate-500">
              보유 {book.total_cnt}권 / 대출 {book.borrowed_cnt}권 / 이용 가능 {book.available}권
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}
