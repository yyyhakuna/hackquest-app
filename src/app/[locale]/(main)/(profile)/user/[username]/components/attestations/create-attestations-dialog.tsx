'use client'

import * as ResizablePanel from '@/components/common/resizable-panel'
import { ResponsiveDialog } from '@/components/common/responsive-dialog'
import { Steps } from '@/components/common/steps'
import { DialogHeader, DialogTitle } from '@hackquest/ui/shared/dialog'
import { useAttestationStore } from '../../utils/store'
import { AddAttestation } from './add-attestation'
import { ChooseService } from './choose-service'
import { ConnectWallet } from './connect-wallet'
import { SignAttestation } from './sign-attestation'

const steps = [
  {
    step: 1,
    title: 'Add an attestation',
    component: AddAttestation,
  },
  {
    step: 2,
    title: 'Choose a service',
    component: ChooseService,
  },
  {
    step: 3,
    title: 'Connect your wallet',
    component: ConnectWallet,
  },
  {
    step: 4,
    title: 'Sign attestation',
    component: SignAttestation,
  },
] as const

export function CreateAttestationsDialog() {
  const { open, step, onOpenChange } = useAttestationStore()

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      dialogContentProps={{
        className: 'p-6 sm:w-full sm:max-w-xl gap-6',
        onPointerDownOutside: e => e.preventDefault(),
        onInteractOutside: e => e.preventDefault(),
      }}
      drawerContentProps={{
        className: 'px-6 gap-4',
        onPointerDownOutside: e => e.preventDefault(),
        onInteractOutside: e => e.preventDefault(),
      }}
    >
      <DialogHeader>
        <DialogTitle className="title-3">{steps[step - 1]?.title}</DialogTitle>
        <Steps currentStep={step} totalStep={4} />
      </DialogHeader>
      <ResizablePanel.Root value={step}>
        {steps.map(step => (
          <ResizablePanel.Item key={step.step} value={step.step}>
            <step.component />
          </ResizablePanel.Item>
        ))}
      </ResizablePanel.Root>
    </ResponsiveDialog>
  )
}
