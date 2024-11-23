import {
  type HackathonExtend,
  HackathonJoinState,
} from '@/graphql/generated/hooks'
import { useHackathonDetailContext } from '@/providers/hackathon/hackathon-detail-provider'
import { useAuthenticated } from '@/store/user'
import type React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { InfoType } from '../../constants/type'
import CountDown from './count-down'
import TodoList from './todo-list'

interface TimelineProp {
  hackathon: HackathonExtend
}

const Timeline: React.FC<TimelineProp> = ({ hackathon }) => {
  const isAuthenticated = useAuthenticated()
  const { setSelectedTab } = useHackathonDetailContext()
  const [mounted, setMounted] = useState(false)
  const countInfo = useMemo(() => {
    const currentStatus = hackathon?.currentStatus
    if (currentStatus?.includes(HackathonJoinState.VotingClose)) {
      return
    }
    const timeline = hackathon?.timeline
    if (
      [HackathonJoinState.RegisterNotOpen, HackathonJoinState.Register].some(
        v => currentStatus?.includes(v),
      )
    ) {
      return {
        title: 'Registration Countdown',
        time: timeline?.registrationClose,
      }
    }
    if (currentStatus?.includes(HackathonJoinState.Submit)) {
      return {
        title: 'Submission Countdown',
        time: timeline?.submissionClose,
      }
    }
    if (currentStatus?.includes(HackathonJoinState.Voting)) {
      return {
        title: 'Voting Countdown',
        time: timeline?.rewardTime,
      }
    }
    return null
  }, [hackathon])
  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex flex-col gap-6 rounded-[12px] border-[2px] border-neutral-200 p-6">
        <p className="title-3 text-neutral-800">
          {countInfo?.title || 'Hackathon State'}
        </p>
        {countInfo ? (
          <div>
            <div
              className="headline-m mt-[-0.75rem] mb-6 flex cursor-pointer items-center gap-2 text-neutral-800"
              onClick={() => setSelectedTab(InfoType.SCHEDULE)}
            >
              <span>Schedule Detail</span>
              <FiArrowRight className="size-4" />
            </div>
            {mounted && <CountDown time={countInfo.time} />}
          </div>
        ) : (
          <div className="body-m w-fit rounded-[.5rem] bg-destructive-100 px-3 py-2 font-bold text-neutral-800">
            Ended
          </div>
        )}
      </div>
      {isAuthenticated && <TodoList hackathon={hackathon} />}
    </div>
  )
}

export default Timeline
