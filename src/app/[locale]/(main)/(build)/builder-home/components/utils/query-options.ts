import { useFindHackathonJudgeDetailByUserQuery } from '@/graphql/generated/hooks'
import { queryOptions } from '@tanstack/react-query'

export function findHackathonJudgeDetailByUser() {
  return queryOptions({
    queryKey: useFindHackathonJudgeDetailByUserQuery.getKey(),
    queryFn: useFindHackathonJudgeDetailByUserQuery.fetcher(),
    staleTime: Number.POSITIVE_INFINITY,
    select: data => data?.findHackathonJudgeDetailByUser,
  })
}
