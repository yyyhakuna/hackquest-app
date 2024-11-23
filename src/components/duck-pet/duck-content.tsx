import { Button } from '@hackquest/ui/shared/button'
import Image from 'next/image'
import type React from 'react'
import { FiArrowRight, FiX } from 'react-icons/fi'
import DuckTips from './duck-tips'
import LevelProgress from './level-progress'
import Progress from './progress'

interface DuckContentProp {
  onClose: () => void
  onEarn: () => void
}

const DuckContent: React.FC<DuckContentProp> = ({ onClose, onEarn }) => {
  return (
    <div className="flex h-full flex-col">
      <div className='flex flex-1 flex-col'>
        <div className="flex h-[3.5rem] items-center justify-between border-neutral-300 border-b px-5">
          <div className="title-3 text-neutral-800">HACK-QUAK</div>
          <FiX className=" size-6 cursor-pointer" onClick={onClose} />
        </div>

        <div
          className="relative flex flex-1 flex-col items-center justify-end pb-8"
          style={{
            backgroundImage: 'url(/images/mission-center/duck_bg.png)',
            backgroundSize: '34.125rem',
            backgroundPosition: 'center 90%',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute top-5 left-5 z-[2] ">
            <DuckTips className="size-6" />
          </div>
          <Image
            src="/images/mission-center/cloud.png"
            alt={''}
            width={78}
            height={55}
            className="absolute top-0 right-[1.875rem]"
          />
          <Image
            src="/images/mission-center/cloud.png"
            alt={''}
            width={78}
            height={55}
            className="absolute top-1 left-5 scale-[0.9]"
          />
          <Image
            src="/images/mission-center/plant.png"
            alt={''}
            width={49}
            height={49}
            className="absolute right-5 bottom-[7.5rem]"
          />
          <Image
            src="/images/mission-center/plant.png"
            alt={''}
            width={49}
            height={49}
            className="absolute bottom-[7.5rem] left-5 scale-[0.9]"
          />
          <div className="absolute top-4 right-4 h-[15.625rem]">
            <Progress algin="right" />
          </div>
          <div className="mb-[5rem] h-[14.1875rem] w-[12.5rem] bg-[red]">
            sdsds
          </div>
          <div className="w-full px-8">
            <p className="title-3 mb-3 text-center text-neutral-800">
              Alpha-QUAK
            </p>
            <LevelProgress className="h-4" />
          </div>
        </div>
      </div>
      <div className="border-neutral-300 border-t px-4 py-5">
        <div className="flex gap-3 ">
          <Button className="flex-1 rounded-[2.5625rem]">
            Dropped A Coin
            <Image
              src="/images/mission-center/button_coin.png"
              alt="chest_icon"
              width={16}
              height={16}
            />
          </Button>
          <Button
            className="rounded-[2.5625rem] bg-transparent"
            variant={'outline'}
            color={'neutral'}
            onClick={onEarn}
          >
            Earn
            <FiArrowRight />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DuckContent
