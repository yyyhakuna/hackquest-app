import { Skeleton } from '@hackquest/ui/shared/skeleton'
import type React from 'react'

const ProjectsSkeleton: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <Skeleton key={index} className="h-[22.5rem] w-full sm:w-[calc((100%-3rem)/3)]" />
      ))}
    </div>
  )
}

export default ProjectsSkeleton
