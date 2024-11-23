import { queryOptions } from '@tanstack/react-query'
import webApi from '..'

export const courseQueryOptions = (params?: Record<string, any>) => {
  return queryOptions({
    queryKey: ['get-courses', { ...params }],
    staleTime: Number.POSITIVE_INFINITY,
    queryFn: async () => webApi.courseApi.getCourses(params),
  })
}
