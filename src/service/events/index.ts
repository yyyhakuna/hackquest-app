import { execute } from '@/graphql/generated/execute'
import { ListEventsDocument } from '@/graphql/generated/graphql'
import { queryOptions } from '@tanstack/react-query'
import type { EventsQueryParamType } from './type'

export const eventsQueryOptions = (params: EventsQueryParamType) => {
  return queryOptions({
    queryKey: ['events-get', { ...params }],
    queryFn: async () => execute(ListEventsDocument, params),
  })
}
