
import { Suspense } from 'react'
import ManagePage from './components'
interface pageProps {
  params: { id: string }
  searchParams: { tab: string; status: string; sortBy: string }
}

const page: React.FC<pageProps> = async ({ params, searchParams }) => {
  // const queryClient = getQueryClient()
  // const { tab, status, sortBy } = searchParams

  // if (tab === 'Application') {
  //   const equals = parseEquals(status)
  //   await queryClient.prefetchQuery({
  //     queryKey: useListOrganizerApplicationQuery.getKey({
  //       where: {
  //         hackathonId: { equals: params.id },
  //         joinState: { equals },
  //       },
  //     }),
  //     queryFn: useListOrganizerApplicationQuery.fetcher({
  //       where: {
  //         hackathonId: { equals: params.id },
  //         joinState: { equals },
  //       },
  //       // orderBy: {},
  //     }),
  //     staleTime: 0,
  //   })
  // } else if (tab === 'submission') {
  //   await queryClient.prefetchQuery({
  //     queryKey: useListOrganizerSubmissionProjectQuery.getKey({
  //       where: {
  //         hackathonId: {
  //           equals: params.id,
  //         },
  //       },
  //       orderBy: parseOrderBy(sortBy ?? ''),
  //     }),
  //     queryFn: useListOrganizerSubmissionProjectQuery.fetcher({
  //       where: {
  //         hackathonId: {
  //           equals: params.id,
  //         },
  //       },
  //       orderBy: parseOrderBy(sortBy ?? ''),
  //     }),
  //   })
  // } else if (tab === 'Judging') {
  //   // await queryClient.prefetchQuery({
  //   //   queryKey: useListOrganizerJudgeQuery.getKey({
  //   //     where: {
  //   //       hackathonId: {
  //   //         equals: params.id,
  //   //       },
  //   //     },
  //   //   }),
  //   //   queryFn: useListOrganizerJudgeQuery.fetcher({
  //   //     where: {
  //   //       hackathonId: {
  //   //         equals: params.id,
  //   //       },
  //   //     },
  //   //   }),
  //   // })
  // } else if (tab === 'Announcement') {
  //   // await queryClient.prefetchQuery({
  //   //   queryKey: useFindListTemplateQuery.getKey({
  //   //     id: params.id,
  //   //     mode: ModeEnum.HybridNoPass,
  //   //   }),
  //   //   queryFn: useFindListTemplateQuery.fetcher({
  //   //     id: params.id,
  //   //     mode: ModeEnum.HybridNoPass,
  //   //   }),
  //   // })
  //   await queryClient.prefetchQuery({
  //     queryKey: useFindReceiversQuery.getKey({
  //       id: params.id,
  //     }),
  //     queryFn: useFindReceiversQuery.fetcher({
  //       id: params.id,
  //     }),
  //   })
  // } else if (tab === 'Distribution') {
  //   await queryClient.prefetchQuery({
  //     queryKey: useListOrganizerDistributionUtmSourcesQuery.getKey({
  //       where: {
  //         hackathonId: { equals: params.id },
  //       },
  //     }),
  //     queryFn: useListOrganizerDistributionUtmSourcesQuery.fetcher({
  //       where: {
  //         hackathonId: { equals: params.id },
  //       },
  //     }),
  //   })
  // } else {
  //   await queryClient.prefetchQuery({
  //     queryKey: useFindUniqueHackathonQuery.getKey({
  //       where: { id: params.id },
  //     }),
  //     queryFn: useFindUniqueHackathonQuery.fetcher({
  //       where: { id: params.id },
  //     }),
  //   })

  //   await queryClient.prefetchQuery({
  //     queryKey: useFindOrganizerHackathonIncrecementInfoQuery.getKey({
  //       id: params.id,
  //     }),
  //     queryFn: useFindOrganizerHackathonIncrecementInfoQuery.fetcher({
  //       id: params.id,
  //     }),
  //   })
  // }

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    <Suspense>
      <ManagePage id={params.id} searchParams={searchParams} />
    </Suspense>
    // </HydrationBoundary>
  )
}

export default page
