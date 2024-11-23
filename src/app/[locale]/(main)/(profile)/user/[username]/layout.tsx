import { getQueryClient } from '@/providers/root/query-client'
import type { Metadata } from 'next'
import * as React from 'react'
import { CreateAttestationsDialog } from './components/attestations/create-attestations-dialog'
import { EditExperienceDialog } from './components/experience/edit-experience-dialog'
import { OnboardingDialog } from './components/onboarding/onboarding-dialog'
import { EditProfileDialog } from './components/profile/edit-profile-dialog'
import {
  attestationsQueryOptions,
  userProfileQueryOptions,
} from './utils/query-options'

export async function generateMetadata({
  params: { username },
}: {
  params: { username: string }
}): Promise<Metadata> {
  const queryClient = getQueryClient()
  const { profile } = await queryClient.fetchQuery(
    userProfileQueryOptions(username),
  )
  return {
    title: profile?.user?.nickname,
  }
}

export default function Layout({
  params: { username },
  children,
}: {
  params: { username: string }
  children: React.ReactNode
}) {
  const queryClient = getQueryClient()

  queryClient.prefetchQuery(userProfileQueryOptions(username))
  queryClient.prefetchQuery(attestationsQueryOptions(username))

  return (
    <React.Suspense fallback={null}>
      {children}
      <EditProfileDialog />
      <EditExperienceDialog />
      <CreateAttestationsDialog />
      <OnboardingDialog />
    </React.Suspense>
  )
}
