'use client'
import Image from 'next/image'
import type React from 'react'
import { dailyData } from '../../constants/data'
import ActionButton from '../common/action-button'
import ActionCard from '../common/action-card'
import { CircularProgress } from '../common/circular-progress'

interface DailyCardProp {
  type: string
}

const DailyCard: React.FC<DailyCardProp> = ({ type }) => {
  const cardInfo = dailyData[type as keyof typeof dailyData]
  return (
    <ActionCard className="flex flex-col items-center p-6">
      <CircularProgress
        value={80}
        trackColor={'#E5E5E5'}
        color={cardInfo.borderColor}
      >
        <div
          className="flex h-full w-full items-center justify-center rounded-[50%] bg-neutral-300"
          style={{
            background: cardInfo.bgColor,
          }}
        >
          {cardInfo.icon()}
        </div>
      </CircularProgress>
      <div className="headline-l mt-6 mb-4 flex w-full items-stretch text-center text-neutral-600">
        <div className="flex-1">
          <p className="flex h-[1.5625rem] items-center justify-center">{`${5} / ${10}`}</p>
          <p className="body-s">{cardInfo.progressText}</p>
        </div>
        <div className="mx-3 w-[1px] bg-neutral-200" />
        <div className="flex-1">
          <div className="flex h-[25px] items-center justify-center gap-1">
            <Image
              src={'/images/layout/coin.png'}
              alt={'coin-icon'}
              width={20}
              height={20}
            />
            <span>{50}</span>
          </div>
          <p className="body-s">Streak reward</p>
        </div>
      </div>
      <ActionButton isComplete={true} pathText={cardInfo.progressText} />
    </ActionCard>
  )
}

export default DailyCard
