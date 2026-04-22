import { NextResponse } from 'next/server'
import { getBookDetailByIsbn } from '@/features/book-detail/service'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const dIsbn = (searchParams.get('d_isbn') ?? '').trim()
  const book = getBookDetailByIsbn(dIsbn)

  if (!book) {
    return NextResponse.json({ message: '도서를 찾을 수 없습니다.' }, { status: 404 })
  }

  return NextResponse.json(book)
}
