'use client'
import {
  type HackathonJudgeExtend,
  type ProjectInfo,
  QueryMode,
  useFindHackathonWinnerQuery,
  useListOrganizerJudgeProjectQuery,
  useListOrganizerJudgeQuery,
} from '@/graphql/generated/hooks'
import dayjs from '@/lib/dayjs'
import { Button } from '@hackquest/ui/shared/button'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import type { Winner } from '../../constant'
import SearchZone from '../search-zone'
import CustomWinner from './custom-winner'
import JudgingTable from './judging-table'
import JudingTabs from './judging-tabs'
import OtherWinners from './other-winners'
import TrackCard from './track-card'
import WinnerList from './winner-list'

const Judging = ({ id }: { id: string }) => {
  const query = useSearchParams()
  const t = useTranslations('HackathonOrganizer.manage')
  const track = query.get('track')

  const { data } = useSuspenseQuery({
    queryKey: useListOrganizerJudgeQuery.getKey({
      where: {
        hackathonId: {
          equals: id,
        },
      },
    }),
    queryFn: useListOrganizerJudgeQuery.fetcher({
      where: {
        hackathonId: {
          equals: id,
        },
      },
    }),
    staleTime: 0,
  })

  const d = data.listOrganizerJudge?.data ?? []

  const tabList = d
    ? d.map(obj => {
        return obj.rewardName
      })
    : []
  const j = d?.find(obj => obj.rewardName === track)
  const judge = track ? j : d[0]

  const { data: li } = useSuspenseQuery({
    queryKey: useListOrganizerJudgeProjectQuery.getKey({
      where: {
        hackathonId: {
          equals: id,
        },
        prizeTrack: {
          contains: track || tabList[0],
          mode: QueryMode.Insensitive,
        },
      },
    }),
    queryFn: useListOrganizerJudgeProjectQuery.fetcher({
      where: {
        hackathonId: {
          equals: id,
        },
        prizeTrack: {
          contains: track || tabList[0],
          mode: QueryMode.Insensitive,
        },
      },
    }),
  })

  const { data: winners } = useSuspenseQuery({
    queryKey: useFindHackathonWinnerQuery.getKey({
      id,
      prizeTrack: track || tabList[0] || '',
    }),
    queryFn: useFindHackathonWinnerQuery.fetcher({
      id,
      prizeTrack: track || tabList[0] || '',
    }),
    staleTime: 0,
  })
  const hackathonWinner = winners.findHackathonWinner as Winner[]
  const ortherWinners = hackathonWinner.filter(obj => {
    return obj.type === 'orther'
  })
  const baseWinners = hackathonWinner.filter(obj => {
    return obj.type === 'base'
  })

  const RewardList = li.listOrganizerJudgeProject?.projects

  const isAfterVoting = dayjs().isAfter(judge?.hackathon.timeline?.rewardTime)
  const isVoting = dayjs().isAfter(judge?.hackathon.timeline?.submissionClose)

  const [rewardNum, setRewardNum] = useState<number>(baseWinners.length) //表示当前添加的自定义的ranking-based winners的项目在项目列表（按名次排序）中的下标

  const [customRewards, setCustonRewards] = useState<ProjectInfo[]>([]) //添加的自定义ranking-based winners的project数组

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setCustonRewards([])
    setRewardNum(baseWinners.length)
  }, [track])
  return (
    <div className="">
      <JudingTabs isVoting={isVoting} tabList={tabList} />

      {isAfterVoting ? (
        <div>
          <div className="space-y-4">
            <WinnerList
              id={id}
              announce={judge!.announce}
              judgeId={judge!.id.toString()}
              defaultTrack={tabList[0] ?? ''}
              hackathonWinner={baseWinners}
            />
            {customRewards.map(custom => {
              return (
                <CustomWinner
                  customRewards={customRewards}
                  setCustomRewards={setCustonRewards}
                  key={custom.id}
                  data={custom as ProjectInfo}
                  rewardId={li.listOrganizerJudgeProject?.reward?.id!}
                />
              )
            })}
            {!judge?.announce && (
              <div className="flex w-full gap-6">
                <Button
                  className="flex-1"
                  onClick={e => {
                    e.stopPropagation()

                    if (RewardList![rewardNum]) {
                      setCustonRewards([
                        ...customRewards,
                        RewardList![rewardNum] as ProjectInfo,
                      ])
                      setRewardNum(prev => prev + 1)
                    } else {
                      toast.error('no more project')
                    }
                  }}
                >
                  {t('addWinners')}
                </Button>
                <Button
                  color="neutral"
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    customRewards.pop()
                    setCustonRewards([...customRewards])

                    setRewardNum(prev =>
                      prev > hackathonWinner.length
                        ? prev - 1
                        : hackathonWinner.length,
                    )
                  }}
                >
                  {t('reduceWinners')}
                </Button>
              </div>
            )}
          </div>

          <OtherWinners
            defaultTrack={tabList[0] ?? ''}
            announce={judge!.announce}
            rewardId={li.listOrganizerJudgeProject?.reward?.id!}
            hackathonWinner={ortherWinners}
          />
        </div>
      ) : (
        <TrackCard judge={judge as HackathonJudgeExtend} />
      )}

      {!isAfterVoting && (
        <div>
          <SearchZone className="py-6" />
          <JudgingTable
            isOnlyJudge={judge?.judgeMode !== 'all'}
            defaultTrack={tabList[0] ?? ''}
          />
        </div>
      )}
    </div>
  )
}

export default Judging
