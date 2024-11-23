import Image from 'next/image'
import type React from 'react'
import { useEffect, useState } from 'react'
import { useTimer } from 'react-timer-hook'
import ActionButton from '../common/action-button'
import ActionCard from '../common/action-card'

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface TimeLimitCardProp {}

const TimeLimitCard: React.FC<TimeLimitCardProp> = () => {
  const item = (t: number) => {
    return String(t).split('').length === 1 ? `0${t}` : t
  }
  const [mounted, setMounted] = useState(false)
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: new Date('2024-11-24'),
    autoStart: true,
  })

  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <ActionCard className="flex w-full p-6 max-sm:flex-col sm:items-stretch sm:justify-between sm:gap-5">
      <div className="flex max-sm:flex-col sm:flex-1 sm:flex-shrink-0 sm:items-stretch sm:gap-6">
        <div className="h-[7rem] w-[7rem] rounded-[.75rem] border border-neutral-300 p-[.0625rem]">
          <Image
            src={'/images/mission-center/time_limit.png'}
            alt={'time-limiting'}
            width={110}
            height={110}
          />
        </div>

        <div className="body-s flex h-full flex-1 flex-shrink-0 flex-col justify-between text-neutral-600 max-sm:mt-4">
          <div className="">
            <p>Mission：</p>
            <p className="headline-m sm:headline-l mt-1 text-neutral-800">
              Register LIVING KNOWLEDGE SYSTEMS Hackathone
            </p>
          </div>
          <div className="max-sm:mt-2">
            <p>Quest reward</p>
            <div className="headline-m mt-1 flex gap-4 text-neutral-600">
              <div className="flex items-center gap-1">
                <Image
                  src={'/images/layout/coin.png'}
                  alt={'coin-icon'}
                  width={20}
                  height={20}
                />
                <span>{50}</span>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src={'/images/layout/exp.png'}
                  alt={'exp-icon'}
                  width={20}
                  height={20}
                />
                <span>{50}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-center text-center max-sm:mt-6 max-sm:gap-2 sm:w-[14rem] sm:gap-4'>
        <ActionButton isComplete={true} />
        <div className="body-s text-neutral-400">
          Quest Countdown:
          {mounted &&
            ` ${item(days)}D ${item(hours)}:${item(minutes)}:${item(seconds)}`}
        </div>
      </div>
    </ActionCard>
  )
}

export default TimeLimitCard
