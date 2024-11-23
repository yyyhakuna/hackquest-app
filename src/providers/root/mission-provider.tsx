'use client'

import { type MissionStore, createMissionStore } from '@/store/mission'
import * as React from 'react'
import { type StoreApi, useStore } from 'zustand'

export const MissionContext =
  React.createContext<StoreApi<MissionStore> | null>(null)

export function MissionProvider({
  children,
  initialState,
}: Readonly<{
  children: React.ReactNode
  initialState?: any
}>) {
  const storeRef = React.useRef<StoreApi<MissionStore> | null>(null)

  if (!storeRef.current) {
    storeRef.current = createMissionStore(initialState)
  }

  return (
    <MissionContext.Provider value={storeRef.current}>
      {children}
    </MissionContext.Provider>
  )
}

export function useMissionStore<T>(selector: (state: MissionStore) => T) {
  const store = React.useContext(MissionContext)
  if (!store) {
    throw new Error('MissionProvider is missing')
  }
  return useStore(store, selector)
}
