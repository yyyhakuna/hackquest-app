import { Button } from '@hackquest/ui/shared/button'
import Image from 'next/image'
import type React from 'react'
import { FiCopy } from 'react-icons/fi'

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface ReferEarnProp {}

const ReferEarn: React.FC<ReferEarnProp> = () => {
  return (
    <div className="flex w-full flex-col rounded-2xl border-[2px] border-neutral-200 bg-neutral-50 p-6 max-sm:gap-2 sm:h-full sm:w-[19.8125rem] sm:justify-between">
      <p className="title-3 text-neutral-800">Refer & Earn</p>
      <div className="body-s flex items-center justify-between text-neutral-400">
        <span>Referral Code</span>
        <span>
          <span className="font-bold text-neutral-500">3</span> Users Invited
        </span>
      </div>
      <div className="flex gap-3 rounded-[.5rem] bg-neutral-100 p-3">
        <Button
          className="flex-1 flex-shrink-0"
          variant={'outline'}
          color={'neutral'}
        >
          HJJKWERCS
        </Button>
        <Button className="flex-1 flex-shrink-0">
          <span>Invite LInk</span>
          <FiCopy />
        </Button>
      </div>
      <div className="relative flex justify-between">
        <div className="absolute top-4 left-0 w-full border-neutral-400 border-t-[2px] border-dotted" />
        {[1, 2, 3, 4].map((_, i) => (
          <div
            key={i}
            className="body-xs relative text-center text-neutral-500"
          >
            <Image
              src={
                i < 1
                  ? '/images/layout/coin.png'
                  : '/images/layout/coin_gray.png'
              }
              alt="coin-icon"
              width={32}
              height={32}
            />
            <p className="mt-1">2</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReferEarn
