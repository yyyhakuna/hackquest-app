import type {
  CreationTabValue,
  CreationType,
} from '@/components/hackathon-creation/constants/data'
import * as React from 'react'

export type CreationProgress = {
  [key in CreationTabValue]: boolean
}

interface HackathonCreationContextType {
  creationType: CreationType
  setCreationType: (type: CreationType) => void
  selectedTab: CreationTabValue
  setSelectedTab: (tab: CreationTabValue) => void
  progress: CreationProgress
  setProgress: React.Dispatch<React.SetStateAction<CreationProgress>>
}

export const HackathonCreationContext =
  React.createContext<HackathonCreationContextType>(null!)

export const HackathonCreationProvider = HackathonCreationContext.Provider

export function useHackathonCreationContext() {
  return React.useContext(HackathonCreationContext)
}
