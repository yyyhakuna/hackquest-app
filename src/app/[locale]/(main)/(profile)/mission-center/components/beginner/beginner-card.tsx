import Image from 'next/image'
import type React from 'react'
import ActionButton from '../common/action-button'
import ActionCard from '../common/action-card'
import { CircularProgress } from '../common/circular-progress'

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface BeginnerCardProp {}

const BeginnerCard: React.FC<BeginnerCardProp> = () => {
  const is = true
  return (
    <ActionCard className="flex flex-col items-center gap-6 p-6">
      <CircularProgress value={80} trackColor={'#E5E5E5'} color="#FFEE94">
        <div
          className={`flex h-full w-full items-center justify-center rounded-[50%] ${is ? 'bg-[#FBD334]' : 'bg-neutral-300'}`}
        >
          <Image
            src="/images/mission-center/diamond_cover_active.png"
            alt="diamond-icon"
            width={32}
            height={32}
          />
        </div>
      </CircularProgress>
      <p className="headline-m text-neutral-800">Register a HackQuest</p>
      <div className="headline-l flex justify-center gap-4 text-neutral-600">
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
            alt={'coin-icon'}
            width={20}
            height={20}
          />
          <span>{50}</span>
        </div>
      </div>
      <ActionButton isComplete={true} />
    </ActionCard>
  )
}

export default BeginnerCard
