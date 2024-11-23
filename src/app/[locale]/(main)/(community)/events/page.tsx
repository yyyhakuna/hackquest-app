import MenuLink from '@/constants/menu-link'
import { useListEventsQuery } from '@/graphql/generated/hooks'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import type { Metadata } from 'next'
import type React from 'react'
import { Suspense } from 'react'
import Events from './components'
import EventsSkeleton from './components/events-skeleton'
import { parseParams } from './utils'

type EventsPageProp = {
  params: {
    locale: string
  }
  searchParams: Record<string, any>
}

export async function generateMetadata({
  params,
}: EventsPageProp): Promise<Metadata> {
  const { locale } = params
  const metadata: Metadata = {
    title: 'Events',
    alternates: {
      canonical: `https://www.hackquest.io${locale ? `/${locale}` : ''}/${MenuLink.EVENTS}`,
    },
  }

  return metadata
}

const EventsPage: React.FC<EventsPageProp> = async ({ searchParams }) => {
  const queryClient = new QueryClient()
  const params = parseParams(searchParams)

  await queryClient.prefetchQuery({
    queryKey: useListEventsQuery.getKey(params),
    queryFn: useListEventsQuery.fetcher(params),
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<EventsSkeleton />}>
        <Events params={params} />
      </Suspense>
    </HydrationBoundary>
  )
}

export default EventsPage
