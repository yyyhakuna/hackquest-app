'use client'
import { useRouter } from '@/app/navigation'
import { cn } from '@hackquest/ui/lib/utils'
import { useTranslations } from 'next-intl'
import type { HTMLAttributes } from 'react'
import { LuArrowLeft } from 'react-icons/lu'

interface BackProps extends HTMLAttributes<HTMLDivElement> {}

const Back: React.FC<BackProps> = ({ className }) => {
  const t = useTranslations('HackathonOrganizer.manage')
  const router = useRouter()
  return (
    <button
      className={cn(' flex items-center gap-1 ' + className)}
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
