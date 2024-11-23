import { Skeleton } from '@hackquest/ui/shared/skeleton'
import type React from 'react'

const HackathonSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-[14.625rem] w-full " />
      ))}
    </div>
  )
}

export default HackathonSkeleton
