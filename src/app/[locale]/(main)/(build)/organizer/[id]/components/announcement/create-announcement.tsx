import { Skeleton } from '@hackquest/ui/shared/skeleton'

import { Suspense } from 'react'

import type { ListHackathonAnnouncementQuery } from '@/graphql/generated/hooks'
import { Dialog, DialogTrigger } from '@hackquest/ui/shared/dialog'
import type { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { RiAddBoxLine } from 'react-icons/ri'
import CreateModal from './create-modal'

const CreateCard = ({
  refetch,
}: {
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<ListHackathonAnnouncementQuery, Error>>
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative w-[calc(25%-12px)] cursor-pointer space-y-[6px] rounded-xl border-2 border-neutral-200 p-[22px] transition-colors duration-300 hover:bg-neutral-100">
          <div className="absolute top-16 left-[calc(50%-90px)] z-50 flex flex-col items-center">
            <div className="flex h-[91px] w-[91px] items-center justify-center rounded-full bg-primary">
              <RiAddBoxLine />
            </div>
            <span className="body-m text-neutral-400">
              Create an announcement
            </span>
          </div>
          <Skeleton className="h-[21px] w-1/3" />
          <Skeleton className="h-[31px] w-full" />
          <Skeleton className="h-[119px] w-full" />
          <div className="flex gap-3">
            <Skeleton className="h-[9px] w-1/3" />
            <Skeleton className="h-[9px] w-1/3" />
          </div>
        </div>
      </DialogTrigger>
      <Suspense>
        <CreateModal refetch={refetch} />
      </Suspense>
    </Dialog>
  )
}

export default CreateCard
