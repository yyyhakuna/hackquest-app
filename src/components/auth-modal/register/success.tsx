import { useResendConfirmEmailMutation } from '@/graphql/generated/hooks'
import { useAuthStore } from '@/store/auth'
import { Button } from '@hackquest/ui/shared/button'
import { useTranslations } from 'next-intl'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { FiMail } from 'react-icons/fi'
import { useShallow } from 'zustand/react/shallow'

interface SuccessProps {
  email: string
}
const Success: React.FC<SuccessProps> = ({ email }) => {
  const t = useTranslations()
  const { authRouteType, setAuthType } = useAuthStore(
    useShallow(state => ({
      authRouteType: state.authRouteType,
      setAuthType: state.setAuthType,
    })),
  )
  const timer = useRef<NodeJS.Timeout | null>(null)
  const [count, setCount] = useState(60)
  const countdown = () => {
    timer.current = setInterval(() => {
      setCount(pre => pre - 1)
    }, 1000)
  }
  const { mutate, isPending } = useResendConfirmEmailMutation({
    onSuccess: () => {
      setCount(60)
      countdown()
      toast.success('resend email successfully')
    },
    onError: (err: string) => {
      toast.error(err)
    },
  })
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    countdown()
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [])

  useEffect(() => {
    if (!count && timer.current) clearInterval(timer.current)
  }, [count])
  return (
    <div className="flex flex-col items-center gap-6">
      <FiMail size={60} />
      <p className="title-1 text-neutral-800">
        {t('Auth.verifyText.verifyEmail')}
      </p>
      <p className="body-l text-neutral-500">
        {t('Auth.verifyText.verifyEmailTips')}
      </p>
      <div className="flex w-full flex-col gap-4">
        <Button
          loading={isPending}
          onClick={() => {
            mutate({
              email,
            })
          }}
          disabled={!!count}
        >{`${t('Auth.resendLink')}${count > 0 ? `(${count}S)` : ''}`}</Button>
        <Button
          variant="outline"
          color="neutral"
          onClick={() => setAuthType(authRouteType.prevType!)}
        >
          {t('Auth.changeEmail')}
        </Button>
      </div>
    </div>
  )
}

export default Success
