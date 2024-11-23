'use client'
import HackathonCard from '@/components/hackathon/hackathon-card'
import {
  type HackathonExtend,
  useFindOrganizerHackathonIncrecementInfoQuery,
} from '@/graphql/generated/hooks'
import dayjs from '@/lib/dayjs'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { BsExclamationCircle } from 'react-icons/bs'
import { useOrganizerStore } from '../utils/store'
import StatsCard from './stats-card'

const Overview = () => {
  const t = useTranslations('HackathonOrganizer.manage')

  const { id }: { id: string } = useParams()

  const { hackathon } = useOrganizerStore()

  const { data } = useSuspenseQuery({
    queryKey: useFindOrganizerHackathonIncrecementInfoQuery.getKey({ id }),
    queryFn: useFindOrganizerHackathonIncrecementInfoQuery.fetcher({ id }),
  })
  const d = data.findOrganizerHackathonIncrecementInfo

  const renderStatsList = () => {
    const isPublishedWinner = hackathon?.judge?.some(
      item => item.announce === true,
    )
    if (
      dayjs().tz().isAfter(hackathon?.timeline?.rewardTime) &&
      isPublishedWinner
    ) {
      return (
        <div className="flex gap-5 ">
          <StatsCard
            type="pageView"
            num={d?.pageView ?? 0}
            subNum={d?.todayPageView + ' ' + t('views')}
          />

          <StatsCard
            type="confirmation"
            num={d?.confirmation ?? 0}
            subNum={d?.todayConfirmation + ' ' + t('confirmations')}
          />

          <StatsCard
            type="submission"
            num={d?.submission ?? 0}
            subNum={d?.todaySubmission + ' ' + t('views')}
          />
          <StatsCard type="winner" num={d?.winner ?? 0} />
        </div>
      )
    }
    if (dayjs().tz().isAfter(hackathon?.timeline?.rewardTime)) {
      return (
        <div className="flex gap-5 ">
          <StatsCard
            type="pageView"
            num={d?.pageView ?? 0}
            subNum={d?.todayPageView + ' ' + t('views')}
          />
          <StatsCard
            type="application"
            num={d?.application ?? 0}
            subNum={d?.todayApplication + ' ' + t('applications')}
          />
          <StatsCard
            type="submission"
            num={d?.submission ?? 0}
            subNum={d?.todaySubmission + ' ' + t('submissions')}
          />
          <StatsCard
            type="winner"
            subNum={
              <div className="flex items-center gap-1">
                <BsExclamationCircle />
                {t('notAnnounced')}
              </div>
            }
          />
        </div>
      )
    }
    if (
      dayjs().tz().isAfter(hackathon?.timeline?.submissionClose) &&
      dayjs().tz().isBefore(hackathon?.timeline?.rewardTime)
    ) {
      return (
        <div className="flex gap-5 ">
          <StatsCard
            type="pageView"
            num={d?.pageView ?? 0}
            subNum={d?.todayPageView + ' ' + t('views')}
          />
          <StatsCard
            type="application"
            num={d?.application ?? 0}
            subNum={d?.todayApplication + ' ' + t('applications')}
          />
          <StatsCard
            type="submission"
            num={d?.submission ?? 0}
            subNum={d?.todaySubmission + ' ' + t('submissions')}
          />
          <StatsCard
            type="voting"
            countdown={hackathon?.timeline?.rewardTime}
          />
        </div>
      )
    } else {
      return (
        <div className="flex gap-5 ">
          <StatsCard
            type="pageView"
            num={d?.pageView ?? 0}
            subNum={d?.todayPageView + ' ' + t('views')}
          />
          <StatsCard
            type="application"
            num={d?.application ?? 0}
            subNum={d?.todayApplication + ' ' + t('applications')}
          />
          <StatsCard
            type="confirmation"
            num={d?.confirmation ?? 0}
            subNum={d?.todayConfirmation + ' ' + t('confirmations')}
          />
          <StatsCard
            type="submission"
            num={d?.submission ?? 0}
            subNum={d?.todaySubmission + ' ' + t('submissions')}
          />
        </div>
      )
    }
  }

  return (
    <div>
      <div className="mt-8 mb-12">
        <HackathonCard hackathonInfo={hackathon as HackathonExtend} />
      </div>
      <div className="space-y-6 ">
        <div className="title-3 text-neutral-black">{t('hackathonStats')}</div>
        {renderStatsList()}
      </div>
    </div>
  )
}

export default Overview
