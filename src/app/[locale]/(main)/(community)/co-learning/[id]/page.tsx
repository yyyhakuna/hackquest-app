import { useListCoLearningQuery } from '@/graphql/generated/hooks'
import { getQueryClient } from '@/providers/root/query-client'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { Suspense } from 'react'
import Index from './component'

interface PageProps {
  params: {
    id: string
  }
}

const Jobs: React.FC<PageProps> = async ({ params }) => {
  const queryClient = getQueryClient()
  await queryClient.fetchQuery({
    queryKey: useListCoLearningQuery.getKey({
      where: {
        id: {
          equals: params.id,
        },
      },
    }),
    queryFn: useListCoLearningQuery.fetcher({
      where: {
        id: {
          equals: params.id,
        },
      },
    }),
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense>
        <Index />
      </Suspense>
    </HydrationBoundary>
  )
}

export default Jobs
