import { Skeleton } from '@hackquest/ui/shared/skeleton'

const ExploreHeaderSkeleton = () => {
  return (
    <div className="flex sm:justify-between sm:gap-[374px]">
      <div>
        <Skeleton className="h-[34px] w-[261px]" />
        <Skeleton className="mt-6 h-12 w-[100%] sm:w-[581px]" />
      </div>
      <div className="hidden pr-[94px] sm:block">
        <Skeleton className="h-[174px] w-[121px]" />
      </div>
    </div>
  )
}

const ExploreHighlightSkeleton = () => {
  return (
    <>
      <div className="flex gap-4 pt-6 sm:pt-0">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-40" />
      </div>
      <div className="mt-6 mb-14 w-full justify-between rounded-xl border-2 border-neutral-200 bg-neutral-white p-6 sm:flex">
        <div>
          <Skeleton className="h-7 w-[268px]" />
          <Skeleton className="mt-3 mb-6 h-[42px] w-full sm:w-[469px]" />
          <div className="flex gap-3">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="my-6 h-[65px] w-[218px]" />
          <Skeleton className="h-[65px] w-[218px]" />
        </div>
        <div className="mt-6 sm:mt-0">
          <Skeleton className="h-[163] w-full sm:h-[317px] sm:w-[571px]" />
        </div>
      </div>
    </>
  )
}

const ExploreSkeleton = () => {
  return (
    <>
      <div>
        <Skeleton className="h-6 w-[132px]" />
      </div>
      <div className="my-6 flex gap-4">
        <Skeleton className="h-6 w-[154px]" />
        <Skeleton className="h-6 w-[154px]" />
      </div>
      <div>
        <Skeleton className="h-6 w-full" />
      </div>
      <ExploreHackathonCardSkeleton />
      <ExploreHackathonCardSkeleton />
      <ExploreHackathonCardSkeleton />
    </>
  )
}

export const ExploreHackathonCardSkeleton = () => {
  return (
    <div className='mt-6 mb-14 justify-between rounded-xl border-2 border-neutral-200 bg-neutral-white p-6 sm:flex'>
      <div>
        <Skeleton className="h-7 w-[268px]" />
        <Skeleton className="mt-3 mb-6 h-[42px] w-[90%] sm:w-[395px]" />
        <div className='mb-6 flex gap-3 sm:mb-0'>
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>
      <div className='mb-6 sm:mb-0'>
        <Skeleton className="mb-6 h-[65px] w-[218px]" />
        <Skeleton className="h-[65px] w-[218px]" />
      </div>
      <div>
        <Skeleton className='h-[186px] w-full sm:w-[329px]' />
      </div>
    </div>
  )
}

const ExploreHackathonSkeleton = () => {
  return (
    <div className="px-6 sm:container">
      <ExploreHeaderSkeleton />
      <ExploreHighlightSkeleton />
      <ExploreSkeleton />
    </div>
  )
}

export default ExploreHackathonSkeleton
