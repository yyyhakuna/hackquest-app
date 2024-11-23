import { Skeleton } from '@hackquest/ui/shared/skeleton'

const EventsCardsSkeleton = () => {
  return (
    <div>
      <div className='mt-6 w-full gap-4 space-y-4 sm:flex sm:space-y-0'>
        <div className='w-full rounded-2xl border-2 border-neutral-200 p-4'>
          <Skeleton className='h-48 w-full' />
          <div className='mt-4 flex gap-2'>
            <Skeleton className='h-5 w-[97px]' />
            <Skeleton className='h-5 w-[63px]' />
          </div>
          <div className="mt-4">
            <Skeleton className='h-6 w-4/5' />
            <Skeleton className='mt-2 h-6 w-1/3' />
          </div>
          <div className="mt-4 flex gap-2">
            <Skeleton className='h-5 w-5' />
            <Skeleton className='h-5 w-24' />
          </div>
          <div className="mt-2 flex gap-2">
            <Skeleton className='h-5 w-5' />
            <Skeleton className='h-5 w-20' />
          </div>
        </div>
        <div className='w-full rounded-2xl border-2 border-neutral-200 p-4'>
          <Skeleton className='h-48 w-full' />
          <div className='mt-4 flex gap-2'>
            <Skeleton className='h-5 w-[97px]' />
            <Skeleton className='h-5 w-[63px]' />
          </div>
          <div className="mt-4">
            <Skeleton className='h-6 w-4/5' />
            <Skeleton className='mt-2 h-6 w-1/3' />
          </div>
          <div className="mt-4 flex gap-2">
            <Skeleton className='h-5 w-5' />
            <Skeleton className='h-5 w-24' />
          </div>
          <div className="mt-2 flex gap-2">
            <Skeleton className='h-5 w-5' />
            <Skeleton className='h-5 w-20' />
          </div>
        </div>
        <div className='hidden w-full rounded-2xl border-2 border-neutral-200 p-4 sm:block'>
          <Skeleton className='h-48 w-full' />
          <div className='mt-4 flex gap-2'>
            <Skeleton className='h-5 w-[97px]' />
            <Skeleton className='h-5 w-[63px]' />
          </div>
          <div className="mt-4">
            <Skeleton className='h-6 w-4/5' />
            <Skeleton className='mt-2 h-6 w-1/3' />
          </div>
          <div className="mt-4 flex gap-2">
            <Skeleton className='h-5 w-5' />
            <Skeleton className='h-5 w-24' />
          </div>
          <div className="mt-2 flex gap-2">
            <Skeleton className='h-5 w-5' />
            <Skeleton className='h-5 w-20' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventsCardsSkeleton
