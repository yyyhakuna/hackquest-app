import {
  useFindHackathonPrizeTracksQuery,
  useFindUniqueHackathonQuery,
  useGetHackathonRegisterInfoQuery,
} from '@/graphql/generated/hooks'
import { queryOptions } from '@tanstack/react-query'

export function hackathonQueryOptions(id: string) {
  const where = { id }
  return queryOptions({
    queryKey: useFindUniqueHackathonQuery.getKey({ where }),
    queryFn: useFindUniqueHackathonQuery.fetcher({ where }),
    staleTime: Number.POSITIVE_INFINITY,
    select: data => data?.findUniqueHackathon,
  })
}

export function hackathonPrizeTracksOptions(hackathonId: string) {
  return queryOptions({
    queryKey: useFindHackathonPrizeTracksQuery.getKey({
      hackathonId,
    }),
    queryFn: useFindHackathonPrizeTracksQuery.fetcher({
      hackathonId,
    }),
    staleTime: Number.POSITIVE_INFINITY,
    select: data => data.prizeTracks,
  })
}

export function hackathonRegisterInfoQueryOptions(hackathonId: string) {
  return queryOptions({
    queryKey: useGetHackathonRegisterInfoQuery.getKey({ hackathonId }),
    queryFn: useGetHackathonRegisterInfoQuery.fetcher({ hackathonId }),
    staleTime: Number.POSITIVE_INFINITY,
    select: data => data?.info,
  })
}
