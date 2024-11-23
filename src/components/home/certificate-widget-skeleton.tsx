import { AspectRatio } from '@hackquest/ui/shared/aspect-ratio'
import { Skeleton } from '@hackquest/ui/shared/skeleton'

export function CertificateWidgetSkeleton() {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="w-full space-y-2">
          <Skeleton className="h-4 w-1/3 rounded" />
          <Skeleton className="h-3 w-1/2 rounded" />
        </div>
      </div>
      <AspectRatio ratio={16 / 9}>
        <Skeleton className="h-full w-full rounded-lg" />
      </AspectRatio>
      <Skeleton className="mt-4 h-4 w-full rounded" />
    </div>
  )
}
