import * as React from 'react'

export interface HackathonSubmissionContextValue {
  open: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

export const HackathonSubmissionContext =
  React.createContext<HackathonSubmissionContextValue>({
    open: false,
    onOpenChange: () => {},
  })

export const HackathonSubmissionProvider = HackathonSubmissionContext.Provider

export function useHackathonSubmissionContext() {
  return React.useContext(HackathonSubmissionContext)
}
