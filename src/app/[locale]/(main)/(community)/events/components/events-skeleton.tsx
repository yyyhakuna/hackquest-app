import { Skeleton } from '@hackquest/ui/shared/skeleton'
import EventsCardsSkeleton from './events-cards-skeleton'
const EventsSkeleton = () => {
  return (
    <div className="container px-6">
      <div className=" relative flex justify-between gap-10">
        <div className="flex-1">
          <Skeleton className="title-1 h-10 w-24" />
          <Skeleton className="mt-6 h-5 w-full sm:flex-1" />
          <Skeleton className="mt-2 h-5 w-full sm:w-36" />
          <Skeleton className="mt-2 h-5 w-full sm:hidden sm:w-36" />
        </div>
        <Skeleton className="absolute right-2 h-10 w-10 sm:static sm:h-48 sm:w-48" />
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Skeleton className="h-[45px] w-36" />
        <Skeleton className="h-[45px] w-36" />
        <Skeleton className="h-[45px] w-36" />
        <Skeleton className="w-36 shrink sm:ml-auto" />
      </div>
      <div className="mt-6 flex">
        <Skeleton className="h-[40px] w-[80px]" />
        <Skeleton className="h-[40px] w-[80px]" />
        <Skeleton className="h-[40px] w-[80px]" />
        <Skeleton className="h-[40px] w-[80px]" />
      </div>
      <EventsCardsSkeleton />
    </div>
  )
}

export default EventsSkeleton
