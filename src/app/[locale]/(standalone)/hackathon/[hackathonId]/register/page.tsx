'use client'

import { Link } from '@/app/navigation'
import { AnimatedContent } from '@/components/common/animated-content'
import { Steps } from '@/components/common/steps'
import MenuLink from '@/constants/menu-link'
import { HackathonMode } from '@/graphql/generated/graphql'
import {
  useHackathonQuery,
  useHackathonRegisterInfoQuery,
} from '@/hooks/hackathon/query'
import { useToggle } from '@/hooks/utils/use-toggle'
import { Button } from '@hackquest/ui/shared/button'
import * as React from 'react'
import { SuccessAlertDialog } from '../components/success-alert-dialog'
import { AboutSection } from './components/about-section'
import { ContactSection } from './components/contact-section'
import { HackathonRegistrationProvider } from './components/context'
import { ProfileSection } from './components/profile-section'

const status = ['About', 'OnlineProfiles', 'Contact']

const titles = ['About You', 'Online Profiles', 'Your Contact'] as const

export default function Page() {
  const { data: hackathon } = useHackathonQuery()
  const { data: info } = useHackathonRegisterInfoQuery()

  const isOnline = hackathon?.info?.mode === HackathonMode.Online

  const [step, setStep] = React.useState(
    () => status.indexOf(info?.status || 'About') + 1,
  )

  const [open, onOpenChange] = useToggle(false)

  const aboutFields = hackathon?.info?.application?.About

  const profileFields = hackathon?.info?.application?.OnlineProfiles

  const contactFields = hackathon?.info?.application?.Contact

  const contextValue = React.useMemo(
    () => ({
      step,
      setStep,
      open,
      onOpenChange,
    }),
    [step, open, onOpenChange],
  )

  return (
    <HackathonRegistrationProvider value={contextValue}>
      <div className="rounded-3xl bg-neutral-white p-8">
        <Steps currentStep={step} />
        <h1 className="title-1 mt-4 mb-1.5 text-center">{titles[step - 1]}</h1>
        <p className="body-s text-center text-secondary-neutral">
          {hackathon?.name}
        </p>
        <AnimatedContent value={step ? step : 'empty'} className="flex-1">
          {step === 1 && <AboutSection fields={aboutFields} />}
          {step === 2 && <ProfileSection fields={profileFields} />}
          {step === 3 && <ContactSection fields={contactFields} />}
        </AnimatedContent>
        <SuccessAlertDialog
          title={
            isOnline
              ? 'Successfully Registered'
              : 'Your application is under review, stay tuned!'
          }
          description={hackathon?.name}
          open={open}
          onOpenChange={onOpenChange}
        >
          {isOnline && (
            <Link href={`/hackathon/${hackathon.id}/null/submit`}>
              <Button
                variant="outline"
                color="neutral"
                className="w-full sm:w-auto"
                onClick={() => onOpenChange(false)}
              >
                Submission project now
              </Button>
            </Link>
          )}
          <Link href={MenuLink.BUILDER_HOME}>
            <Button
              variant="outline"
              color="neutral"
              className="w-full sm:w-auto"
            >
              Back to my hackathon
            </Button>
          </Link>
        </SuccessAlertDialog>
      </div>
    </HackathonRegistrationProvider>
  )
}
