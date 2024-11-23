import { FormInput } from '@/components/common/form-input'
import { useCreateUserMutation } from '@/graphql/generated/hooks'
import usePasswordValidates from '@/hooks/use-password-validates'
import { AuthType, useAuthStore } from '@/store/auth'
import { Button } from '@hackquest/ui/shared/button'
import { Checkbox } from '@hackquest/ui/shared/checkbox'
import { Form } from '@hackquest/ui/shared/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import type React from 'react'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiArrowRight, FiCheck, FiEye, FiEyeOff } from 'react-icons/fi'
import { z } from 'zod'
import { useShallow } from 'zustand/react/shallow'

const registerFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: 'password is a required input.',
  }),
  inviteCode: z.string().optional(),
})

interface RegisterFormProps {
  onSuccess: (email: string) => void
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const t = useTranslations()
  const { authRouteType, setAuthType } = useAuthStore(
    useShallow(state => ({
      authRouteType: state.authRouteType,
      setAuthType: state.setAuthType,
    })),
  )
  const [haveInviteCode, setHaveInviteCode] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: authRouteType.params?.email || '',
      password: '',
      inviteCode: '',
    },
  })
  const password = form.watch('password')
  const { getValidates } = usePasswordValidates()
  const passwordValidates = useMemo(() => {
    return getValidates(password)
  }, [password, getValidates])

  const onSubmit = (data: z.infer<typeof registerFormSchema>) => {
    const inviteCode = form.getValues('inviteCode')
    if (passwordValidates.some(v => !v.isValid)) {
      form.setError('password', {
        message: t('Auth.verifyText.passwordFormatError'),
      })
      return
    }
    if (haveInviteCode && !inviteCode) {
      form.setError('inviteCode', {
        message: t('Auth.verifyText.inviteCodeEmptyError'),
      })
      return
    }

    mutate({
      email: data.email,
      password: data.password,
      ...(haveInviteCode
        ? {
            inviteCode,
          }
        : {}),
    })
  }

  const { mutate, isPending } = useCreateUserMutation({
    onSuccess: (_, data) => {
      onSuccess(data.email)
    },
    onError: (err: string) => {
      toast.error(err)
    },
  })
  return (
    <div className="flex flex-col gap-6">
      <p className="title-1 text-center text-neutral-800">
        {t('Auth.createAccount')}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormInput
            label={t('Auth.email')}
            name="email"
            control={form.control}
          />
          <div className="flex flex-col gap-2">
            <FormInput
              label={t('Auth.password')}
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

          <div className="body-s flex flex-col gap-4 text-neutral-800">
            {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
            <label className="flex cursor-pointer items-center gap-2">
              <Checkbox
                checked={haveInviteCode}
                onClick={_e => {
                  setHaveInviteCode(!haveInviteCode)
                }}
              />
              <span>{`${t('Auth.haveInviteCode')}(${t('Common.optional')})`}</span>
            </label>
            {haveInviteCode && (
              <FormInput name="inviteCode" control={form.control} />
            )}
          </div>

          <div className="flex flex-col gap-4">
            <p className="body-xs text-neutral-500">{t('Auth.continueTips')}</p>
            <Button loading={isPending} type="submit">
              {t('Common.buttonText.continue')}
              <FiArrowRight />
            </Button>
          </div>
        </form>
      </Form>
      <div className="headline-m flex flex-col items-center gap-6 text-blue-800">
        <div>
          <span className="pr-2 text-neutral-800">
            {t('Auth.haveAccount')}?
          </span>
          <span
            className="cursor-pointer"
            onClick={() => setAuthType(AuthType.SIGN_IN)}
          >
            {t('Auth.signIn')}
          </span>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
