import Detail from '@/components/resource/blog-glossary/detail'
import MenuLink from '@/constants/menu-link'
import { alternates } from '@/constants/metadata'
import {
  type Blog,
  type Glossary,
  useFindUniqueGlossaryQuery,
} from '@/graphql/generated/hooks'
import { getQueryClient } from '@/providers/root/query-client'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import type { Metadata } from 'next'
import type React from 'react'

type GlossaryDetailPageProp = {
  params: {
    alias: string
    locale: string
  }
}

export async function generateMetadata({
  params,
}: GlossaryDetailPageProp): Promise<Metadata> {
  const { locale, alias } = params
  const queryClient = getQueryClient()
  const { findUniqueGlossary } = await queryClient.fetchQuery({
    queryKey: useFindUniqueGlossaryQuery.getKey({
      where: {
        alias,
      },
    }),
    queryFn: useFindUniqueGlossaryQuery.fetcher({
      where: {
        alias,
      },
    }),
  })

  return {
    title: findUniqueGlossary?.title,
    description: findUniqueGlossary?.description,
    alternates: alternates(locale, `${MenuLink.GLOSSARY}${params.alias}`),
  }
}

const GlossaryDetailPage: React.FC<GlossaryDetailPageProp> = async ({
  params,
}) => {
  const { alias } = params
  const queryClient = getQueryClient()
  const { findUniqueGlossary } = await queryClient.fetchQuery({
    queryKey: useFindUniqueGlossaryQuery.getKey({
      where: {
        alias,
      },
    }),
    queryFn: useFindUniqueGlossaryQuery.fetcher({
      where: {
        alias,
      },
    }),
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Detail type="glossary" info={findUniqueGlossary as Glossary & Blog} />
    </HydrationBoundary>
  )
}

export default GlossaryDetailPage
