import MenuLink from '@/constants/menu-link'
import { alternates } from '@/constants/metadata'
import {
  type HackathonExtend,
  useFindUniqueHackathonQuery,
} from '@/graphql/generated/hooks'
import { getQueryClient } from '@/providers/root/query-client'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import type { Metadata } from 'next'
import type React from 'react'
import HackathonDetail from './components'

type HackathonDetailPageProp = {
  params: {
    alias: string
    locale: string
  }
}

export async function generateMetadata({
  params,
}: HackathonDetailPageProp): Promise<Metadata> {
  const { locale, alias } = params
  const queryClient = getQueryClient()
  const { findUniqueHackathon } = await queryClient.fetchQuery({
    queryKey: useFindUniqueHackathonQuery.getKey({
      where: {
        alias,
      },
    }),
    queryFn: useFindUniqueHackathonQuery.fetcher({
      where: {
        alias,
      },
    }),
  })
  return {
    title: findUniqueHackathon?.name,
    description: findUniqueHackathon?.info?.intro,
    alternates: alternates(locale, `${MenuLink.EXPLORE}/${params.alias}`),
  }
}

const HackathonDetailPage: React.FC<HackathonDetailPageProp> = async ({
  params,
}) => {
  const { alias } = params
  const queryClient = getQueryClient()
  const { findUniqueHackathon } = await queryClient.fetchQuery({
    queryKey: useFindUniqueHackathonQuery.getKey({
      where: {
        alias: decodeURIComponent(alias),
      },
    }),
    queryFn: useFindUniqueHackathonQuery.fetcher({
      where: {
        alias: decodeURIComponent(alias),
      },
    }),
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HackathonDetail hackathon={findUniqueHackathon as HackathonExtend} />
    </HydrationBoundary>
  )
}

export default HackathonDetailPage
