'use client'
import HackathonVote from '@/components/hackathon/hackthon-vote'
import {
  type ProjectVotingReward,
  useProjectVoteMutation,
} from '@/graphql/generated/hooks'
import { useProjectQuery } from '@/hooks/project/query'
import { Button } from '@hackquest/ui/shared/button'
import Image from 'next/image'
import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

interface NewProjectVotingReward extends ProjectVotingReward {
  curMyVotes?: number
}

const ProjectVote: React.FC = () => {
  const { data } = useProjectQuery()

  const [rewards, setRewards] = useState<NewProjectVotingReward[]>([])
  const voteRewardId = useRef<number>()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const modeInfo = useCallback(
    (reward: NewProjectVotingReward) => {
      const isFixed = reward?.voteMode === 'fixed'
      const remainingVotes = Math.floor(reward.remainingVotes || 0)
      return {
        modeText: isFixed ? 'Fixed Number of Vote' : 'Project Scoring',
        voteText: isFixed ? 'Remaining Votes' : 'Highest Score',
        buttonText: isFixed ? 'Confirm Vote' : 'Confirm Score',
        tips: isFixed
          ? '*You are judge you can vote all your Vote'
          : '*You can only see the scores you have scored',
        remainingVotes: isFixed
          ? remainingVotes + (reward.myVotes || 0) - (reward.curMyVotes || 0)
          : remainingVotes,
        maxVotes: isFixed
          ? remainingVotes + (reward.myVotes || 0)
          : remainingVotes || 0,
      }
    },
    [rewards],
  )

  const { mutate: onSubmitVote, isPending: loading } = useProjectVoteMutation({
    meta: {
      invalidates: [['FindUniqueProject']],
    },
    onSuccess: () => {
      toast.success('Success')
    },
    onError: (error: string) => {
      toast.error(error)
    },
  })

  const onChange = (vote: number, index: number) => {
    const newRewards = structuredClone(rewards)
    const reward = newRewards?.[index] as NewProjectVotingReward
    reward.curMyVotes = vote
    setRewards(newRewards)
  }

  useEffect(() => {
    const projectRewards = (data?.rewards || [])
      .filter(v => v.canVote)
      .map(reward => ({
        ...reward,
        curMyVotes: reward.myVotes || 0,
      }))
    setRewards(projectRewards)
  }, [data])
  if (!rewards?.some(v => v.canVote)) return
  return (
    <div className="flex flex-col gap-4 pt-1 pb-8 sm:container max-sm:px-6">
      {rewards?.map((reward, i) => (
        <div
          key={reward.id}
          className="flex gap-4 rounded-[.75rem] border-[2px] border-neutral-200 bg-neutral-50 p-[1.125rem] max-sm:flex-col sm:h-[15rem]"
        >
          <div className="flex flex-shrink-0 flex-col rounded-[.75rem] border-[2px] border-neutral-200 bg-neutral-white p-6 max-sm:w-full max-sm:gap-3 sm:h-full sm:flex-1 sm:justify-between">
            <p className="title-3 text-[1.5rem] text-neutral-800">
              {reward.hackathonName}
            </p>
            <div className="body-s text-neutral-500">
              <span>Voting Mode：</span>
              <span className="text-neutral-800">
                {modeInfo(reward).modeText}
              </span>
            </div>
            <p className="headline-s text-neutral-500">Total Voting:</p>
            <HackathonVote
              value={reward.curMyVotes || 0}
              initValue={reward.myVotes || 0}
              maxValue={modeInfo(reward).maxVotes}
              onChange={vote => onChange(vote, i)}
            />
          </div>
          <div className="flex flex-col items-center rounded-[.75rem] border-[2px] border-neutral-200 px-6 py-4 text-neutral-500 max-sm:gap-[.375rem] sm:h-full sm:w-[17.5rem] sm:justify-between">
            <div className="body-xs">
              Vote Track：
              <span className="headline-xs">{reward.name}</span>
            </div>
            <div className="title-3 text-neutral-800">
              {modeInfo(reward).remainingVotes}
            </div>
            <div className="body-s">{modeInfo(reward).voteText}</div>
            <Button
              className="w-full"
              size={'small'}
              loading={loading && reward.id === voteRewardId.current}
              onClick={() => {
                voteRewardId.current = reward.id!
                onSubmitVote({
                  rewardId: reward.id!,
                  data: { vote: reward.curMyVotes!, projectId: data?.id! },
                })
              }}
            >
              {modeInfo(reward).buttonText}
            </Button>
            <p className="body-xs text-left text-neutral-400">
              {modeInfo(reward).tips}
            </p>
          </div>
          <div className="w-full overflow-hidden rounded-[.75rem] max-sm:hidden sm:w-[22.375rem]">
            <div className="relative h-0 w-full pt-[56.7%] ">
              <Image
                src={reward.hackathonImage || ''}
                alt={reward.name || ''}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProjectVote
