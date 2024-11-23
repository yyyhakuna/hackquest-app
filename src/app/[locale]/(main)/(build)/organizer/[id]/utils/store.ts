import type { HackathonExtend } from '@/graphql/generated/hooks'
import { create } from 'zustand'

type OrganizerStore = {
  hackathon: HackathonExtend | null
  setHackathon: (h: HackathonExtend) => void
}

export const useOrganizerStore = create<OrganizerStore>((set, _get) => ({
  hackathon: null,
  setHackathon: h => set({ hackathon: h }),
}))
