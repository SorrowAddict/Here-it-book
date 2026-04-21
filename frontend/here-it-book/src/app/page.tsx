import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-8 px-6 py-16 sm:px-10">
        <p className="w-fit rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1 text-sm font-medium text-cyan-200">
          Here-it-book
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
          도서관 책 검색부터 대출 가능 수량 확인까지
          <br />
          한 화면에서 빠르게 확인하세요.
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-300">
          제목, 저자, 출판사로 책을 찾고 서고 위치와 남은 권수를 바로 확인할 수 있는 도서 검색
          서비스입니다.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/search"
            className="inline-flex h-12 items-center justify-center rounded-md bg-cyan-400 px-6 text-base font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            도서 검색 시작하기
          </Link>
          <Link
            href="/book/9791193790403"
            className="inline-flex h-12 items-center justify-center rounded-md border border-slate-600 px-6 text-base font-semibold text-slate-100 transition hover:border-slate-400 hover:bg-slate-900"
          >
            샘플 도서 상세 보기
          </Link>
        </div>
      </section>
    </main>
  )
}
