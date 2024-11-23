import { useUpdateHackathonWinnerMutation } from '@/graphql/generated/hooks'
import { cn } from '@hackquest/ui/lib/utils'
import { Button } from '@hackquest/ui/shared/button'
import { Dialog, DialogTrigger } from '@hackquest/ui/shared/dialog'
import { isEqual } from 'lodash-es'
import { Suspense } from 'react'
import toast from 'react-hot-toast'
import { BsArrowRight } from 'react-icons/bs'
import type { Winner } from '../../constant'
import ProjectDetail from './project-detail'

const WinnerCard = ({
  data,
  announce,
}: {
  data: Winner
  announce: boolean
}) => {
  const { mutateAsync } = useUpdateHackathonWinnerMutation()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-neutral-200 p-3 transition-colors duration-300 hover:bg-neutral-100">
          <div className="flex items-center gap-5">
            <Button
              variant={data.isEqual ? 'default' : 'outline'}
              color={data.isEqual ? 'destructive' : 'neutral'}
              disabled={!data.isEqual}
              onClick={e => {
                e.stopPropagation()
                if (!isEqual) return
                toast.promise(
                  mutateAsync({
                    id: data.id,
                    data: {
                      projectId: data.projectId,
                      name: data.name,
                      hackathonId: data.hackathonId,
                      rewardId: data.rewardId,
                      type: data.type,
                    },
                  }),
                  {
                    loading: 'Updating...',
                    success: 'Update Success',
                    error: 'Failed To Update',
                  },
                )
              }}
              className={cn(
                'headline-s w-[240px] rounded-lg border ',
                !data.isEqual
                  ? 'cursor-default border-neutral-400 text-neutral-400'
                  : 'bg-destructive-600 ',
                announce && 'bg-primary-100 text-primary-neutral',
              )}
            >
              {data.isEqual ? `Set This Project To ${data.name}` : data.name}
            </Button>
            <img
              src={data.project?.logo ?? ''}
              alt=""
              className="h-10 w-10 rounded-md"
            />
            <span className="title-3 w-[150px] truncate text-primary-neutral">
              {data.project.name}
            </span>
            <span className="body-m text-secondary-neutral">
              {data?.winnersInfo![0]?.nickname}
            </span>
            <span className="body-m text-secondary-neutral">|</span>
            <span className="body-m text-secondary-neutral">
              rank {data.rankAndVote?.rank}
            </span>
            <span className="body-m text-secondary-neutral">|</span>
            <span className="body-m text-secondary-neutral">
              Votes {data.rankAndVote?.totalVotes}
            </span>
          </div>
          <BsArrowRight />
        </div>
      </DialogTrigger>
      <Suspense>
        <ProjectDetail id={data.projectId} />
      </Suspense>
    </Dialog>
  )
}

export default WinnerCard
