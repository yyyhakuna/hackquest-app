import { TEXT_EDITOR_TYPE } from '@/constants/enum'
import type { HackathonJudgeUpdate } from '@/graphql/generated/hooks'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@hackquest/ui/shared/avatar'
import type React from 'react'
import { useMemo } from 'react'
import { judgeModeLabel, voteModeLabel } from './constants/data'

interface HackathonJudgeProp {
  judge: HackathonJudgeUpdate
}

const HackathonJudge: React.FC<HackathonJudgeProp> = ({ judge }) => {
  const renderCriteria = useMemo(() => {
    return judge?.criteria?.type === TEXT_EDITOR_TYPE ? (
      <div
        className="mt-1 text-neutral-500"
        dangerouslySetInnerHTML={{
          __html: judge?.criteria?.content,
        }}
      />
    ) : (
      <div
        className="prose mt-1 text-neutral-500"
        dangerouslySetInnerHTML={{ __html: judge?.criteria }}
      />
    )
  }, [judge])

  return (
    <div className="body-m flex flex-col gap-5 rounded-2xl border-[2px] border-neutral-200 p-5 text-neutral-400">
      <p className="headline-l text-neutral-800">{judge.rewardName}</p>
      {judge?.disableJudge ? (
        <div>
          <p>Judging Criteria</p>
          {renderCriteria}
        </div>
      ) : (
        <>
          <div>
            <p>Judging Criteria</p>
            {renderCriteria}
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-[1.25rem_5rem]">
            <div>
              <p>Judging Mode</p>
              <div className="mt-1 text-neutral-800">
                {judgeModeLabel[
                  judge.judgeMode as keyof typeof judgeModeLabel
                ] || ''}
              </div>
            </div>
            <div>
              <p>Voting Mode</p>
              <div className="mt-1 text-neutral-800">
                {voteModeLabel[judge.voteMode as keyof typeof voteModeLabel] ||
                  ''}
              </div>
            </div>
            {judge?.judgeTotalVote! > 0 && (
              <div>
                <p>Each Judge’s Votes</p>
                <div className="mt-1 text-neutral-800">
                  {judge.judgeTotalVote}
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-[1.25rem_5rem]">
            {judge?.judgeProjectVote! > 0 && (
              <div>
                <p>MAX Votes Per Project Per User/Judge</p>
                <div className="mt-1 text-neutral-800">
                  {judge.judgeProjectVote}
                </div>
              </div>
            )}
            {judge?.votesProportion?.[0]! > 0 && (
              <div>
                <p>Total User Votes</p>
                <p className="mt-1 text-neutral-800">{`${judge?.votesProportion?.[0] ?? 0}%`}</p>
              </div>
            )}
            {judge?.votesProportion?.[1]! > 0 && (
              <div>
                <p>Total Judge Votes</p>
                <p className="mt-1 text-neutral-800">{`${judge?.votesProportion?.[1] ?? 0}%`}</p>
              </div>
            )}

            {judge.projectJudgeCount! > 0 && (
              <div>
                <p>Judges Needed for Each Project</p>
                <p className="mt-1 text-neutral-800">
                  {judge.projectJudgeCount}
                </p>
              </div>
            )}
          </div>
          {judge?.judgeAccounts?.length! > 0 && (
            <div>
              <p>Judging Accounts</p>
              <div className="mt-6 flex-wrap sm:flex sm:gap-[1.25rem_5rem]">
                {judge?.judgeAccounts?.map(v => (
                  <div
                    className="mt-3 flex items-center gap-3 text-neutral-800 sm:mt-0"
                    key={v.id}
                  >
                    <Avatar className="h-[3.125rem] w-[3.125rem] overflow-hidden rounded-[50%] border-neutral-white">
                      <AvatarImage
                        src={v.avatar || ''}
                        alt={v.nickname || ''}
                      />
                      <AvatarFallback>
                        {v.nickname?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span>{v.nickname}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default HackathonJudge
