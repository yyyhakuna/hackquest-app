'use client'
import AuthModal from '@/components/auth-modal'
import { Onboarding } from '@/components/onboarding'
import type { FC } from 'react'
import CertificateModal from '../certificate-modal'
import Notification from '../notification'

const GlobalModal: FC = () => {
  return (
    <>
      <AuthModal />
      <Onboarding />
      <Notification />
      <CertificateModal />
      {/* <DuckPet /> */}
    </>
  )
}

export default GlobalModal
