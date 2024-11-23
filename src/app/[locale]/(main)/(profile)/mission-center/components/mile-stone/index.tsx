'use client'
import type React from 'react'
import { mileStoneData } from '../../constants/data'
import MileStoneCard from './mile-stone-card'

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface MileStoneProp {}

const MileStone: React.FC<MileStoneProp> = () => {
  const miles = [
    mileStoneData.daily,
    mileStoneData.straight,
    mileStoneData.participate,
    mileStoneData.create,
    mileStoneData.hackathon,
    mileStoneData.coins,
  ]
  return (
    <div className="flex flex-col gap-6">
      <p className="title-3 text-neutral-800">Mile stone</p>
      <div className='flex flex-wrap gap-6'>
        {miles.map((m, i) => (
          <div
            key={i}
            className="max-sm:w-[calc((100%-1.5rem)/2)] sm:w-[calc((100%-7.5rem)/6)]"
          >
            <MileStoneCard info={m} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MileStone
