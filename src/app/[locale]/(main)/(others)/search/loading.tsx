import { Skeleton } from '@hackquest/ui/shared/skeleton'
import type React from 'react'

const Loading: React.FC = () => {
  return (
    <div className='flex w-full flex-col gap-8 px-6 sm:container'>
      <Skeleton className="h-[2.125rem] w-full" />
      <Skeleton className="h-[2.125rem] w-full" />
      <div className="flex flex-col gap-4">
        <Skeleton className="h-6 w-full" />
        <div className="flex flex-wrap gap-4">
          {[1, 2, 3].map((_, i) => (
            <Skeleton
              key={i}
              className="h-[10rem] sm:w-[calc((100%-2rem)/3)]"
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          {[1, 2, 3].map((_, i) => (
            <Skeleton
              key={i}
              className="h-[10rem] sm:w-[calc((100%-2rem)/3)]"
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          {[1, 2, 3].map((_, i) => (
            <Skeleton
              key={i}
              className="h-[10rem] sm:w-[calc((100%-2rem)/3)]"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Loading
