import * as React from 'react'

export interface HackathonRegistrationContextValue {
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
  open: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

export const HackathonRegistrationContext =
  React.createContext<HackathonRegistrationContextValue>({
    step: 1,
    setStep: () => {},
    open: false,
    onOpenChange: () => {},
  })

export const HackathonRegistrationProvider =
  HackathonRegistrationContext.Provider

export function useHackathonRegistrationContext() {
  return React.useContext(HackathonRegistrationContext)
}
