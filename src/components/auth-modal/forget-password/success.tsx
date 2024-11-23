import { AuthType, useAuthStore } from '@/store/auth'
import { Button } from '@hackquest/ui/shared/button'
import { useTranslations } from 'next-intl'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { FiLock } from 'react-icons/fi'
import { useShallow } from 'zustand/react/shallow'

type SuccessProp = {
  email: string
  onSubmit: (email: string, cb: VoidFunction) => void
  isPending: boolean
}

const Success: React.FC<SuccessProp> = ({ email, onSubmit, isPending }) => {
  const t = useTranslations()
  const { setAuthType } = useAuthStore(
    useShallow(state => ({
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
      <FiLock size={60} />
      <p className="title-1 text-neutral-800">{t('Auth.forgetPassword')}</p>
      <p className="body-l text-neutral-500">{t('Auth.forgetPasswordTips')}</p>
      <p className="body-l text-neutral-700 underline">{email}</p>
      <div className="flex w-full flex-col gap-4">
        <Button
          loading={isPending}
          disabled={!!count}
          onClick={() =>
            onSubmit(email, () => {
              setCount(60)
              countdown()
            })
          }
        >
          {`${t('Auth.sendLink')}${count > 0 ? `(${count}S)` : ''}`}
        </Button>
        <Button
          variant="outline"
          color="neutral"
          onClick={() => setAuthType(AuthType.SIGN_IN)}
        >
          {t('Common.back')}
        </Button>
      </div>
    </div>
  )
}

export default Success
