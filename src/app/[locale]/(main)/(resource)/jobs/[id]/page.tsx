import ListSkeleton from '@/components/resource/blog-glossary/list-skeleton'
import { useFindUniqueJobStationQuery } from '@/graphql/generated/hooks'
import { HydrationBoundary, QueryClient, dehydrate, } from '@tanstack/react-query'
import { Suspense } from 'react'
import Detail from './components'

// export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
//   const { data } = await useSuspenseQuery(jobDetailQueryOptions(params.id))
//   const job = data?.findUniqueJobStation
//   const title = `${job?.name} at ${job?.companyName}`
//   const description = 'Find and apply for Web 3 jobs.'

//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       url: `https://hackquest.io/jobs/${params.id}`,
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title,
//       description,
//     },
//   }
// }

const Page = async ({ params }: { params: { id: string } }) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: useFindUniqueJobStationQuery.getKey({ where: { id: params.id } }),
    queryFn: useFindUniqueJobStationQuery.fetcher({ where: { id: params.id } }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ListSkeleton />}>
        <Detail id={params.id} />
      </Suspense>
    </HydrationBoundary>
  )
}

export default Page
