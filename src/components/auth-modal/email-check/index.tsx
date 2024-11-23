import { FormInput } from '@/components/common/form-input'
import { useEmailExistsMutation } from '@/graphql/generated/hooks'
import { AuthType, useAuthStore } from '@/store/auth'
import { Button } from '@hackquest/ui/shared/button'
import { Form } from '@hackquest/ui/shared/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import type React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiArrowRight } from 'react-icons/fi'
import { z } from 'zod'
import { useShallow } from 'zustand/react/shallow'
import ThreePartyLogin from '../three-party-login'

const verifyFormSchema = z.object({
  email: z.string().email(),
})

const EmailCheck: React.FC = () => {
  const { setAuthType } = useAuthStore(
    useShallow(state => ({
      setAuthType: state.setAuthType,
    })),
  )
  const form = useForm<z.infer<typeof verifyFormSchema>>({
    resolver: zodResolver(verifyFormSchema),
    defaultValues: {
      email: '',
    },
  })
  const t = useTranslations()

  const { mutate, isPending } = useEmailExistsMutation({
    onSuccess: (res, email) => {
      if (res.emailExists) {
        toast.error(t('Auth.hasRegistered'))
        setAuthType(AuthType.SIGN_IN)
      } else {
        setAuthType({
          type: AuthType.SIGN_UP,
          params: {
            email,
          },
        })
      }
    },
    onError: (err: string) => {
      toast.error(err)
    },
  })
  return (
    <div className="flex w-full flex-col gap-6">
      <p className="title-1 text-center text-neutral-800">
        {t('Auth.createAccount')}
      </p>
      <ThreePartyLogin />
      <div className="flex flex-col gap-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(data =>
              mutate({
                email: data.email,
              }),
            )}
            className="flex flex-col gap-4"
          >
            <FormInput
              label={t('Auth.email')}
              name="email"
              control={form.control}
            />
            <Button loading={isPending} type="submit">
              {t('Common.buttonText.continue')}
              <FiArrowRight />
            </Button>
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
    </div>
  )
}

export default EmailCheck
