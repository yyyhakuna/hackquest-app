import type { BlogOrderByWithRelationInput, BlogWhereInput, InputMaybe } from '@/graphql/generated/graphql'

export interface BlogSearchType {
  keyword?: string
  category?: string
  sort?: string
  page?: number
  limit?: number
}

export type PagedType = {
  page?: number
  limit?: number
}

export interface BlogQueryParamType {
  page?: number
  limit?: number
  where?: InputMaybe<BlogWhereInput>
  orderBy?: BlogOrderByWithRelationInput
}

