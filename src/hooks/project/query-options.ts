import { useFindUniqueProjectQuery } from '@/graphql/generated/hooks'
import { isUUID } from '@/lib/is'
import { queryOptions } from '@tanstack/react-query'

export const projectQueryOptions = (idOrAlias: string) => {
  const where = {
    ...(isUUID(idOrAlias)
      ? { id: idOrAlias }
      : { alias: decodeURI(idOrAlias) }),
  }

  return queryOptions({
    queryKey: useFindUniqueProjectQuery.getKey({ where }),
    queryFn: useFindUniqueProjectQuery.fetcher({ where }),
    staleTime: Number.POSITIVE_INFINITY,
    select: data => data?.findUniqueProject,
  })
}
