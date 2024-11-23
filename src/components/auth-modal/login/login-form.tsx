import { useRouter } from '@/app/navigation'
import { FormInput } from '@/components/common/form-input'
import MenuLink from '@/constants/menu-link'
import { VoteRole, useLoginMutation } from '@/graphql/generated/hooks'
import { AuthType, useAuthStore } from '@/store/auth'
import { useUserActions } from '@/store/user'
import { Button } from '@hackquest/ui/shared/button'
import { Form } from '@hackquest/ui/shared/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import type React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiArrowRight } from 'react-icons/fi'
import { z } from 'zod'
import { useShallow } from 'zustand/react/shallow'

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: 'password is a required input.',
  }),
})

const LoginFrom: React.FC = () => {
  const { signIn } = useUserActions()
  const { setAuthType, setAuthModalOpen } = useAuthStore(
    useShallow(state => ({
      setAuthType: state.setAuthType,
      setAuthModalOpen: state.setAuthModalOpen,
    })),
  )
  const router = useRouter()
  const query = useSearchParams()
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const t = useTranslations()
  const { mutate, isPending } = useLoginMutation({
    meta: {
      invalidates: [['GetUserInfo']],
    },
    onSuccess: ({ data }) => {
      signIn(data)
      const redirect_url = query.get('redirect_url')
      setAuthModalOpen(false)
      if (data.user?.voteRole === VoteRole.Judge) {
        router.push(MenuLink.BUILDER_HOME)
        return
      }
      if (!redirect_url) {
        router.refresh()
        toast.success('Welcome back')
      } else {
        router.push(redirect_url)
      }
    },
    onError: (err: string) => {
      toast.error(err)
    },
  })
  return (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(data => mutate(data))}
          className="flex flex-col gap-4"
        >
          <FormInput
            label={t('Auth.email')}
            name="email"
            control={form.control}
          />
          <FormInput
            label={t('Auth.password')}
            type="password"
            name="password"
            control={form.control}
          />
          <Button loading={isPending} type="submit">
            {t('Auth.signIn')}
            <FiArrowRight />
          </Button>
        </form>
      </Form>
      <div className="headline-m flex flex-col items-center gap-6 text-blue-800">
        <div
          className="cursor-pointer"
          onClick={() => setAuthType(AuthType.FORGOT_PASSWORD)}
        >
          {t('Auth.forgetPassword')}?
        </div>
        <div>
          <span className="pr-2 text-neutral-800">
            {t('Auth.newHackquest')}?
          </span>
          <span
            className="cursor-pointer"
            onClick={() => setAuthType(AuthType.EMAIL_CHECK)}
          >
            {t('Auth.createAccount')}
          </span>
        </div>
      </div>
    </div>
  )
}

export default LoginFrom
