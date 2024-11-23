import type { EventsType } from './type'

import type { WebService } from '@hackquest/utils'

export enum EventsApiType {
  EVENTS = '/events',
}

class EventsApi {
  protected service: WebService
  constructor(service: WebService) {
    this.service = service
  }

  getEvents(params?: object) {
    return this.service.get<{ data: EventsType[]; total: number }>(`${EventsApiType.EVENTS}`, {
      params,
    })
  }

  getEventsDetailById(id: string) {
    return this.service.get<EventsType>(`${EventsApiType.EVENTS}/${id}`)
  }
}

export default EventsApi
