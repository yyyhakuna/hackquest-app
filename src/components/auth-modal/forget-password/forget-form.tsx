import { FormInput } from '@/components/common/form-input'
import { AuthType, useAuthStore } from '@/store/auth'
import { Button } from '@hackquest/ui/shared/button'
import { Form } from '@hackquest/ui/shared/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import type React from 'react'
import { useForm } from 'react-hook-form'
import { FiLock } from 'react-icons/fi'
import { z } from 'zod'
import { useShallow } from 'zustand/react/shallow'

const verifyFormSchema = z.object({
  email: z.string().email(),
})
interface ForgetFormProp {
  isPending: boolean
  onSubmit: (email: string) => void
}

const ForgetForm: React.FC<ForgetFormProp> = ({ isPending, onSubmit }) => {
  const t = useTranslations()
  const { setAuthType } = useAuthStore(
    useShallow(state => ({
      authRouteType: state.authRouteType,
      setAuthType: state.setAuthType,
    })),
  )
  const form = useForm<z.infer<typeof verifyFormSchema>>({
    resolver: zodResolver(verifyFormSchema),
    defaultValues: {
      email: '',
    },
  })
  return (
    <div className="flex flex-col items-center gap-6">
      <FiLock size={60} />
      <p className="title-1 text-neutral-800">{t('Auth.forgetPassword')}</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(data => onSubmit(data.email))}
          className="flex w-full flex-col gap-4"
        >
          <FormInput
            label={t('Auth.email')}
            name="email"
            control={form.control}
          />
          <div className="flex w-full flex-col gap-4">
            <Button type="submit" loading={isPending}>
              {t('Auth.resetPassword')}
            </Button>
            <Button
              variant="outline"
              type="button"
              color="neutral"
              onClick={() => {
                setAuthType(AuthType.SIGN_IN)
              }}
            >
              {t('Common.back')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ForgetForm
