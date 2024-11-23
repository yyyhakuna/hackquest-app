import { useFindUniqueHackathonQuery } from '@/graphql/generated/hooks'
import { queryOptions } from '@tanstack/react-query'

export function hackathonQueryOptions(alias: string) {
  const where = { alias: decodeURIComponent(alias) }
  return queryOptions({
    queryKey: useFindUniqueHackathonQuery.getKey({ where }),
    queryFn: useFindUniqueHackathonQuery.fetcher({ where }),
    staleTime: Number.POSITIVE_INFINITY,
    select: data => data?.findUniqueHackathon,
  })
}
