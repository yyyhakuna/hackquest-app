import { execute } from '@/graphql/generated/execute'
import {
  type BlogOrderByWithRelationInput,
  FindUniqueBlogDocument,
  ListBlogsDocument,
} from '@/graphql/generated/graphql'
import { queryOptions } from '@tanstack/react-query'
import type { BlogQueryParamType } from './type'

export const blogQueryOptions = (params: BlogQueryParamType) => {
  return queryOptions({
    queryKey: ['blogs-get', { ...params }],
    queryFn: async () => execute(ListBlogsDocument, params),
    staleTime: 0,
  })
}

export const blogFeaturedQueryOptions = () => {
  return queryOptions({
    queryKey: ['featured-blog-get'],
    queryFn: async () =>
      execute(ListBlogsDocument, {
        page: 1,
        limit: 7,
        orderBy: {
          createdAt: 'desc',
        } as BlogOrderByWithRelationInput,
      }),
    staleTime: Number.POSITIVE_INFINITY,
  })
}

export const blogDetailQueryOptions = (alias: string) => {
  const param = { where: { alias } }
  return queryOptions({
    queryKey: ['blog-detail-get', alias],
    queryFn: async () => execute(FindUniqueBlogDocument,param),
  })
}
