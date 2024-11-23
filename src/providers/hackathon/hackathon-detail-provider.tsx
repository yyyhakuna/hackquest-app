import type { InfoType } from '@/app/[locale]/(main)/(build)/explore/[alias]/constants/type'
import * as React from 'react'

interface HackathonDetailContextType {
  selectedTab: InfoType
  setSelectedTab: (tab: InfoType) => void
}

export const HackathonDetailContext =
  React.createContext<HackathonDetailContextType>(null!)

export const HackathonDetailProvider = HackathonDetailContext.Provider

export function useHackathonDetailContext() {
  return React.useContext(HackathonDetailContext)
}
