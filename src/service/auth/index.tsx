import { execute } from '@/graphql/generated/execute'
import { GetUserInfoDocument } from '@/graphql/generated/graphql'
import { queryOptions } from '@tanstack/react-query'


export const userInfoQueryOptions = () => {
  return queryOptions({
    queryKey: ['user-info-get'],
    queryFn: () => execute(GetUserInfoDocument),
    staleTime: 0,
  })
}
