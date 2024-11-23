import { execute } from '@/graphql/generated/execute'
import { FindUniqueGlossaryDocument, ListGlossarysDocument, ListGlossarysTracksDocument } from '@/graphql/generated/graphql'
import { queryOptions } from '@tanstack/react-query'
import type { GlossaryQueryParamType } from './type'

export const glossaryQueryOptions = (params: GlossaryQueryParamType) => {
  return queryOptions({
    queryKey: ['glossary-get', params],
    queryFn: async () => execute(ListGlossarysDocument, params),
    staleTime: Number.POSITIVE_INFINITY,
  })
}

export const glossaryTrackQueryOptions = () => {
  return queryOptions({
    queryKey: ['glossary-track-get'],
    queryFn: async () => execute(ListGlossarysTracksDocument),
    staleTime: Number.POSITIVE_INFINITY,
  })
}

export const glossaryDetailQueryOptions = (alias: string) => {
  const param = { where: { alias } }
  return queryOptions({
    queryKey: ['glossary-detail-get', alias],
    queryFn: async () => execute(FindUniqueGlossaryDocument,param),
  })
}
