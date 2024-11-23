import { create } from 'zustand'

export type ModalType = 'edit-profile' | 'onboarding' | 'create-experience'

type DialogStore = {
  open: boolean
  type: ModalType | null
  state: Record<string, any>
  onOpen: (type: ModalType, state?: Record<string, any>) => void
  onClose: (type?: ModalType) => void
}

export const useDialogStore = create<DialogStore>(set => ({
  open: false,
  type: null,
  state: {},
  onOpen: (type: ModalType, state = {}) => set({ open: true, type, state }),
  onClose: () => set({ open: false, type: null, state: {} }),
  setState: (newState = {}) =>
    set(initialState => ({ state: { ...initialState.state, ...newState } })),
}))

type AttestationStore = {
  step: number
  open: boolean
  expanded: boolean
  state: Record<string, any>
  activeIds: string[]
  setStep: (step: number) => void
  onOpen: (state: { type: string; sourceId: string }) => void
  onOpenChange: (open: boolean) => void
  setExpanded: (expanded: boolean) => void
  setState: (newState: Record<string, any>) => void
  setActiveIds: (id: string) => void
  reset: () => void
}

export const useAttestationStore = create<AttestationStore>((set, get) => ({
  step: 1,
  open: false,
  expanded: false,
  state: {},
  activeIds: [],
  setStep: step => set({ step }),
  onOpen: newState =>
    set(initialState => ({
      open: true,
      state: { ...initialState.state, ...newState },
    })),
  onOpenChange: open => set({ open }),
  setExpanded: expanded => set({ expanded }),
  setState: (newState = {}) =>
    set(initialState => ({ state: { ...initialState.state, ...newState } })),
  setActiveIds: id =>
    set({
      activeIds: get().activeIds.includes(id)
        ? get().activeIds.filter(i => i !== id)
        : get().activeIds.concat(id),
    }),
  reset: () => set({ step: 1, open: false, state: {}, activeIds: [] }),
}))
