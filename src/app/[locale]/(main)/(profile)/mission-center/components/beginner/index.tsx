'use client'
import useMediaQuery from '@/hooks/use-media-query'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@hackquest/ui/shared/carousel'
import type React from 'react'
import BeginnerCard from './beginner-card'

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface BeginnerProp {}

const Beginner: React.FC<BeginnerProp> = () => {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <p className="title-3 text-neutral-800">Beginner Quest</p>
      <Carousel options={{ slidesToScroll: isDesktop ? 4 : 1 }}>
        <CarouselContent>
          {[1, 2, 3, 4].map((_, i) => (
            <CarouselItem className="max-sm:w-full sm:basis-1/4" key={i}>
              <BeginnerCard />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default Beginner
