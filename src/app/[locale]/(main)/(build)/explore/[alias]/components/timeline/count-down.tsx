import dayjs from '@/lib/dayjs'
import type React from 'react'
import { useTimer } from 'react-timer-hook'

interface CountDownProp {
  time: string
}

const CountDown: React.FC<CountDownProp> = ({ time }) => {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: new Date(dayjs.utc(time).local() as unknown as string),
    autoStart: true,
  })
  const item = (t: number) => {
    return String(t).split('').length === 1 ? `0${t}` : t
  }
  return (
    <div
      translate="no"
      className="body-xs flex flex-shrink-0 gap-1 text-center text-neutral-500 [&>div]:flex [&>div]:flex-1 [&>div]:flex-col [&>div]:items-center [&>div]:justify-center [&>div]:rounded-[.25rem] [&>div]:bg-primary-100 [&>div]:py-1 "
    >
      <div>
        <p className="body-xl font-bold text-neutral-800">{item(days)}</p>
        <p>D</p>
      </div>
      <div>
        <p className="body-xl font-bold text-neutral-800">{item(hours)}</p>
        <p>H</p>
      </div>
      <div>
        <p className="body-xl font-bold text-neutral-800">{item(minutes)}</p>
        <p>M</p>
      </div>
      <div>
        <p className="body-xl font-bold text-neutral-800">{item(seconds)}</p>
        <p>S</p>
      </div>
    </div>
  )
}

export default CountDown
