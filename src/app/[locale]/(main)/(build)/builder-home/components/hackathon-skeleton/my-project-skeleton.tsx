import { Skeleton } from '@hackquest/ui/shared/skeleton'
import { useTranslations } from 'next-intl'
import type React from 'react'

const MyProjectSkeleton: React.FC = () => {
  const t = useTranslations();
  return (
    <div className='flex flex-col gap-6'>
      <p className="title-3 text-neutral-800">{t('BuilderHome.myProject')}</p>
      <div className='hidden w-full gap-[.75rem] sm:flex'>
        {
          Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className='h-[22.5rem] w-[calc((100%-1.5rem)/3)]' />
          ))
        }
      </div>
      <Skeleton className='h-[22.5rem] w-full sm:hidden' />
    </div>
  )
}

export default MyProjectSkeleton
