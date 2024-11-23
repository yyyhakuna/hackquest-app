'use client'

import { AuthType, useAuthStore } from '@/store/auth'
import { Dialog, DialogContent } from '@hackquest/ui/shared/dialog'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import type React from 'react'
import { useEffect, useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { AnimatedContent } from '../common/animated-content'
import EmailCheck from './email-check'
import ForgetPassword from './forget-password'
import Login from './login'
import Register from './register'
import ResetPassword from './reset-password'

const AuthModal: React.FC = () => {
  const query = useSearchParams()
  const queryState = query.get('state')
  const type = query.get('type')
  const { authRouteType, setAuthType, authModalOpen, setAuthModalOpen } =
    useAuthStore(
      useShallow(state => ({
        authModalOpen: state.authModalOpen,
        authRouteType: state.authRouteType,
        setAuthType: state.setAuthType,
        setAuthModalOpen: state.setAuthModalOpen,
      })),
    )

  useEffect(() => {
    if (type || queryState) {
      setAuthType(type as AuthType)
      setAuthModalOpen(true)
    }
  }, [type, queryState, setAuthType, setAuthModalOpen])
  const authComponent = useMemo(() => {
    switch (authRouteType.type) {
      case AuthType.EMAIL_CHECK:
        return <EmailCheck />
      case AuthType.SIGN_IN:
        return <Login />
      case AuthType.SIGN_UP:
        return <Register />
      case AuthType.FORGOT_PASSWORD:
        return <ForgetPassword />
      case AuthType.CHANGE_PASSWORD:
        return <ResetPassword />
      default:
        return <Login />
    }
  }, [authRouteType])
  return (
    <Dialog open={authModalOpen} onOpenChange={setAuthModalOpen}>
      <DialogContent className="!rounded-none h-screen w-screen max-w-[100vw] sm:max-w-[100vw]">
        <div className="flex flex-col">
          <Image
            src="/images/logo/logo-text.svg"
            alt="hackquest-logo"
            priority
            width={134}
            height={16}
          />
          <div className="flex w-full flex-1 items-center justify-center">
            <div className="container flex items-center gap-[4rem]">
              <div className="hidden w-[37.5rem] justify-center sm:flex">
                <Image
                  src="/images/logo/hackquest-image.png"
                  alt="hackquest-image"
                  priority
                  width={320}
                  height={347}
                />
              </div>
              <AnimatedContent
                value={authRouteType.type ? authRouteType.type : 'empty'}
                initial={{ translateX: -50, opacity: 0 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-1 py-6 sm:p-6"
              >
                {authComponent}
              </AnimatedContent>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal
