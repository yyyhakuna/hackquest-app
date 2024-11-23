import { queryOptions } from '@tanstack/react-query'
import webApi from '..'

export const ecosystemQueryOptions = (params?: Record<string, any>) => {
  return queryOptions({
    queryKey: ['get-ecosystems', { ...params }],
    staleTime: Number.POSITIVE_INFINITY,
    queryFn: async () => webApi.ecosystemApi.getEcosystems(params),
  })
}
