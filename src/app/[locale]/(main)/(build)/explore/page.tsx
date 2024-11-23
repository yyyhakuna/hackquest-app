import MenuLink from '@/constants/menu-link'
import { alternates } from '@/constants/metadata'
import {
  HackathonStatus,
  useGetAllHackathonInfoQuery,
} from '@/graphql/generated/hooks'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { Suspense } from 'react'
import ExploreHackathonSkeleton from './components/explore-hackathon-skeleton'
import HackathonExplorePage from './components/explore-page'
import { HACKATHON_STATUS } from './constants/data'

export async function generateMetadata({
  params,
}: { params: { locale: string } }) {
  const { locale } = params

  return {
    title: 'Explore Hackathons',
    alternates: alternates(locale, `${MenuLink.EXPLORE}`),
  }
}

const HackathonExplore = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: useGetAllHackathonInfoQuery.getKey(),
    queryFn: useGetAllHackathonInfoQuery.fetcher({
      where: {
        status: { equals: HACKATHON_STATUS },
      },
      status: HackathonStatus.Ongoing,
      page: 1,
      limit: 9,
    }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ExploreHackathonSkeleton />}>
        <HackathonExplorePage />
      </Suspense>
    </HydrationBoundary>
  )
}

export default HackathonExplore
