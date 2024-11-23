import type { EventsOrderByWithRelationInput, EventsWhereInput, InputMaybe } from '@/graphql/generated/graphql'

export enum EventStatus {
  UPCOMING = 'upcoming',
  IN_PROGRESS = 'inProgress',
  PAST = 'past',
}

export interface EventsType {
  __typename?: string
  id?: string
  name?: string
  description?: string
  medias?: string[]
  tags?: string[]
  location?: string
  startTime?: string
  endTime: string
  eventUrl?: string
  prUrl?: string
}

export interface EventsQueryParamType {
  page?: number
  limit?: number
  where?: InputMaybe<EventsWhereInput>
  orderBy?: EventsOrderByWithRelationInput
}
