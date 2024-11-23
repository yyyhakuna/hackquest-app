import { Skeleton } from '@hackquest/ui/shared/skeleton'
import type React from 'react'

const DetailSkeleton: React.FC = () => {
  return (
    <div className='flex h-full w-full flex-col gap-[1.25rem] px-6 sm:container'>
      <Skeleton className="h-[6.25rem] w-full" />
      <Skeleton className="w-full flex-1" />
    </div>
  )
}

export default DetailSkeleton
