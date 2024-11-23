'use client'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { Suspense, } from 'react'
import type { Winner } from '../../constant'
import AnnounnceButton from './announce-button'
import WinnerCard from './winner-card'

const WinnerList = ({
  id,
  defaultTrack,
  hackathonWinner,
  announce,
  judgeId,
}: {
  id: string
  defaultTrack: string
  judgeId: string
  announce: boolean
  hackathonWinner: Winner[]
}) => {
  const _query = useSearchParams()

  const rankCounts: Record<string, number> = {}
  const add = Object.values(rankCounts).reduce((prev, cur) => {
    if (cur > 1) {
      prev += cur
    }
    return prev
  }, 0)
  // const uncertainRewardIndex: Record<string, number> = {} //表示项目于unCertainReward数组中下标的对应关系

  // let certainRewardIndex: number //表示当前的reward数组的下标
  // let lastIsCertain: boolean //表示当前的项目的上一个项目是否为确定项目
  hackathonWinner.forEach(obj => {
    rankCounts[obj.name] = (rankCounts[obj.name] || 0) + 1

    // if (rankCounts[obj.name]! > 1) {
    //   if (lastIsCertain) {
    //     uncertainReward.push([obj.name])
    //     certainRewardIndex = rewards.findIndex(
    //       reward => reward.label === obj.name,
    //     )
    //     uncertainRewardIndex[obj.id] = uncertainReward.length - 1
    //   } else {
    //     certainRewardIndex++
    //     if (rewards[certainRewardIndex]) {
    //       uncertainReward[uncertainReward.length - 1]?.push(
    //         rewards[certainRewardIndex]!.label,
    //       )
    //     }
    //   }
    //   lastIsCertain = false
    // } else {
    //   lastIsCertain = true
    // }
  })
  const winners = hackathonWinner.map(obj => {
    if (rankCounts[obj.name]! > 1) {
      return { ...obj, isEqual: true }
    } else {
      return { ...obj }
    }
  })
  const t = useTranslations('HackathonOrganizer.manage')
  // const d = winners.findHackathonWinner
  return (
    <div className="space-y-4">
      {!!add && (
        <div className='flex items-center justify-center rounded-lg bg-neutral-100 py-3 text-destructive-600'>
          There are {add} projects with the same score. Please select the
          ranking of the project
        </div>
      )}
      <div className="flex items-center justify-between">
        <span className="title-3 text-primary-neutral">
          {t('rankingBasedWinners')}
        </span>
        {!announce && (
          <Suspense>
            <AnnounnceButton judgeId={judgeId} />
          </Suspense>
        )}
      </div>
      {winners.map((winner, _index) => {
        return (
          <WinnerCard
            key={winner.id}
            data={winner as Winner}
            announce={announce}
          />
        )
      })}
    </div>
  )
}

export default WinnerList
