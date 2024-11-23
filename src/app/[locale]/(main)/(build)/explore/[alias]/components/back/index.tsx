import { useRouter } from '@/app/navigation'
import { useTranslations } from 'next-intl'
import type React from 'react'
import { FiArrowLeft } from 'react-icons/fi'

const Back: React.FC = () => {
  const t = useTranslations()
  const router = useRouter()
  return (
    <div
      className="headline-s flex cursor-pointer items-center gap-2 text-neutral-800"
      onClick={() => router.back()}
    >
      <FiArrowLeft className="size-6 sm:size-4" />
      <span className="hidden sm:block">{t('Common.back')}</span>
    </div>
  )
}

export default Back
