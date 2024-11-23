'use client'

import { AuthType, useAuthStore } from '@/store/auth'
import { useTranslations } from 'next-intl'
import type React from 'react'
import { useMemo } from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useShallow } from 'zustand/react/shallow'
import { threePartyOrigin } from '../contants/data'

const ThreePartyLogin: React.FC = () => {
  const { authRouteType } = useAuthStore(
    useShallow(state => ({
      authRouteType: state.authRouteType,
    })),
  )
  const t = useTranslations()
  const loginText = useMemo(() => {
    return authRouteType.type === AuthType.SIGN_IN
      ? t('Auth.signIn')
      : t('Common.buttonText.continue')
  }, [authRouteType, t])

  const threePartyLogin = (type: 'github' | 'google') => {
    const origin = threePartyOrigin.replace('/graphql', '')
    const path = `${origin}/auth/${type}`

    window.location.href = path
  }
  return (
    <div
      className={`flex-col gap-4 sm:flex ${authRouteType.type === AuthType.EMAIL_CHECK ? 'block' : 'hidden'}`}
    >
      <div className="headline-s flex flex-col gap-4 text-neutral-800 [&>div]:flex [&>div]:h-[3.5rem] [&>div]:items-center [&>div]:justify-center [&>div]:gap-4 [&>div]:rounded-[6.25rem] [&>div]:border-[.125rem] [&>div]:border-neutral-200 [&>div]:transition-colors [&>div]:duration-300">
        <div
          className="hover:bg-neutral-100"
          role="button"
          onClick={() => threePartyLogin('google')}
        >
          <FcGoogle size={24} />
          {t('Auth.threePartyLogin.google', {
            loginText,
          })}
        </div>
        <div
          className="hover:bg-neutral-100"
          role="button"
          onClick={() => threePartyLogin('github')}
        >
          <FaGithub size={24} />
          {t('Auth.threePartyLogin.github', {
            loginText,
          })}
        </div>
      </div>
      <div className="relative flex w-full justify-center">
        <div className="absolute top-[50%] left-0 h-[.0625rem] w-full bg-neutral-200 " />
        <div className="body-m relative bg-neutral-white px-6 text-neutral-500">
          {t('Common.or')}
        </div>
      </div>
    </div>
  )
}

export default ThreePartyLogin
