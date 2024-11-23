import { useRouter } from '@/app/navigation'
import { AuthType, useAuthStore } from '@/store/auth'
import { Button } from '@hackquest/ui/shared/button'
import { FeedbackIcon } from '@hackquest/ui/shared/feedback-icon'
import { useTranslations } from 'next-intl'
import type React from 'react'
import { FiRotateCcw } from 'react-icons/fi'
import { useShallow } from 'zustand/react/shallow'

const VerifyFail: React.FC = () => {
  const router = useRouter()
  const t = useTranslations()
  const { setAuthType } = useAuthStore(
    useShallow(state => ({
      setAuthType: state.setAuthType,
    })),
  )
  return (
    <div className="flex flex-col items-center gap-6">
      <FeedbackIcon size={'extra-large'} variant="error" />
      <p className="title-1 text-neutral-800">{t('Auth.verifyText.fail')}</p>
      <p className="body-l text-neutral-500">{t('Auth.verifyText.failTips')}</p>
      <Button
        className="flex w-full items-center gap-2"
        onClick={() => {
          router.push('/')
          setAuthType(AuthType.SIGN_IN)
        }}
      >
        {t('Common.buttonText.tryAgain')}
        <FiRotateCcw />
      </Button>
    </div>
  )
}

export default VerifyFail