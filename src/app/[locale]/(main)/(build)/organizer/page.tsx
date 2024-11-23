import {
  OrganizerHackathonStatus,
  useListHackathonsByOrganizerQuery,
} from '@/graphql/generated/hooks'
import { getQueryClient } from '@/providers/root/query-client'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import Organizer from './component'

export const metadata: Metadata = {
  title: 'Hackathon Organizer',
}

const Page = async ({
  searchParams,
}: { searchParams: Record<string, string> }) => {
  const queryClient = getQueryClient()
  function parseStatus() {
    switch (searchParams.tab) {
      case 'Past Hackathon':
        return OrganizerHackathonStatus.Past
      case 'Draft':
        return OrganizerHackathonStatus.Draft
      default:
        return OrganizerHackathonStatus.Ongoing
    }
  }
  const status = parseStatus()

  await queryClient.prefetchQuery({
    queryKey: useListHackathonsByOrganizerQuery.getKey({
      status,
    }),
    queryFn: useListHackathonsByOrganizerQuery.fetcher({
      status,
    }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense>
        <Organizer />
      </Suspense>
    </HydrationBoundary>
  )
}

export default Page
