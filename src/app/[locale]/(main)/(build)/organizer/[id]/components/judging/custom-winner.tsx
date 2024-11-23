import {
  type FixedVote,
  type ProjectInfo,
  type ScoreVote,
  useCreateHackathonWinnerMutation,
} from '@/graphql/generated/hooks'
import { Dialog, DialogTrigger } from '@hackquest/ui/shared/dialog'
import { type Dispatch, type SetStateAction, Suspense, useState } from 'react'
import toast from 'react-hot-toast'
import { BsArrowRight } from 'react-icons/bs'
import ProjectDetail from './project-detail'

const CustomWinner = ({
  data,
  rewardId,
  customRewards,
  setCustomRewards,
}: {
  data: ProjectInfo
  rewardId: number
  setCustomRewards: Dispatch<SetStateAction<ProjectInfo[]>>
  customRewards: ProjectInfo[]
}) => {
  const { mutateAsync, isPending } = useCreateHackathonWinnerMutation({
    onSuccess: () => {
      const newCustomReward = customRewards.filter(obj => obj.id !== data.id)
      setCustomRewards(newCustomReward)
    },
  })
  const [inputValue, setInputValue] = useState('')

  const getVotes = () => {
    if (data.fixOrSocreVote?.__typename === 'FixedVote') {
      return (data.fixOrSocreVote as FixedVote).totalVotes
    }
    if (data.fixOrSocreVote?.__typename === 'ScoreVote') {
      return (data.fixOrSocreVote as ScoreVote).finalScore
    }
  }
  const leader =
    data?.team?.members?.find(obj => obj.memberType === 'Leader')?.nickname ??
    ''
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex cursor-pointer items-center justify-between rounded-xl border-2 border-neutral-200 p-3 transition-colors duration-300 hover:bg-neutral-100">
          <div className="flex items-center gap-5">
            <input
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={event => {
                if (event.key === 'Enter' && !isPending) {
                  if (!inputValue) {
                    toast.error('Reward Name cannot be null')
                    return
                  }
                  toast.promise(
                    mutateAsync({
                      data: {
                        projectId: data.id,
                        name: inputValue,
                        hackathonId: data.hackathonId!,
                        rewardId,
                        type: 'base',
                      },
                    }),
                    {
                      loading: 'Updating',
                      success: 'Update Success',
                      error: 'Failed to Update',
                    },
                  )
                }
              }}
              onClick={e => e.stopPropagation()}
              className="headline-s h-[46px] w-[240px] rounded-lg border border-neutral-400 text-primary-neutral focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
            <img
              src={data?.logo ?? ''}
              alt=""
              className="h-10 w-10 rounded-md"
            />
            <div className="title-3 w-[150px] truncate text-primary-neutral">
              {data.name}
            </div>
            <span className="body-m text-secondary-neutral">{leader}</span>
            <span className="body-m text-secondary-neutral">|</span>
            <span className="body-m text-secondary-neutral">
              Rank {data.fixOrSocreVote?.rank}
            </span>
            <span className="body-m text-secondary-neutral">|</span>
            <span className="body-m text-secondary-neutral">
              Votes {getVotes()}
            </span>
          </div>
          <BsArrowRight />
        </div>
      </DialogTrigger>
      <Suspense>
        <ProjectDetail id={data.id} />
      </Suspense>
    </Dialog>
  )
}

export default CustomWinner
