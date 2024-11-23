import type { GetAllHackathonInfoQuery } from '@/graphql/generated/hooks'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useCallback, useMemo } from 'react'

type HackathonInfoQueryNotNull = Exclude<
  GetAllHackathonInfoQuery['listHackathons']['data'],
  null | undefined
>

export type HackathonInfoType = HackathonInfoQueryNotNull[number]

const useHackathonInfo = (hackathonInfo: HackathonInfoType) => {
  const totalRewards = hackathonInfo?.rewards?.map(item => item.totalRewards)

  const computedDays = useCallback((utcTime: string) => {
    dayjs.extend(utc)
    dayjs.extend(timezone)
    const givenTime = dayjs.utc(utcTime)
    const currentTime = dayjs()
    const days = givenTime.diff(currentTime, 'day')
    return days > 0 ? days : 0
  }, [])

  const getTotalPrize = useCallback((rewards: Array<number>) => {
    const total = rewards?.reduce((pre, next) => {
      return pre + Number(next)
    }, 0)
    return total || 0
  }, [])

  const isAfter = useCallback((time: string) => {
    return dayjs().isAfter(time)
  }, [])

  const tagList = useMemo(() => {
    const tags: Array<{
      label: string
      color: string
    }> = []
    // hackathon状态 Live End Voting
    const timeline = hackathonInfo?.timeline

    const voting =
      dayjs().isAfter(timeline?.submissionClose) &&
      dayjs().isBefore(timeline?.rewardTime)
    if (voting) {
      tags.push({
        label: 'Voting',
        color: 'bg-tag-green',
      })
    }

    const live = dayjs().isBefore(timeline?.submissionClose)
    const leftDays = computedDays(timeline?.submissionClose)
    if (live) {
      const pushArr = [
        {
          label: 'Live',
          color: 'bg-success-100',
        },
        {
          label: `${leftDays} days left`,
          color: 'bg-blue-100',
        },
      ]
      tags.push(...pushArr)
    }

    const end = dayjs().isAfter(timeline?.rewardTime)
    if (end) {
      tags.push({
        label: 'Ended',
        color: 'bg-destructive-100',
      })
    }

    if (hackathonInfo?.info?.levelTag) {
      tags.push({
        label: 'For newbie',
        color: 'bg-tag-red ',
      })
    }

    return tags
  }, [hackathonInfo, computedDays])

  return {
    totalRewards,
    computedDays,
    getTotalPrize,
    isAfter,
    tagList,
  }
}

export default useHackathonInfo
