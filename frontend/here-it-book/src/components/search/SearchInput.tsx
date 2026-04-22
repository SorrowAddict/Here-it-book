'use client'

import { Search } from 'lucide-react'
import type { FormEventHandler } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
  onSubmit: FormEventHandler<HTMLFormElement>
  placeholder?: string
  inputAriaLabel?: string
  submitAriaLabel?: string
  formClassName?: string
  inputClassName?: string
  buttonClassName?: string
  iconClassName?: string
}

export function SearchInput({
  value,
  onChange,
  onSubmit,
  placeholder = '검색어를 입력하세요',
  inputAriaLabel = '도서 검색어',
  submitAriaLabel = '검색',
  formClassName,
  inputClassName,
  buttonClassName,
  iconClassName,
}: SearchInputProps) {
  return (
    <form onSubmit={onSubmit} className={cn('w-full relative', formClassName)}>
      <Input
        type="search"
        value={value}
        onChange={(event) => {
          onChange(event.target.value)
        }}
        placeholder={placeholder}
        className={cn('h-12 w-full !rounded-full pl-6 pr-14', inputClassName)}
        aria-label={inputAriaLabel}
      />
      <button
        type="submit"
        aria-label={submitAriaLabel}
        className={cn(
          'absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-emerald-600 text-white transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400',
          buttonClassName,
        )}
      >
        <Search className={cn('h- w-4', iconClassName)} />
      </button>
    </form>
  )
}
