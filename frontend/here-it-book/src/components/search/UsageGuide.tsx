import { BookOpenCheck, ChevronRight, Lightbulb, Search } from 'lucide-react'

export const UsageGuide = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mt-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
        <div className="flex flex-col items-center text-center flex-1 group">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 text-emerald-600 transition-colors group-hover:bg-emerald-100">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-semibold text-slate-900 mb-2">1. 도서 검색</h3>
          <p className="text-sm text-slate-500 break-keep px-2">
            찾고 싶은 책의 이름이나 저자를 입력하세요.
          </p>
        </div>

        <ChevronRight className="hidden md:block w-8 h-8 text-emerald-200 flex-shrink-0" />

        <div className="flex flex-col items-center text-center flex-1 group">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 text-emerald-600 transition-colors group-hover:bg-emerald-100">
            <Lightbulb className="w-8 h-8 transition-transform group-hover:scale-110" />
          </div>
          <h3 className="font-semibold text-slate-900 mb-2">2. LED 점등</h3>
          <p className="text-sm text-slate-500 break-keep px-2">
            상세 페이지에서 버튼을 눌러 서고 위치를 밝히세요.
          </p>
        </div>

        <ChevronRight className="hidden md:block w-8 h-8 text-emerald-200 flex-shrink-0" />

        <div className="flex flex-col items-center text-center flex-1 group">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 text-emerald-600 transition-colors group-hover:bg-emerald-100">
            <BookOpenCheck className="w-8 h-8" />
          </div>
          <h3 className="font-semibold text-slate-900 mb-2">3. 도서 픽업</h3>
          <p className="text-sm text-slate-500 break-keep px-2">
            불빛을 따라가 책을 꺼내세요. (꺼내면 자동 소등됩니다)
          </p>
        </div>
      </div>
    </div>
  )
}
