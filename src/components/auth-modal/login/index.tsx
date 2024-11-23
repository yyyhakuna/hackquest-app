import { useTranslations } from 'next-intl'
import type React from 'react'
import ThreePartyLogin from '../three-party-login'
import LoginFrom from './login-form'

const Login: React.FC = () => {
  const t = useTranslations()
  return (
    <div className="flex w-full flex-col gap-6">
      <p className="title-1 text-center text-neutral-800">{t('Auth.signIn')}</p>
      <ThreePartyLogin />
      <LoginFrom />
    </div>
  )
}

export default Login
