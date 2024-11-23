import MenuLink from '@/constants/menu-link'
import { alternates } from '@/constants/metadata'
import { type Blog, useListBlogsQuery } from '@/graphql/generated/hooks'
import { getQueryClient } from '@/providers/root/query-client'
import { blogFeaturedQueryOptions, } from '@/service/blog'
import {
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query'
import type { Metadata } from 'next'
import type React from 'react'
import BlogContent from './components'
import { parseSearchParams } from './constants/data'

type BlogPageProp = {
  params: {
    locale: string
  }
  searchParams: Record<string, any>
}

export async function generateMetadata({
  params,
  searchParams,
}: BlogPageProp): Promise<Metadata> {
  let query = new URLSearchParams(searchParams as any).toString()
  query = query ? '?' + query : ''
  const { locale } = params
  const metadata: Metadata = {
    title: 'Blog',
    alternates: alternates(locale, `${MenuLink.BLOG}${query}`),
  }

  return metadata
}

const BlogPage: React.FC<BlogPageProp> = async ({ searchParams }) => {
  const queryClient = getQueryClient()
  const { listBlogs } = await queryClient.fetchQuery({
    queryKey: useListBlogsQuery.getKey(parseSearchParams(searchParams)),
    queryFn: useListBlogsQuery.fetcher(parseSearchParams(searchParams)),
  })
  const { listBlogs: featuredBlog } = await queryClient.fetchQuery(
    blogFeaturedQueryOptions(),
  )
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogContent
        blog={listBlogs as { data: Blog[]; total: number }}
        featuredBlogs={featuredBlog?.data as Blog[]}
      />
    </HydrationBoundary>
  )
}

export default BlogPage
