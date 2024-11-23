import Detail from '@/components/resource/blog-glossary/detail'
import MenuLink from '@/constants/menu-link'
import { alternates } from '@/constants/metadata'
import {
  type Blog,
  type Glossary,
  useFindUniqueBlogQuery,
} from '@/graphql/generated/hooks'
import { getQueryClient } from '@/providers/root/query-client'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import type { Metadata } from 'next'
import type React from 'react'

type BlogDetailPageProp = {
  params: {
    alias: string
    locale: string
  }
}

export async function generateMetadata({
  params,
}: BlogDetailPageProp): Promise<Metadata> {
  const { locale, alias } = params
  const queryClient = getQueryClient()
  const { findUniqueBlog } = await queryClient.fetchQuery({
    queryKey: useFindUniqueBlogQuery.getKey({
      where: {
        alias: alias,
      },
    }),
    queryFn: useFindUniqueBlogQuery.fetcher({
      where: {
        alias: alias,
      },
    }),
  })
  return {
    title: findUniqueBlog?.title,
    description: findUniqueBlog?.description,
    alternates: alternates(locale, `${MenuLink.BLOG}${params.alias}`),
  }
}

const BlogDetailPage: React.FC<BlogDetailPageProp> = async ({ params }) => {
  const { alias } = params
  const queryClient = getQueryClient()
  const { findUniqueBlog } = await queryClient.fetchQuery({
    queryKey: useFindUniqueBlogQuery.getKey({
      where: {
        alias,
      },
    }),
    queryFn: useFindUniqueBlogQuery.fetcher({
      where: {
        alias,
      },
    }),
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Detail type="blog" info={findUniqueBlog as Glossary & Blog} />
    </HydrationBoundary>
  )
}

export default BlogDetailPage
