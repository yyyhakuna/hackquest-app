export default function Loading() {
  return (
    <div className="-mt-8 h-full w-full space-y-8">
      <div className="h-28 w-full animate-pulse bg-neutral-200 sm:h-52" />
      <div className="space-y-8 sm:container max-sm:px-6">
        <div className="-mt-4 relative">
          <div className="sm:-top-24 -top-14 absolute left-0 size-20 rounded-full border-2 border-neutral-white bg-neutral-white sm:size-40 sm:border-4">
            <div className="group size-full animate-pulse rounded-full bg-neutral-200" />
          </div>
          <div className="flex items-start justify-between max-sm:relative sm:ml-[184px]">
            <div className="space-y-4 max-sm:mt-10">
              <div className="h-8 w-32 animate-pulse rounded bg-neutral-200" />
              <div className="h-6 w-64 animate-pulse rounded bg-neutral-200" />
              <div className="h-6 w-40 animate-pulse rounded bg-neutral-200" />
              <div className="h-6 w-28 animate-pulse rounded bg-neutral-200" />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3 py-6 sm:container max-sm:px-6">
        <div className="h-5 w-28 animate-pulse rounded bg-neutral-200" />
        <div className="h-5 w-40 animate-pulse rounded bg-neutral-200" />
        <div className="h-5 w-64 animate-pulse rounded bg-neutral-200" />
        <div className="h-12 w-1/2 animate-pulse rounded bg-neutral-200" />
      </div>
    </div>
  )
}
