import { FormInput } from '@/components/common/form-input'
import { useResetPasswordMutation } from '@/graphql/generated/hooks'
import usePasswordValidates from '@/hooks/use-password-validates'
import { useAuthStore } from '@/store/auth'
import { Button } from '@hackquest/ui/shared/button'
import { Form } from '@hackquest/ui/shared/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import type React from 'react'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiCheck, FiEye, FiEyeOff, FiLock } from 'react-icons/fi'
import { z } from 'zod'
import { useShallow } from 'zustand/react/shallow'

const ResetFormSchema = z.object({
  password: z.string().min(1, {
    message: 'password is a required input.',
  }),
})

interface ResetFormProps {
  onSuccess: () => void
}

const ResetForm: React.FC<ResetFormProps> = ({ onSuccess }) => {
  const t = useTranslations()
  const { setAuthType } = useAuthStore(
    useShallow(state => ({
      setAuthType: state.setAuthType,
    })),
  )
  const query = useSearchParams()
  const access_token = query.get('access_token') as string
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm<z.infer<typeof ResetFormSchema>>({
    resolver: zodResolver(ResetFormSchema),
    defaultValues: {
      password: '',
    },
  })
  const password = form.watch('password')
  const { getValidates } = usePasswordValidates()
  const passwordValidates = useMemo(() => {
    return getValidates(password)
  }, [password, getValidates])

  const onSubmit = (data: z.infer<typeof ResetFormSchema>) => {
    if (passwordValidates.some(v => !v.isValid)) {
      form.setError('password', {
        message: t('Auth.verifyText.passwordFormatError'),
      })
      return
    }
    mutate({
      password: data.password,
      accessToken: access_token,
    })
  }
  const { mutate, isPending } = useResetPasswordMutation({
    onSuccess: () => {
      onSuccess()
    },
    onError: (err: string) => {
      toast.error(err)
    },
  })
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-6">
        <FiLock size={60} />
        <p className="title-1 text-neutral-800">{t('Auth.resetPassword')}</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <FormInput
              label={t('Auth.newPassword')}
              type={showPassword ? 'text' : 'password'}
              name="password"
              control={form.control}
              slot={
                <div className="cursor-pointer">
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </div>
              }
              slotProps={{
                onClick: () => setShowPassword(!showPassword),
                side: 'right',
              }}
            />
            <div className="body-xs flex flex-wrap gap-y-2 text-neutral-500">
              {passwordValidates?.map((v, i) => (
                <div
                  key={i}
                  className={`flex w-[50%] items-center gap-2 ${v.isValid && 'text-success-600'}`}
                >
                  <FiCheck />
                  <span>{v.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Button type="submit" loading={isPending}>
              {t('Auth.resetPassword')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ResetForm
