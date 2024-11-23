'use client'
import CardCover from '@/public/images/events/events_card_cover.png'
import type { EventsType } from '@/service/events/type'

import dayjs from '@/lib/dayjs'
import { Dialog, DialogTrigger } from '@hackquest/ui/shared/dialog'
import { Tag } from '@hackquest/ui/shared/tag'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import type React from 'react'
import { PiCalendarBlank } from 'react-icons/pi'
import { TfiLocationPin } from 'react-icons/tfi'
import EventsCardModal from './events-card-modal'

interface EventsCardProp {
  events: EventsType
}

const EventsCard: React.FC<EventsCardProp> = ({ events }) => {
  const t = useTranslations('Event')
  return (
    <Dialog key={events.id}>
      <DialogTrigger className=" w-full overflow-hidden rounded-2xl p-4 ">
        <div className="relative h-0 w-full overflow-hidden rounded-lg pt-[56%]">
          <Image src={events.medias?.[0] || CardCover} alt={events.name!} fill className="object-cover" />
        </div>
        <div className="flex flex-col gap-3 pt-5">
          <div className="flex flex-wrap gap-x-[8px] gap-y-[4px]">
            {/* {events.status?.map((v, i) => (
              <Tag key={i}>{v}</Tag>
            ))} */}
            <Tag color="yellow">{t('recommended')}</Tag>
            <Tag color="grey">{t('ongoing')}</Tag>
          </div>
          <h2 className="body-l-bold headline-m line-clamp-2 h-12 text-left">{events.name}</h2>
          <div className="body-s flex flex-col justify-end gap-3 text-secondary-neutral">
            <div className="flex items-center gap-2">
              <PiCalendarBlank />
              <span>{dayjs(events.startTime).tz().format('MMM. D, YYYY')}</span>
              {/* {events.endTime && !dayjs(events.startTime).tz().isSame(events.endTime, 'day') && (
                <span>
                  {` - `}
                  {dayjs(events.endTime).tz().format('MMM. D, YYYY')}
                </span>
              )} */}
            </div>
            {events.location && (
              <div className="flex items-center gap-2">
                <TfiLocationPin />
                <span className="line-clamp-1 text-left">{events.location}</span>
              </div>
            )}
          </div>
        </div>
      </DialogTrigger>
      <EventsCardModal event={events} />
    </Dialog>
  )
}

export default EventsCard
