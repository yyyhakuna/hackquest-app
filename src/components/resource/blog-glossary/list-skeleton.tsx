import { Skeleton } from '@hackquest/ui/shared/skeleton'
import type React from 'react'

const ListSkeleton: React.FC = () => {
  return (
    <div className='flex h-full flex-col gap-[1.25rem] px-6 sm:container'>
      <Skeleton className="h-[12.5rem] w-full flex-shrink-0" />
      <div className='flex w-full flex-1 flex-wrap gap-[1.25rem]'>
        {Array.from({ length: 9 }).map((_, index) => (
          <Skeleton key={index} className="h-[8.75rem] w-[calc((100%-2.5rem)/3)]" />
        ))}
      </div>
    </div>
  )
}

export default ListSkeleton
