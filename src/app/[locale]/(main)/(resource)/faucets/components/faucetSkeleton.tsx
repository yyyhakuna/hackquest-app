import { Skeleton } from '@hackquest/ui/shared/skeleton'

const FaucetSkeletonHeader = () => {
  return (
    <>
      <div className="hidden grid-cols-10 sm:grid">
        <div className="col-span-7 pb-8">
          <Skeleton className="h-[34px] w-[312px]" />
          <div className="py-6">
            <Skeleton className="h-12 w-[792px]" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <FaucetStepCardSkeleton />
            <FaucetStepCardSkeleton />
            <FaucetStepCardSkeleton />
          </div>
        </div>
      </div>
    </>
  )
}

const FaucetSkeletonMobile = () => {
  return (
    <>
      <div className="block pb-6 sm:hidden">
        <div className="flex justify-between gap-3">
          <Skeleton className="h-12 flex-auto" />
          <Skeleton className="h-12 w-12 flex-none" />
        </div>
        <div className="py-4">
          <Skeleton className="h-12 w-full" />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <FaucetStepCardSkeleton />
          <FaucetStepCardSkeleton />
          <FaucetStepCardSkeleton />
        </div>
      </div>
    </>
  )
}

const FaucetStepCardSkeleton = () => {
  return (
    <div>
      <div className="flex items-center gap-3">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-5 w-40" />
      </div>
      <div className="pt-2">
        <Skeleton className="h-12" />
      </div>
    </div>
  )
}

const FaucetCardSkeleton = () => {
  return (
    <div className="card-hover overflow-hidden rounded-xl border-2 border-neutral-200 p-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="py-3">
        <Skeleton className="h-5 w-28" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Skeleton className="mb-3 h-[18px] w-9" />
          <Skeleton className="h-5 w-25" />
        </div>
        <div>
          <Skeleton className="mb-3 h-[18px] w-9" />
          <Skeleton className="h-5 w-25" />
        </div>
      </div>
    </div>
  )
}

const FaucetListSkeleton = () => {
  return (
    <div className="grid gap-4 pt-6 sm:grid-cols-3">
      <FaucetCardSkeleton />
      <FaucetCardSkeleton />
      <FaucetCardSkeleton />
      <FaucetCardSkeleton />
      <FaucetCardSkeleton />
      <FaucetCardSkeleton />
    </div>
  )
}

const FaucetFooterSkeleton = () => {
  return (
    <div>
      <div className="py-6">
        <Skeleton className="h-[34px] w-72" />
      </div>
      <div className="pb-6">
        <Skeleton className="h-12 w-full" />
      </div>
      <div className="pb-6">
        <Skeleton className="h-12 w-full" />
      </div>
      <div className="pb-6">
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  )
}

const FaucetSkeleton = () => {
  return (
    <>
      <div className="px-6 sm:container sm:px-0">
        <FaucetSkeletonHeader />
        <FaucetSkeletonMobile />
        <Skeleton className="h-14 w-1/2 sm:w-full" />
        <FaucetListSkeleton />
        <FaucetFooterSkeleton />
      </div>
    </>
  )
}

export default FaucetSkeleton
