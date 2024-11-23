'use client'
import type {
  HackathonJudgeExtend,
} from '@/graphql/generated/hooks'
import { cn } from '@hackquest/ui/lib/utils'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

const TrackCard = ({ judge }: { judge: HackathonJudgeExtend }) => {
  const params = useParams()
  const _id = params.id

  const _t = useTranslations('HackathonOrganizer.manage')
  const [visible, setVisible] = useState(false)

  return (
    <>
      <div className="mt-6 space-y-4 rounded-2xl border-2 border-neutral-200 p-6">
        <button
          className="flex w-full items-center justify-between"
          onClick={() => {
            setVisible(!visible)
          }}
        >
          <span className="headline-l text-primary-neutral">
            {judge.rewardName}
          </span>
          {visible ? <FaAngleUp /> : <FaAngleDown />}
        </button>
        <div className={cn(visible ? '' : 'hidden', 'space-y-4')}>
          <div>
            <div className="body-m text-neutral-400">Judging Criteria</div>
            <div
              className="body-m text-secondary-neutral"
              dangerouslySetInnerHTML={{
                __html: judge.criteria,
              }}
            />
          </div>
          <div className="flex gap-20">
            <div className="space-y-1">
              <div className="body-m text-neutral-400">judging Mode</div>
              <div className="body-m text-primary-neutral">
                {judge.judgeMode === 'all' ? 'Users + Judges' : 'Judges'}
              </div>
            </div>
            <div className="space-y-1">
              <div className="body-m text-neutral-400">Voting Mode</div>
              <div className="body-m text-primary-neutral">
                {judge.voteMode === 'fixed' ? 'Fixed Votes' : 'Project Scoring'}
              </div>
            </div>
            <div className="space-y-1">
              <div className="body-m text-neutral-400">Total User Votes</div>
              <div className="body-m text-primary-neutral">
                {judge.userTotalVotes}
              </div>
            </div>
            <div className="space-y-1">
              <div className="body-m text-neutral-400">Total Judge Votes</div>
              <div className="body-m text-primary-neutral">
                {judge.judgeTotalVote}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <span className="body-m text-neutral-400">Judging Accounts</span>
            <div className="flex gap-10">
              {judge.judgeAccountInfo?.map(obj => (
                <div className="flex items-center gap-3" key={obj.avatar}>
                  <img
                    src={obj.avatar ?? ''}
                    alt=""
                    className="h-[50px] w-[50px] rounded-full"
                  />
                  <span className="body-m text-primary-neutral">
                    {obj.nickname}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TrackCard
