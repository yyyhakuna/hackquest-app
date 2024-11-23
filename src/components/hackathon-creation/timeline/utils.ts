import { HackathonScheduleType } from '@/graphql/generated/graphql'
import dayjs from '@/lib/dayjs'

export function dateToUTC(date: string, timezone: string) {
  return dayjs.tz(date, timezone).utc()
}

export function timelineDateFormat(date?: string, timezone?: string) {
  return dayjs(date).tz(timezone).format('YYYY-MM-DDTHH:mm')
}

export function getScheduleTitle(type: HackathonScheduleType) {
  return type === HackathonScheduleType.RegisterOpen
    ? 'Registration Open'
    : type === HackathonScheduleType.SubmissionClose
      ? 'Submission Close'
      : 'Judging & Announcement'
}
