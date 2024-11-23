import * as React from 'react'

type TimelineContextValue = {
  creating: number
  editing: string[]
  setEditing: React.Dispatch<React.SetStateAction<string[]>>
  setCreating: React.Dispatch<React.SetStateAction<number>>
}

export const TimelineContext = React.createContext<TimelineContextValue>({
  creating: 0,
  editing: [],
  setEditing: () => {},
  setCreating: () => {},
})

export function useTimelineContext() {
  return React.useContext(TimelineContext)
}

export const TimelineProvider = TimelineContext.Provider
