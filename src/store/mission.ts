'use client'

import { useMissionStore } from '@/providers/root/mission-provider'
import { createStore } from 'zustand'

export type MissionStore = {
  coin: number
  updateCoin: VoidFunction
}

export const createMissionStore = (initialState?: any) =>
  createStore<MissionStore>(set => ({
    coin: initialState,
    updateCoin: () => {
      set(() => ({
        coin: 1,
      }))
    },
  }))

export const useCoin = () => useMissionStore(state => state.coin)
