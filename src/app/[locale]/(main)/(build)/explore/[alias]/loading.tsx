import { Skeleton } from '@hackquest/ui/shared/skeleton'
import type React from 'react'

const Loading: React.FC = () => {
  return (
    <div className='flex h-screen w-full flex-col gap-6 px-6 sm:container'>
      <Skeleton className="h-[12.5rem] w-full" />
      <Skeleton className="h-[6.25rem] w-full" />
      <Skeleton className="w-full flex-1" />
    </div>
  )
}

export default Loading
