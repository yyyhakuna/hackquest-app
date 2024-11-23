import { AuthType, useAuthStore } from '@/store/auth'
import { Button } from '@hackquest/ui/shared/button'
import { FeedbackIcon } from '@hackquest/ui/shared/feedback-icon'
import { useTranslations } from 'next-intl'
import type React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { useShallow } from 'zustand/react/shallow'

const Success: React.FC = () => {
  const t = useTranslations()
  const { setAuthType } = useAuthStore(
    useShallow(state => ({
      setAuthType: state.setAuthType,
    })),
  )
  return (
    <div className="flex flex-col items-center gap-6">
      <FeedbackIcon size={'extra-large'} variant="success" />
      <p className="title-1 text-neutral-800">
        {t('Auth.resetPasswordSuccess')}
      </p>
      <p className="body-l text-neutral-500">
        {t('Auth.resetPasswordSuccessTips')}
      </p>
      <Button
        className="flex w-full items-center gap-2"
        onClick={() => setAuthType(AuthType.SIGN_IN)}
      >
        {t('Auth.continueLogin')}
        <FiArrowRight />
      </Button>
    </div>
  )
}

export default Success
