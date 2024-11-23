import { create } from 'zustand'

export enum GlobalModal {
  NOTIFICATION = 'notification',
  CERTIFICATE = 'certificate',
}

type ModalType = GlobalModal | null

export interface GlobalModalType {
  modalOpen: boolean
  setModalOpen: (open: boolean) => void
  modalType: ModalType
  setModalType: (modalType: ModalType) => void
}

export const useGlobalModalStore = create<GlobalModalType>()(set => ({
  modalOpen: false,
  setModalOpen: open => set({ modalOpen: open }),
  modalType: null,
  setModalType: type => set({ modalType: type }),
}))
