'use client'
import { useRouter } from '@/app/navigation'
import { useTranslations } from 'next-intl'
import { LuArrowLeft } from 'react-icons/lu'

const Back = () => {
  const t = useTranslations('HackathonOrganizer.manage')
  const router = useRouter()
  return (
    <button
      className='headline-s my-6 ml-8 flex items-center gap-2 text-primary-neutral'
      onClick={() => {
        router.back()
      }}
    >
      <LuArrowLeft />
      {t('back')}
    </button>
  )
}

export default Back
