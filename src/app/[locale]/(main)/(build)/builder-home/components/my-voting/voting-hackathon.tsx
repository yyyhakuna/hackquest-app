import type {
  FindHackathonJudgeDetailByUserQuery,
  HackathonExtend,
  HackathonJudgeUpdate,
} from '@/graphql/generated/hooks'
import useDealHackathon, { VotingTime } from '@/hooks/use-deal-hackathon'
import { Button } from '@hackquest/ui/shared/button'
import { Tag } from '@hackquest/ui/shared/tag'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import type React from 'react'
import { useMemo } from 'react'

type HackathonJudgeDetail =
  FindHackathonJudgeDetailByUserQuery['findHackathonJudgeDetailByUser']
type VotingHackathonProp = {
  hackathon: HackathonJudgeDetail
  confirmVote: VoidFunction
  loading: boolean
  maxVote: number
}

const VotingHackathon: React.FC<VotingHackathonProp> = ({
  hackathon,
  confirmVote,
  loading,
  maxVote,
}) => {
  const _t = useTranslations()
  const { getDeadline, getVotingTime } = useDealHackathon()
  const deadline = getDeadline(hackathon as unknown as HackathonExtend)
  const votingTime = getVotingTime(hackathon as HackathonExtend)
  const modeInfo = useMemo(() => {
    const judge = hackathon?.judge as HackathonJudgeUpdate
    const isFixed = judge?.voteMode === 'fixed'
    const btnText =
      votingTime === VotingTime.BEFORE
        ? 'Waiting for Voting'
        : votingTime === VotingTime.AFTER
          ? 'Voting End'
          : false
    return {
      voteText: isFixed ? 'Remaining Votes' : 'Highest Score',
      buttonText: btnText
        ? btnText
        : isFixed
          ? 'Confirm Vote'
          : 'Confirm Score',
      tips: isFixed
        ? '*You are judge you can vote all your Vote'
        : '*You can only see the scores you have scored',
    }
  }, [hackathon, votingTime])
  return (
    <div className="flex w-full gap-4 rounded-[.75rem] max-sm:flex-col max-sm:border max-sm:border-neutral-200 max-sm:p-4 sm:items-stretch">
      <div className="flex-shrink-0 items-center gap-8 rounded-[.75rem] border border-neutral-200 bg-neutral-white p-6 sm:flex sm:flex-1">
        <div className="flex-shrink-0 sm:flex-1">
          <div className="w-full">
            <h2 className="title-3 !text-[1.5rem] line-clamp-1 flex-1 flex-shrink-0 text-neutral-800">
              {hackathon?.name}
            </h2>
            <p className="body-s mt-3 line-clamp-3 text-neutral-500 sm:line-clamp-2 sm:h-[2.625rem]">
              {hackathon?.info?.intro}
            </p>
            <div className="mt-6 flex gap-2">
              <Tag className="headline-s bg-primary-100">{deadline.step}</Tag>
              <Tag className="headline-s bg-blue-100">
                {deadline.timeDiff} days left
              </Tag>
            </div>
          </div>
        </div>
        <div className="max-sm:hidden sm:w-[20.1875rem]">
          <div className="relative h-0 w-full overflow-hidden rounded-[.75rem] pt-[56%]">
            <Image
              src={hackathon?.info?.image || ''}
              alt={hackathon?.name || ''}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <div className="body-s flex w-full flex-shrink-0 flex-col items-center rounded-[.75rem] border border-neutral-200 bg-neutral-white px-6 py-[1.125rem] text-neutral-500 sm:w-[18.75rem]">
        <div>
          Vote Track:{' '}
          <span className="headline-s">{hackathon?.judge?.rewardName}</span>
        </div>
        <p className="title-3 mt-[.375rem] text-neutral-800 sm:mt-[1.75rem]">
          {maxVote}
        </p>
        <p className="mt-[.375rem]">{modeInfo.voteText}</p>
        <Button
          className="my-[.375rem] w-full sm:my-3"
          onClick={confirmVote}
          loading={loading}
          disabled={votingTime !== VotingTime.ON}
        >
          {modeInfo.buttonText}
        </Button>
        <p className="body-xs text-neutral-400">{modeInfo.tips}</p>
      </div>
    </div>
  )
}

export default VotingHackathon
