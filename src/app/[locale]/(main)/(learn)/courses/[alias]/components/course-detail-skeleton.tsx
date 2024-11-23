import { Skeleton } from '@hackquest/ui/shared/skeleton'

const HeaderSkeleton = () => {
  return (
    <div className="flex justify-between gap-8">
      <div className="w-full">
        <Skeleton className="h-[34px] w-full" />
        <Skeleton className="mt-4 h-[72px] w-full" />

        <div className="mt-8 flex items-center gap-8">
          <Skeleton className="h-8 w-[100px]" />
        </div>
      </div>
      <div className="mb-8 hidden sm:block">
        <Skeleton className="h-[280px] w-[330px]" />
      </div>
    </div>
  )
}

const ContentSkeleton = () => {
  return (
    <div className="flex gap-8 pt-8">
      <div className="flex-1">
        <Skeleton className="h-6 w-[136px]" />
        <Skeleton className="my-6 h-[120px]" />
        <div className="flex gap-4">
          <Skeleton className="h-5 w-[95px]" />
          <Skeleton className="h-5 w-[95px]" />
          <Skeleton className="h-5 w-[95px]" />
        </div>
        <Skeleton className="mt-8 mb-6 h-6 w-[136px]" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-[90px]" />
          <Skeleton className="h-[90px]" />
          <Skeleton className="h-[90px]" />
          <Skeleton className="h-[90px]" />
        </div>
      </div>
      <div className="hidden pt-8 sm:block">
        <Skeleton className="h-[208px] w-[280px]" />
      </div>
    </div>
  )
}

const CourseDetailSkeleton = () => {
  return (
    <div className="container">
      <HeaderSkeleton />
      <ContentSkeleton />
    </div>
  )
}

export default CourseDetailSkeleton
