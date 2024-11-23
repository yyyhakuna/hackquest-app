import { Skeleton } from '@hackquest/ui/shared/skeleton'

const JobsCardsSkeleton = () => {
  return (
    <div className="mt-6 w-full gap-4 space-y-4 sm:mr-10">
      <div className="w-full rounded-2xl border-2 border-neutral-200 p-4">
        <div className="sm:flex sm:items-center sm:gap-4">
          <Skeleton className='h-12 w-12 rounded-full' />
          <div className='mt-6 sm:relative sm:mt-0 sm:w-full'>
            <Skeleton className="h-2 w-1/5 sm:w-1/6" />
            <Skeleton className="mt-2 h-4 w-2/3 sm:w-1/3" />
            <Skeleton className='top-[-24px] right-4 mt-2 hidden h-7 w-7 sm:absolute sm:block' />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Skeleton className="h-5 w-[97px]" />
          <Skeleton className="h-5 w-[63px]" />
        </div>

        <div className="sm:flex sm:justify-between">
          <div className='mt-4 flex gap-3'>
            <div className=" flex gap-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-20" />
            </div>
            <div className=" flex gap-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-16" />
            </div>
            <div className=" flex gap-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-16" />
            </div>
          </div>
          <Skeleton className='mt-4 h-5 w-16' />
        </div>
      </div>
      <div className="w-full rounded-2xl border-2 border-neutral-200 p-4">
        <div className="sm:flex sm:items-center sm:gap-4">
          <Skeleton className='h-12 w-12 rounded-full' />
          <div className='mt-6 sm:relative sm:mt-0 sm:w-full'>
            <Skeleton className="h-2 w-1/5 sm:w-1/6" />
            <Skeleton className="mt-2 h-4 w-2/3 sm:w-1/3" />
            <Skeleton className='top-[-24px] right-4 mt-2 hidden h-7 w-7 sm:absolute sm:block' />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Skeleton className="h-5 w-[97px]" />
          <Skeleton className="h-5 w-[63px]" />
        </div>

        <div className="sm:flex sm:justify-between">
          <div className='mt-4 flex gap-3'>
            <div className=" flex gap-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-20" />
            </div>
            <div className=" flex gap-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-16" />
            </div>
            <div className=" flex gap-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-16" />
            </div>
          </div>
          <Skeleton className='mt-4 h-5 w-16' />
        </div>
      </div>
    </div>
  )
}

export default JobsCardsSkeleton
