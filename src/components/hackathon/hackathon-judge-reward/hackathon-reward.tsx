import { TEXT_EDITOR_TYPE } from '@/constants/enum'
import type { HackathonRewards } from '@/graphql/generated/hooks'
import { separationNumber } from '@/lib/utils'
import type React from 'react'

interface HackathonRewardProp {
  reward: HackathonRewards
}

const HackathonReward: React.FC<HackathonRewardProp> = ({ reward }) => {
  if (!reward) return null
  return (
    <div className="flex flex-col gap-4 sm:gap-8">
      <p className="title-3 text-neutral-800">{reward.name}</p>
      <div className="body-m items-stretch rounded-2xl border-[2px] border-neutral-200 p-8 text-neutral-500 sm:flex">
        <div className="min-w-[11.875rem] pr-5 text-center">
          <p className="title-1 mb-3 text-neutral-800">{`${separationNumber(reward?.totalRewards || 0)} ${reward.currency}`}</p>
          <p>{reward.name}</p>
        </div>
        {reward.mode === 'RANK' ? (
          <div className="mt-5 flex flex-col gap-3 border-neutral-200 border-t pt-5 sm:mt-0 sm:flex-1 sm:justify-center sm:border-t-0 sm:border-l sm:pt-0 sm:pl-5">
            {reward?.rewards?.map((v: any) => (
              <div className="flex items-center justify-between" key={v.id}>
                <span>{v.label}</span>
                <span className="headline-m text-neutral-800">{`${separationNumber(v.value || 0)} ${reward.currency}`}</span>
              </div>
            ))}
          </div>
        ) : reward?.rule?.type === TEXT_EDITOR_TYPE ? (
          <div
            className="body-m mt-5 flex flex-col gap-3 border-neutral-200 border-t pt-5 text-neutral-800 sm:mt-0 sm:flex-1 sm:justify-center sm:border-t-0 sm:border-l sm:pt-0 sm:pl-5"
            dangerouslySetInnerHTML={{ __html: reward?.rule?.content }}
          />
        ) : (
          <div
            className="body-m prose mt-5 whitespace-pre-line text-neutral-800 sm:mt-0 sm:flex-1 sm:justify-center sm:border-t-0 sm:border-l sm:pt-0 sm:pl-5"
            dangerouslySetInnerHTML={{ __html: reward?.rule }}
          />
        )}
      </div>
    </div>
  )
}

export default HackathonReward
