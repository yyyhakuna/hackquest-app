'use client'
import BaseCard from './base-card'

import { ModeEnum, useFindListTemplateQuery } from '@/graphql/generated/hooks'
import { useSuspenseQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useParams } from 'next/navigation'
import { useOrganizerStore } from '../../utils/store'
import RewardCard from './Reward-card'
import JudgingCard from './judging-card'
import RegistrationCard from './registration-card'
import SubmissionCard from './submission-card'
const ReceiverList = () => {
  const params = useParams()

  const { hackathon } = useOrganizerStore()
  const mode =
    hackathon?.info?.mode === 'HYBRID' ? ModeEnum.Hybrid : ModeEnum.Online
  const { data } = useSuspenseQuery({
    queryKey: useFindListTemplateQuery.getKey({
      id: params.id as string,
      mode,
    }),
    queryFn: useFindListTemplateQuery.fetcher({
      id: params.id as string,
      mode,
    }),
    staleTime: 0,
  })

  const templates = data.findListTemplate
  const submissionClose = templates?.timeline?.submissionClose
  const rewardTime = templates?.timeline?.rewardTime

  const afterSubmission = dayjs().isAfter(submissionClose)
  const afterReward = dayjs().isAfter(rewardTime)
  return (
    <div className="mt-4 flex gap-4">
      <BaseCard
        title="Registration"
        className="flex-1"
        items={{
          Approval: afterSubmission ? 'END' : 'Admin-triggered',
          Decline: afterSubmission ? 'END' : 'Admin-triggered',
          Waitlist: afterSubmission ? 'END' : 'Admin-triggered',
        }}
        disable={templates?.registration![0]?.disable ?? false}
        tagClassName="bg-green-100 "
        CustomDialog={
          <RegistrationCard
            afterSubmission={afterSubmission}
            itemProps={
              templates?.registration?.map(r => {
                return {
                  receivers: r.receivers ?? 0,
                  template: r.template ?? '',
                  type: r.type ?? '',
                }
              }) ?? []
            }
            disable={templates?.registration![0]?.disable ?? false}
          />
        }
        isExpire={afterSubmission}
      />
      <BaseCard
        title="Submission"
        items={{
          Decline: afterSubmission ? 'END' : submissionClose,
          Submission: afterSubmission
            ? 'END'
            : templates?.timeline?.submissionOpen,
        }}
        className="flex-1"
        disable={templates?.submission![0]?.disable ?? false}
        CustomDialog={
          <SubmissionCard
            afterSubmission={afterSubmission}
            itemProps={
              templates?.submission?.map(r => {
                return {
                  receivers: r.receivers ?? 0,
                  template: r.template ?? '',
                  type: r.type ?? '',
                }
              }) ?? []
            }
          />
        }
        tagClassName="bg-neutral-100 "
        isExpire={afterSubmission}
      />
      <BaseCard
        title="Judging"
        items={{
          Start: afterSubmission ? 'END' : submissionClose,
          End: afterSubmission ? 'END' : rewardTime,
        }}
        disable={templates?.judging![0]?.disable ?? false}
        className="flex-1"
        CustomDialog={
          <JudgingCard
            afterSubmission={afterSubmission}
            itemProps={
              templates?.judging?.map(r => {
                return {
                  receivers: r.receivers ?? 0,
                  template: r.template ?? '',
                  type: r.type ?? '',
                }
              }) ?? []
            }
          />
        }
        tagClassName="bg-neutral-100 "
        isExpire={afterSubmission}
      />
      <BaseCard
        title="Reward"
        items={{
          Reward: afterReward ? 'END' : 'Admin-triggered',
          'Non-Reward': afterReward ? 'END' : 'Admin-triggered',
        }}
        disable={templates?.reward![0]?.disable ?? false}
        className="flex-1"
        CustomDialog={
          <RewardCard
            afterReward={afterReward}
            itemProps={
              templates?.reward?.map(r => {
                return {
                  receivers: r.receivers ?? 0,
                  template: r.template ?? '',
                  type: r.type ?? '',
                }
              }) ?? []
            }
          />
        }
        tagClassName="bg-green-100 "
        isExpire={dayjs().isAfter(rewardTime)}
      />
    </div>
  )
}

export default ReceiverList
