import {
  useFindCourseUnitsQuery,
  useFindUniquePageQuery,
} from '@/graphql/generated/hooks'
import { queryOptions } from '@tanstack/react-query'

export function courseOptions(alias: string) {
  const where = { alias: { equals: decodeURIComponent(alias) } }
  return queryOptions({
    queryKey: useFindCourseUnitsQuery.getKey({ where }),
    queryFn: useFindCourseUnitsQuery.fetcher({ where }),
    select: data => data.findCourseDetail,
  })
}

export function lessonOptions(lessonId: string) {
  const where = {
    id: lessonId,
  }
  return queryOptions({
    queryKey: useFindUniquePageQuery.getKey({ where }),
    queryFn: useFindUniquePageQuery.fetcher({ where }),
  })
}
