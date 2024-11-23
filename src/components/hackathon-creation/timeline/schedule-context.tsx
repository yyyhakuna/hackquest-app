import { HackathonScheduleType } from '@/graphql/generated/graphql'
import * as React from 'react'

export type Ids = {
  [key in HackathonScheduleType]: {
    creating: string[]
    editing: string[]
  }
}

export const defaultIds: Ids = {
  [HackathonScheduleType.RegisterOpen]: {
    creating: [],
    editing: [],
  },
  [HackathonScheduleType.SubmissionClose]: {
    creating: [],
    editing: [],
  },
  [HackathonScheduleType.Judging]: {
    creating: [],
    editing: [],
  },
}

type ScheduleContextValue = {
  ids: Ids
  setIds: React.Dispatch<React.SetStateAction<Ids>>
}

export const ScheduleContext = React.createContext<ScheduleContextValue>({
  ids: defaultIds,
  setIds: () => {},
})

export function useScheduleContext() {
  return React.useContext(ScheduleContext)
}

export const ScheduleProvider = ScheduleContext.Provider
