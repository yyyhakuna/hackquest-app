import dayjs from '@/lib/dayjs'

export function dateToUTC(date: string, timezone: string) {
  return dayjs.tz(date, timezone).utc()
}
