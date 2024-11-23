import {
  type HackathonExtend,
  HackathonJoinState,
} from '@/graphql/generated/hooks'
import dayjs from '@/lib/dayjs'
import { useUser } from '@/store/user'

export enum StepEnum {
  UN_OPEN = 'Un Open',
  REGISTRATION = 'Registration',
  PENDING = 'Submission Pending',
  SUBMISSION = 'Submission',
  VOTING = 'Voting',
  PAST = 'End',
}

export enum VotingTime {
  BEFORE = 'before',
  ON = 'on',
  AFTER = 'after',
}

const useDealHackathon = () => {
  const _currentUser = useUser()

  const getTotalPrize = (hackathon: HackathonExtend) => {
    const total = hackathon?.rewards?.reduce((pre, next) => {
      return pre + Number(next.totalRewards)
    }, 0)
    return total || 0
  }

  const getDeadline = (hackathon: HackathonExtend) => {
    const currentStatus = hackathon.currentStatus
    if (
      [HackathonJoinState.RegisterNotOpen, HackathonJoinState.Register].some(
        v => currentStatus?.includes(v),
      )
    ) {
      return {
        step: StepEnum.REGISTRATION,
        timeDiff: dayjs(dayjs.utc(hackathon.timeline?.registrationClose)).diff(
          dayjs(),
          'day',
        ),
      }
    }
    if ([HackathonJoinState.Submit].some(v => currentStatus?.includes(v))) {
      return {
        step: StepEnum.SUBMISSION,
        timeDiff: dayjs(dayjs.utc(hackathon.timeline?.submissionClose)).diff(
          dayjs(),
          'day',
        ),
      }
    }
    if (currentStatus?.includes(HackathonJoinState.Voting)) {
      return {
        step: StepEnum.VOTING,
        timeDiff: dayjs(dayjs.utc(hackathon.timeline?.rewardTime)).diff(
          dayjs(),
          'day',
        ),
      }
    }
    return {
      step: StepEnum.PAST,
    }
  }

  const getVotingTime = (hackathon: HackathonExtend) => {
    const currentStatus = hackathon.currentStatus
    if (currentStatus?.includes(HackathonJoinState.Voting)) return VotingTime.ON
    if (currentStatus?.includes(HackathonJoinState.VotingClose))
      return VotingTime.AFTER
    return VotingTime.BEFORE
  }

  return {
    getTotalPrize,
    getDeadline,
    getVotingTime,
  }
}

export default useDealHackathon
