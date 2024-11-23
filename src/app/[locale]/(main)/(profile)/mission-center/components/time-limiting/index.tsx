'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@hackquest/ui/shared/carousel'
import type React from 'react'
import TimeLimitCard from './time-limit-card'

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface TimeLimitingProp {}

const TimeLimiting: React.FC<TimeLimitingProp> = () => {
  return (
    <div className="flex flex-col gap-6">
      <p className="title-3 text-neutral-800">Time-limiting Quest</p>
      <div className="flex flex-col gap-6 max-sm:hidden">
        {[1, 2].map((_, i) => (
          <div key={i}>
            <TimeLimitCard />
          </div>
        ))}
      </div>
      <Carousel className="sm:hidden">
        <CarouselContent>
          {[1, 2].map((_, i) => (
            <CarouselItem className="w-full" key={i}>
              <TimeLimitCard />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default TimeLimiting
