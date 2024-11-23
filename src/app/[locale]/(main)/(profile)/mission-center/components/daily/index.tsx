'use client'
import TreasureModal from '@/components/treasure-modal'
import useMediaQuery from '@/hooks/use-media-query'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@hackquest/ui/shared/carousel'
import type React from 'react'
import { useState } from 'react'
import DailyCard from './daily-card'
import TreasureCard from './treasure-card'

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface DailyProp {}

const Daily: React.FC<DailyProp> = () => {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 640px)')
  return (
    <div className="flex w-full flex-col gap-4 sm:gap-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <p className="title-3 text-neutral-800">Daily Quest</p>
        <p className="body-s text-neutral-400 max-sm:mt-2">
          Daily Quest Refresh at 8AM Everyday
        </p>
      </div>
      <Carousel options={{ slidesToScroll: isDesktop ? 4 : 1 }}>
        <CarouselContent>
          {[1, 2, 3].map((_, i) => (
            <CarouselItem className="max-sm:w-full sm:basis-1/4" key={i}>
              <DailyCard type="streak" />
            </CarouselItem>
          ))}
          <CarouselItem className="max-sm:w-full sm:basis-1/4">
            <TreasureCard />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <TreasureModal open={open} onOpenChange={setOpen} treasureId="" />
    </div>
  )
}

export default Daily
