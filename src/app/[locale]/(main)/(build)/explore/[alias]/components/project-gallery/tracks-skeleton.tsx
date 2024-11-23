import { Skeleton } from '@hackquest/ui/shared/skeleton'
import type React from 'react'

const TracksSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-[2rem] w-[50%]" />
      <div className=' hidden gap-6 sm:flex'>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-[22.5rem] w-[calc((100%-3rem)/3)]" />
        ))}
      </div>
      <div className="sm:hidden">
        <Skeleton className="h-[22.5rem] w-full" />
      </div>
    </div>
  )
}

export default TracksSkeleton
