import LevelProgress from '@/components/duck-pet/level-progress'
import useMediaQuery from '@/hooks/use-media-query'
import { Button } from '@hackquest/ui/shared/button'
import Image from 'next/image'
import type React from 'react'
import { useState } from 'react'
import DuckTips from '../common/duck-tips'
import DuckModal from './duck-modal'

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface LevelProp {}

const Level: React.FC<LevelProp> = () => {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const [open, setOpen] = useState(false)
  return (
    <div className="relative z-[10] flex w-full flex-col items-center rounded-2xl border-[2px] border-neutral-200 bg-neutral-50 p-6 max-sm:gap-3 sm:h-full sm:w-[17.125rem] sm:justify-between">
      <div className="absolute top-[1.0625rem] right-[1.375rem] cursor-pointer ">
        <DuckTips />
      </div>
      <div className="flex h-[5.0625rem] w-[5.0625rem] items-center justify-center rounded-[1.1875rem] border border-neutral-300 bg-neutral-50">
        <Image
          src="/images/mission-center/duck_avatar.png"
          alt="coin"
          width={47}
          height={44}
        />
      </div>
      <p className="headline-m text-neutral-800">Alpha Duck Pass</p>
      <LevelProgress />
      <Button
        className="w-full"
        onClick={() => {
          if (!isDesktop) {
            setOpen(true)
          }
        }}
      >
        {isDesktop ? 'Dropped A Coin' : 'Upgrate My Quak'}
        <Image
          src="/images/mission-center/button_coin.png"
          alt="chest_icon"
          width={16}
          height={16}
        />
      </Button>
      <DuckModal open={open} onOpenChange={setOpen} />
    </div>
  )
}

export default Level
