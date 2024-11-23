import { useFindProjectSubmitInfoQuery } from '@/graphql/generated/hooks'
import { isUUID } from '@/lib/is'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { projectQueryOptions } from './query-options'

export function useProjectId() {
  const params = useParams()
  return params.projectId as string
}

export function useProjectQuery() {
  const projectId = useProjectId()
  return useSuspenseQuery(projectQueryOptions(projectId))
}

export function useProjectSubmitInfoQuery() {
  const projectId = useProjectId()
  const where = { id: projectId }
  return useQuery({
    enabled: isUUID(projectId),
    queryKey: useFindProjectSubmitInfoQuery.getKey({
      where,
    }),
    queryFn: useFindProjectSubmitInfoQuery.fetcher({
      where,
    }),
    staleTime: Number.POSITIVE_INFINITY,
    select: data => data.info,
  })
}
