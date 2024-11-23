'use client'

import * as ResizablePanel from '@/components/common/resizable-panel'
import { ResponsiveDialog } from '@/components/common/responsive-dialog'
import { Steps } from '@/components/common/steps'
import useMediaQuery from '@/hooks/use-media-query'
import { DialogHeader, DialogTitle } from '@hackquest/ui/shared/dialog'
import * as React from 'react'
import { useUserProfile } from '../../utils/query'
import { useDialogStore } from '../../utils/store'
import { BuilderProfile } from './builder-profile'
import { ConnectAccounts } from './connect-accounts'
import { ProfileInfo } from './profile-info'

const steps = [
  {
    step: 1,
    component: ProfileInfo,
  },
  {
    step: 2,
    component: BuilderProfile,
  },
  {
    step: 3,
    component: ConnectAccounts,
  },
]

export function OnboardingDialog() {
  const [step, setStep] = React.useState(1)
  const { data: profile } = useUserProfile()
  const { open, type, onClose } = useDialogStore()
  const isSmallScreen = useMediaQuery('(max-width: 640px)')

  const modalOpen = open && type === 'onboarding'

  React.useEffect(() => {
    if (profile?.progress && open && profile.isOwnProfile) {
      const progress = profile.progress
      if (!progress.includes(1)) {
        setStep(1)
      } else if (!progress.includes(2)) {
        setStep(2)
      } else if (!progress.includes(3)) {
        setStep(3)
      }
    }
  }, [open, profile.isOwnProfile, profile?.progress])

  return (
    <ResponsiveDialog
      open={modalOpen}
      onOpenChange={() => onClose()}
      dialogContentProps={{
        className: 'sm:w-full sm:max-w-xl p-6',
        onPointerDownOutside: e => e.preventDefault(),
        onInteractOutside: e => e.preventDefault(),
      }}
      drawerContentProps={{
        onPointerDownOutside: e => e.preventDefault(),
        onInteractOutside: e => e.preventDefault(),
      }}
    >
      <DialogHeader className="pt-4 pb-6 sm:py-3">
        {isSmallScreen && (
          <DialogTitle className="title-3">Complete profile</DialogTitle>
        )}
        <Steps currentStep={step} className="sm:justify-start" />
      </DialogHeader>
      <ResizablePanel.Root value={step}>
        {steps.map(step => (
          <ResizablePanel.Item key={step.step} value={step.step}>
            <step.component setStep={setStep} onClose={onClose} />
          </ResizablePanel.Item>
        ))}
      </ResizablePanel.Root>
    </ResponsiveDialog>
  )
}
