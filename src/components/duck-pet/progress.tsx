import Image from 'next/image'
import type React from 'react'

interface ProgressProp {
  algin?: 'left' | 'right'
}

const Progress: React.FC<ProgressProp> = ({ algin = 'left' }) => {
  return (
    <div
      className={`flex h-full flex-col gap-4 ${algin === 'right' ? 'items-end' : 'items-start'}`}
    >
      <div className="body-s flex items-center gap-1 rounded-[6px] border border-neutral-200 bg-neutral-white px-2 py-[.375rem] text-neutral-400">
        <Image
          src="/images/layout/coin.png"
          alt="coin"
          width={16}
          height={16}
        />
        <span>x 1.0</span>
      </div>
      <div className="flex flex-1 flex-col items-center">
        <div className="relative z-[2] flex h-[1.75rem] w-[1.75rem] items-center justify-center rounded-[50%] border border-neutral-200 bg-primary-300">
          <Image
            src="/images/mission-center/duck_icon_init.png"
            alt="duck"
            width={20}
            height={20}
            className="relative z-[2]"
          />
          <div className="absolute top-[50%] left-[50%] h-[3.125rem] w-[3.125rem] translate-x-[-50%] translate-y-[-50%]">
            <Image
              src="/images/mission-center/duck_icon_bg.png"
              alt="duck-bg"
              fill
            />
          </div>
        </div>
        <div className="relative top-[-.5rem] w-[1.0625rem] flex-1 rounded-[1.8125rem] bg-neutral-200">
          <div
            className="absolute bottom-0 left-0 w-full rounded-[1.8125rem] bg-primary transition-all "
            style={{
              height: '80%',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Progress
