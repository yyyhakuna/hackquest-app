'use client'
// import EventsCardModal from '@/components/Web/Business/EventsCard/EventsCardModal';
import type { EventsType } from '@/service/events/type'
import type React from 'react'
import EventsCard from './events-card'
// import { type Lang, TransNs } from '@/i18n/config'
// import { useTranslations } from 'next-intl'

interface EventsListProp {
  list: EventsType[]
  //   lang: Lang
}

const EventsList: React.FC<EventsListProp> = ({ list }) => {
  //   const t = useTranslations()
  //   const eventsList = useMemo(() => {
  //     return list
  //       .filter(v => v.status !== EventStatus.PAST)
  //       .map(v => ({
  //         ...v,
  //         medias: v.medias?.filter(m => /.webp$/.test(m)),
  //       }))
  //   }, [list])
  if (!list?.length) return null
  return (
    <div className="mx-auto mt-8" id={'events-upcoming'}>
      <div className="space-y-4 sm:flex sm:flex-wrap sm:gap-4 sm:space-y-0">
        {list.map(v => (
          <div
            key={v.id}
            className="rounded-2xl border-2 border-neutral-200 transition-colors duration-300 hover:bg-neutral-100 sm:w-[calc((100%-32px)/3)]"
          >
            <EventsCard events={v} key={v.id} />
          </div>
        ))}
        {/* <div>
          <Pagination className="mt-3">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div> */}
      </div>
    </div>
  )
}

export default EventsList
