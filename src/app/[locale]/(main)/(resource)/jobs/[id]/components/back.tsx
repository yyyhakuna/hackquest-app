'use client'

import { useRouter } from '@/app/navigation'
import { useTranslations } from 'next-intl'
import { LuArrowLeft } from 'react-icons/lu'
export function Back() {
  const router = useRouter()
  const t = useTranslations('Jobs')
  return (
    <div
      className="flex w-full items-center gap-1 font-bold outline-none"
      aria-label="Back"
    >
      <LuArrowLeft
        aria-hidden
        className="h-5 w-5 cursor-pointer text-neutral-rich-gray"
        onClick={() => router.back()}
      />
      <button className="hidden sm:block" onClick={() => router.back()}>
        {t('detail.back')}
      </button>
      <span className="title-3 m-auto block text-neutral-800 sm:hidden">
        Job Detail
      </span>
    </div>
  )
}
