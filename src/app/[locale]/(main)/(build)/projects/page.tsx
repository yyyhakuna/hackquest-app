import {
  useGetAllHackathonInfoQuery,
  useHackathonListProjectsQuery,
  useHighlightBuilderQuery,
  useHighlightProjectQuery,
} from '@/graphql/generated/hooks'
import { getQueryClient } from '@/providers/root/query-client'
import {
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import Archive from './components'
import { parseParams } from './utils'

interface PageProps {
  searchParams: {
    page: string
    showby: string
    highlight: string
  }
}

export const metadata: Metadata = {
  title: 'Project Archive',
}

const Page: React.FC<PageProps> = async ({ searchParams }) => {
  const queryClient = getQueryClient()
  const params = parseParams(searchParams)

  if (searchParams.highlight === 'builder') {
    await queryClient.prefetchQuery({
      queryKey: useHighlightBuilderQuery.getKey(),
      queryFn: useHighlightBuilderQuery.fetcher(),
    })
  } else {
    await queryClient.prefetchQuery({
      queryKey: useHighlightProjectQuery.getKey(),
      queryFn: useHighlightProjectQuery.fetcher(),
    })
  }
  if (searchParams.showby === 'By Project') {
    await queryClient.prefetchQuery({
      queryKey: useHackathonListProjectsQuery.getKey({ ...params, limit: 12 }),
      queryFn: useHackathonListProjectsQuery.fetcher({ ...params, limit: 12 }),
    })
  } else {
    await queryClient.prefetchQuery({
      queryKey: useGetAllHackathonInfoQuery.getKey({ ...params, limit: 9 }),
      queryFn: useGetAllHackathonInfoQuery.fetcher({ ...params, limit: 9 }),
    })
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense>
        <Archive />
      </Suspense>
    </HydrationBoundary>
  )
}

export default Page
