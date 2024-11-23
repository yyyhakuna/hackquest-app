import {
  useFindUserProfileQuery,
  useListUserAttestationsQuery,
} from '@/graphql/generated/hooks'
import { queryOptions } from '@tanstack/react-query'

export function userProfileQueryOptions(username: string) {
  return queryOptions({
    queryKey: useFindUserProfileQuery.getKey({ username }),
    queryFn: useFindUserProfileQuery.fetcher({ username }),
    staleTime: Number.POSITIVE_INFINITY,
  })
}

export function attestationsQueryOptions(username: string) {
  return queryOptions({
    queryKey: useListUserAttestationsQuery.getKey({ username }),
    queryFn: useListUserAttestationsQuery.fetcher({ username }),
    staleTime: Number.POSITIVE_INFINITY,
    select: data => data.attestations,
  })
}
