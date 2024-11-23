import { Link } from '@/app/navigation'
import {
  type HackathonExtend,
  type HackathonSchedule,
  HackathonScheduleType,
} from '@/graphql/generated/hooks'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import dayjs from 'dayjs'
import React from 'react'
import { useMemo, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

interface ScheduleProp {
  hackathon: HackathonExtend
}

const Schedule: React.FC<ScheduleProp> = ({ hackathon }) => {
  const [expandIndex, setExpandIndex] = useState<number[]>([])
  const handleExpand = (i: number) => {
    const newIndex = ~expandIndex.indexOf(i)
      ? expandIndex.filter(v => v !== i)
      : [...expandIndex, i]
    setExpandIndex(newIndex)
  }
  const [parent] = useAutoAnimate()
  const renderStatus = ({
    openTime,
    closeTime,
  }: {
    openTime: string
    closeTime?: string
  }) => {
    if (dayjs().tz().isBefore(openTime)) {
      return (
        <div className="headline-s rounded-[.25rem] bg-neutral-200 px-2 py-1 text-neutral-800">
          Upcoming
        </div>
      )
    }
    if (
      dayjs().tz().isAfter(openTime) &&
      dayjs().tz().isBefore(closeTime) &&
      closeTime
    ) {
      return (
        <div className="headline-s rounded-[.25rem] bg-success-100 px-2 py-1 text-neutral-800">
          Live
        </div>
      )
    }
    const time = closeTime || openTime
    if (dayjs().tz().isAfter(time)) {
      return (
        <div className="headline-s rounded-[.25rem] bg-destructive-100 px-2 py-1 text-neutral-800">
          End
        </div>
      )
    }
    return null
  }

  const list = useMemo(() => {
    const timeline = hackathon.timeline
    const schedule = timeline?.schedule || []
    const registration = {
      eventName: 'Registration',
      isTimeline: true,
      openTime: new Date(timeline?.registrationOpen).toLocaleString(),
      closeTime: new Date(timeline?.registrationClose).toLocaleString(),
      schedule: schedule?.filter(
        v => v.type === HackathonScheduleType.RegisterOpen,
      ),
    }
    const submission = {
      eventName: 'Submission',
      isTimeline: true,
      openTime: new Date(timeline?.submissionOpen).toLocaleString(),
      closeTime: new Date(timeline?.submissionClose).toLocaleString(),
      schedule: schedule?.filter(
        v => v.type === HackathonScheduleType.SubmissionClose,
      ),
    }
    const reward = {
      eventName: 'Reward Announcement',
      isTimeline: true,
      openTime: new Date(timeline?.rewardTime).toLocaleString(),
      schedule: schedule?.filter(v => v.type === HackathonScheduleType.Judging),
    }
    return [registration, submission, reward]
  }, [hackathon])

  const renderItem = (index: number, item: any) => {
    return (
      <div
        className="body-m flex flex-col gap-4 border-neutral-200 border-b py-4"
        ref={parent}
      >
        <div
          className={`flex items-center justify-between gap-10 ${!item?.isTimeline && 'cursor-pointer'}`}
          onClick={() => {
            !item.isTimeline && handleExpand(index)
          }}
        >
          <div className="items-center gap-1 sm:flex">
            <div className="flex items-center gap-1">
              {item?.isTimeline &&
                renderStatus({
                  openTime: item?.openTime,
                  closeTime: item?.closeTime,
                })}
              <span className="body-l font-bold text-neutral-800">
                {item?.eventName || ''}
              </span>
            </div>
            <span className="body-s mt-4 text-neutral-500 sm:mt-0 sm:pl-5">
              {item.closeTime
                ? `${dayjs(item.openTime).format('MMM D,YYYY HH:mm')} - ${dayjs(item.closeTime).format('MMM D,YYYY HH:mm')}`
                : `${dayjs(item.openTime).format('MMM D,YYYY HH:mm')}`}
            </span>
          </div>
          {!item?.isTimeline && (
            <FiChevronDown
              className={`size-6 transition-all ${~expandIndex.indexOf(index) ? 'rotate-180' : ''}`}
            />
          )}
        </div>
        {!item?.isTimeline && ~expandIndex.indexOf(index) ? (
          <div className="flex flex-col gap-4 ">
            {item.eventURL && (
              <div className="">
                <p className="text-neutral-400">Event URL</p>
                <Link
                  href={item.eventURL}
                  target="_blank"
                  className="mt-1 text-neutral-800"
                >
                  {item.eventURL}
                </Link>
              </div>
            )}

            {item.description && (
              <div>
                <p className="text-neutral-400">Description</p>
                <div
                  className="prose mt-1 text-neutral-800"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </div>
            )}
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div>
      <p className="title-3 text-neutral-800">Schedule</p>
      <div className="mt-4">
        {list?.map((v: any, i: number) => (
          <React.Fragment key={i}>
            {renderItem(i, v)}
            {v.schedule?.map((s: HackathonSchedule, _j: number) => (
              <React.Fragment key={s.id}>
                {renderItem(s.id as unknown as number, s)}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default Schedule
