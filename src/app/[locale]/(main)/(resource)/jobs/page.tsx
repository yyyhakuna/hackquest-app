import { useListJobStationsQuery } from '@/graphql/generated/hooks'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import Jobs from './components'
import JobsPgaeSkeleton from './components/jobs-page-skeleton'
import { type SearchParams, parseParams } from './utils'

export type JobsPageProp = {
  searchParams: SearchParams
}

export const metadata: Metadata = {
  title: 'Job Station',
}

const JobsPage: React.FC<JobsPageProp> = async ({ searchParams }) => {
  const params = parseParams(searchParams)
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: useListJobStationsQuery.getKey(params),
    queryFn: useListJobStationsQuery.fetcher(params),
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<JobsPgaeSkeleton />}>
        <Jobs searchParams={searchParams} />
      </Suspense>
    </HydrationBoundary>
  )
}

export default JobsPage
