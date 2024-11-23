'use client'
import { usePathname, useRouter } from '@/app/navigation'
import { Pagination } from '@/components/common/pagination'
import { useListEventsQuery } from '@/graphql/generated/hooks'
import { createUrl } from '@/lib/utils'
import type { EventsType } from '@/service/events/type'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import type React from 'react'
import EventHeader from './events-header'
import EventsList from './events-list'
import EventSelectorZone from './events-selector-zone'
import { EventsTabs } from './events-tabs'

interface PageProps {
  params: Record<string, any>
}

const Events: React.FC<PageProps> = ({ params }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentParams = new URLSearchParams(searchParams.toString())
  const pathname = usePathname()
  const paramsObject = Object.fromEntries(searchParams.entries())
  const page = Number(paramsObject.page || 1)
  const { category } = paramsObject

  //新写一个useState把tab
  const updatePage = (newPage: number) => {
    if (newPage === page) return
    if (newPage === 1) {
      currentParams.delete('page')
    } else {
      currentParams.set('page', String(newPage))
    }
    const url = createUrl(pathname, currentParams)
    router.replace(url)
  }

  const { data } = useSuspenseQuery({
    queryKey: useListEventsQuery.getKey(params),
    queryFn: useListEventsQuery.fetcher(params),
  })

  return (
    <div className="container px-6 ">
      <EventHeader />
      <EventSelectorZone />
      <EventsTabs className="my-4" />
      <EventsList list={data?.listEvents.data as EventsType[]} />
      <div className="m-auto mt-6 flex">
        <Pagination total={data?.listEvents.total || 0} page={page} onPageChange={updatePage} />
      </div>
    </div>
  )
}

export default Events
