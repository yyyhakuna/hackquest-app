'use client'
import dayjs from '@/lib/dayjs'
import CardCover from '@/public/images/events/events_card_cover.png'
import type { EventsType } from '@/service/events/type'
import { Button } from '@hackquest/ui/shared/button'
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@hackquest/ui/shared/carousel'
import { DialogContent, DialogHeader } from '@hackquest/ui/shared/dialog'
import { Tag } from '@hackquest/ui/shared/tag'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import type React from 'react'
import { useMemo, } from 'react'
import { LuArrowRight } from 'react-icons/lu'
import { PiCalendarBlank } from 'react-icons/pi'
import { TfiLocationPin } from 'react-icons/tfi'

interface EventsCardModalProp extends React.HTMLAttributes<HTMLDivElement> {
  event: EventsType
}

const EventsCardModal: React.FC<EventsCardModalProp> = ({
  event,
  className,
}) => {
  const medias = useMemo(() => {
    return event?.medias?.length ? event?.medias : [CardCover]
  }, [event])
  const t = useTranslations('Event')
  return (
    <DialogContent className={className + ' h-full gap-6 sm:h-auto'}>
      <DialogHeader className="title-3 font-next-book">
        Event Detail
      </DialogHeader>
      <Carousel>
        <CarouselContent>
          {medias.map((v, i) => (
            <CarouselItem key={i}>
              <Image
                src={v}
                width={20}
                height={20}
                className="h-48 w-full overflow-hidden rounded-xl object-cover"
                alt="img"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-2 flex justify-between">
          <CarouselPrevious />
          <CarouselIndicator buttonClassName="w-2 rounded-full h-2" />
          <CarouselNext />
        </div>
      </Carousel>
      <div className="flex flex-col justify-start gap-4">
        <h1 className="title-1 font-next-book ">{event.name}</h1>
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          <Tag color="yellow">{t('recommended')}</Tag>
          <Tag color="grey">{t('ongoing')}</Tag>
        </div>
        <div className="body-s flex h-[45px] flex-col justify-end text-primary-neutral">
          <div className="flex items-center gap-2">
            <PiCalendarBlank />
            <span>{dayjs(event.startTime).tz().format('MMM. D, YYYY')}</span>
            {event.endTime &&
              !dayjs(event.startTime).tz().isSame(event.endTime, 'day') && (
                <span>
                  {` - `}
                  {dayjs(event.endTime).tz().format('MMM. D, YYYY')}
                </span>
              )}
          </div>
          {event.location && (
            <div className="flex items-center gap-2">
              <TfiLocationPin />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          )}
        </div>
        <div
          className="body-m h-60 overflow-auto text-secondary-neutral sm:h-28"
          style={{ scrollbarWidth: 'none' }}
        >
          {event.description}
        </div>
      </div>
      <div className="flex w-full justify-center space-x-4 sm:ml-auto sm:w-auto">
        <a
          href={event.eventUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1"
        >
          <Button variant="outline" color="neutral" className=" w-full">
            {t('learnMore')}
          </Button>
        </a>
        <a
          href={event.prUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1"
        >
          <Button className="flex-1">
            {t('register')} <LuArrowRight />
          </Button>
        </a>
      </div>
    </DialogContent>
  )
}

export default EventsCardModal
