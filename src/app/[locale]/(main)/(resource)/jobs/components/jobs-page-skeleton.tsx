import { Skeleton } from '@hackquest/ui/shared/skeleton'
import JobsCardsSkeleton from './jobs-cards-skeleton'

const JobsPgaeSkeleton = () => {
  return (
    <div className="container p-6">
      <div className="mb-7 flex flex-col justify-center space-y-6 sm:h-[220px]">
        <div className="relative flex items-end justify-between">
          <Skeleton className="h-[34px] w-[147px] " />
          <Skeleton className="absolute right-10 h-[55px] w-[55px] sm:hidden" />
        </div>
        <div className="flex gap-6">
          <Skeleton className="h-[46px] w-[179px]" />
          <Skeleton className="h-[46px] w-[152px]" />
        </div>
      </div>
      <div className="flex">
        <Skeleton className="h-10 w-[76px]" />
        <Skeleton className="h-10 w-[64px]" />
        <Skeleton className="hidden h-10 w-[114px] sm:block" />
        <Skeleton className="hidden h-10 w-[94px] sm:block" />
        <Skeleton className="hidden h-10 w-[114px] sm:block" />
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Skeleton className="h-[45px] w-36 sm:hidden" />
        <Skeleton className="h-[45px] w-36 sm:hidden" />
        <Skeleton className="h-[45px] w-36 sm:hidden" />
        <Skeleton className="h-[45px] w-36 sm:hidden" />
      </div>
      <div className="sm:flex ">
        <JobsCardsSkeleton />
        <div className="hidden w-[280px] sm:block">
          <div className="">
            <Skeleton className="h-[25px] w-[80px]" />
            <div className="mt-4 space-y-4">
              <div className=" flex gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-20" />
              </div>
              <div className=" flex gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-20" />
              </div>
              <div className=" flex gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
            <Skeleton className="mt-12 h-[25px] w-[80px]" />
            <div className="mt-4 space-y-4">
              <div className=" flex gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-20" />
              </div>
              <div className=" flex gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
            <Skeleton className="mt-12 h-[25px] w-[80px]" />
            <div className="mt-4 flex flex-wrap gap-2">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobsPgaeSkeleton
