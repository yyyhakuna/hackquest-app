import { Button } from '@hackquest/ui/shared/button'
import Image from 'next/image'
import type React from 'react'
import { dailyData } from '../../constants/data'
import ActionCard from '../common/action-card'
import { CircularProgress } from '../common/circular-progress'

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface TreasureCardProp {}

const TreasureCard: React.FC<TreasureCardProp> = () => {
  const daily = [dailyData['streak'], dailyData['course'], dailyData['project']]
  return (
    <ActionCard className="flex h-full flex-col items-center justify-between p-6">
      <Image
        src="/images/mission-center/chest_cover.png"
        width={74}
        height={63}
        alt="chest-cover"
      />
      <div className="flex gap-4">
        {daily.map((d, i) => (
          <CircularProgress
            key={i}
            size={29}
            thickness={3}
            value={100}
            trackColor={'#E5E5E5'}
            color={d.borderColor}
          >
            <div
              className="flex h-full w-full items-center justify-center rounded-[50%] bg-neutral-300"
              style={{
                background: d.bgColor,
              }}
            >
              {d.icon('small')}
            </div>
          </CircularProgress>
        ))}
      </div>
      <Button className="w-full">Get Daily Treasure</Button>
    </ActionCard>
  )
}

export default TreasureCard
