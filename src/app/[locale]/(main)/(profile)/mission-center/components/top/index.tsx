'use client'
import useMediaQuery from '@/hooks/use-media-query'
import Image from 'next/image'
import type React from 'react'
import DuckInfo from '../duck-info'
import ReferEarn from '../refer-earn'

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface TopProp {}

const Top: React.FC<TopProp> = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  return (
    <div
      className="relative flex w-full gap-6 max-sm:flex-col sm:h-[18.75rem] sm:rounded-xl sm:border-[2px] sm:border-neutral-200 sm:bg-neutral-50 sm:p-[1.375rem]"
      style={
        isDesktop
          ? {
              backgroundImage: 'url(/images/mission-center/duck_bg_pc.png)',
              backgroundSize: '100%',
              backgroundPosition: 'center 8.125rem',
              backgroundRepeat: 'no-repeat',
            }
          : {}
      }
    >
      <div className="max-sm:hidden">
        <Image
          src="/images/mission-center/cloud.png"
          alt={''}
          width={78}
          height={55}
          className="absolute top-1 left-[12.5rem]"
        />
        <Image
          src="/images/mission-center/cloud.png"
          alt={''}
          width={78}
          height={55}
          className="absolute top-2 left-5 scale-[0.9]"
        />
        <Image
          src="/images/mission-center/plant.png"
          alt={''}
          width={49}
          height={49}
          className="absolute bottom-[2.5rem] left-[8.125rem]"
        />
        <Image
          src="/images/mission-center/plant.png"
          alt={''}
          width={49}
          height={49}
          className="absolute bottom-[2.5rem] left-[25.625rem] scale-[1.1]"
        />
      </div>
      <div className="relative z-[2] max-sm:w-full sm:flex-1 sm:flex-shrink-0">
        <DuckInfo />
      </div>
      <div className="z-[2] w-full sm:w-[19.8125rem]">
        <ReferEarn />
      </div>
    </div>
  )
}

export default Top
