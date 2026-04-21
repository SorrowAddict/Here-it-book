'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SearchInput } from '@/components/search/SearchInput'

export const SearchHero = () => {
  const router = useRouter()
  const [inputValue, setInputValue] = useState('')

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const query = inputValue.trim()
    if (!query) {
      return
    }

    router.push(`/search?query=${encodeURIComponent(query)}`)
  }

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center tracking-tight leading-tight">
        원하는 도서를 검색하고, <br className="md:hidden" />
        <span className="text-emerald-700">LED</span>로 위치를 확인하세요
      </h1>
      <p className="text-slate-500 mb-10 text-center">여깃북 서고 관리 시스템</p>

      <SearchInput
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSearch}
        placeholder="도서명, 저자, ISBN을 입력하세요"
        inputAriaLabel="메인 도서 검색어"
        formClassName="max-w-2xl"
      />
    </section>
  )
}
