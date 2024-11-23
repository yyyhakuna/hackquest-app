'use client'
import { GlobalModal, useGlobalModalStore } from '@/store/global-modal'
import { Button } from '@hackquest/ui/shared/button'
import type React from 'react'
import { ResponsiveDialog } from '../common/responsive-dialog'

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface CertificateModalProp {}

const CertificateModal: React.FC<CertificateModalProp> = () => {
  const { modalOpen, setModalOpen, modalType } = useGlobalModalStore()
  return (
    <ResponsiveDialog
      open={modalType === GlobalModal.CERTIFICATE && modalOpen}
      onOpenChange={setModalOpen}
      dialogContentProps={{
        className: 'sm:max-w-[62.5rem] w-[62.5rem] bg-primary-100',
      }}
    >
      <div className="flex flex-col items-center gap-6 pt-14 pb-6">
        <div className="h-[18.75rem] w-[22.5625rem]">sdsds</div>
        <div className="title-1 text-center text-neutral-800">
          <p>You made it though! </p>
          <p>Congrats and keep on learning.</p>
        </div>
        <div className="mt-2 flex gap-5">
          <Button>Claim certificate</Button>
          <Button variant={'outline'} color={'neutral'}>
            Share my progress
          </Button>
        </div>
      </div>
    </ResponsiveDialog>
  )
}

export default CertificateModal
