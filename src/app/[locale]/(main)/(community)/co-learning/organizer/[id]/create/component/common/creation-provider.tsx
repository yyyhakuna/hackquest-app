import type { CoLearning } from '@/graphql/generated/hooks'
import * as React from 'react'
import type { TabsValue } from '../../constant'

//   export type CreationProgress = {
//     [key in CreationTabValue]: boolean
//   }

interface ColearningContextType {
  selectedTab: TabsValue
  setSelectedTab: (tab: TabsValue) => void
  data: CoLearning
  //0 represent to save and continue, 1 represent to preview
  continueButtonStatus: number
  setContinueButtonStatus: (num: number) => void
}

export const ColearningContext = React.createContext<ColearningContextType>(
  null!,
)

export const ColearningProvider = ColearningContext.Provider

export function useColearningContext() {
  return React.useContext(ColearningContext)
}
