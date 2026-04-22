import { SearchHero } from '@/components/search/SearchHero'
import { UsageGuide } from '@/components/search/UsageGuide'
export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 min-h-[80vh] flex flex-col justify-center py-20">
      
      {/* 1. 상단: 검색창 영역 */}
      <SearchHero />

      {/* 2. 하단: 사용법 안내 영역 */}
      <UsageGuide />

    </main>
  )
}
