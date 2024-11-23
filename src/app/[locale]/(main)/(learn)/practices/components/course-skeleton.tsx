import { Card, CardContent } from '@hackquest/ui/shared/card'
import { Skeleton } from '@hackquest/ui/shared/skeleton'

export function CourseSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="relative hover:bg-neutral-white">
          <div className="absolute top-4 right-4">
            <Skeleton className="h-6 w-14" />
          </div>
          <CardContent className="space-y-4 p-4">
            <Skeleton className="size-16 rounded-full" />
            <Skeleton className="h-5 w-1/3" />
            <div className="hidden flex-col gap-0.5 sm:flex">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-12" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
