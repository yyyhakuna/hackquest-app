import { cn } from '@hackquest/ui/lib/utils'
import Image from 'next/image'
import type React from 'react'

interface LevelProgressProp {
  className?: string
}

const LevelProgress: React.FC<LevelProgressProp> = ({ className }) => {
  return (
    <div
      className={cn(
        'body-s relative flex h-5 w-full items-center justify-end text-neutral-800',
        className,
      )}
    >
      <div
        className={
          'absolute h-full w-full rounded-[2.8125rem] bg-neutral-100 text-center'
        }
      >
        <div
          className="absolute top-0 left-0 h-full rounded-[2.8125rem] bg-primary "
          style={{ width: '50%' }}
        />
        <p className='relative z-[2] w-full text-center'>lv. {1}</p>
      </div>
      <Image
        src="/images/mission-center/chest_icon.png"
        alt="chest_icon"
        width={29}
        height={23}
        className="relative z-[2]"
      />
    </div>
  )
}

export default LevelProgress
