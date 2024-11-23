'use client'

import { useRouter } from '@/app/navigation'
import { FadeUp } from '@/components/common/fade-up'
import MenuLink from '@/constants/menu-link'
import { useJoinProjectMutation } from '@/graphql/generated/hooks'
import { useAuthStore } from '@/store/auth'
import { useAuthenticated } from '@/store/user'
import { Button } from '@hackquest/ui/shared/button'
import Image from 'next/image'
import { useParams, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { useShallow } from 'zustand/react/shallow'

export default function Page() {
  const router = useRouter()
  const { code } = useParams<{ code: string }>()
  const searchParams = useSearchParams()
  const isAuthenticated = useAuthenticated()

  const { setAuthModalOpen } = useAuthStore(
    useShallow(state => ({
      setAuthModalOpen: state.setAuthModalOpen,
    })),
  )

  const userName = searchParams.get('user')
  const projectName = searchParams.get('project')

  const { mutateAsync, isPending } = useJoinProjectMutation({
    meta: {
      invalidates: [['ListProjectsBySelf']],
    },
    onSuccess: () => {
      router.push(MenuLink.BUILDER_HOME)
    },
    onError: error => {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error(error)
    },
  })

  function joinProject() {
    if (!isAuthenticated) {
      setAuthModalOpen(true)
      toast.error('Please login to join the project')
      return
    }

    toast
      .promise(mutateAsync({ where: { code } }), {
        loading: 'Joining project...',
        success: 'You have joined the project!',
        error: 'Failed to join project',
      })
      .catch(error => {
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.error(error)
      })
  }

  return (
    <main className="flex h-full w-full items-center justify-center">
      <FadeUp className="flex w-[824px] flex-col items-center justify-center rounded-3xl bg-primary p-8">
        <h1 className="title-1 mt-5">{userName} Invite You To Project!</h1>
        <p className="body-s mt-1.5 text-secondary-neutral">{projectName}</p>
        <Button
          className="mt-8 px-10"
          variant="outline"
          color="neutral"
          disabled={isPending}
          onClick={joinProject}
        >
          Accept
        </Button>
        <div className="mt-16 flex items-center justify-center sm:mt-28">
          <Image
            src="/images/logo/onboarding.png"
            alt="hackquest"
            width={351}
            height={334}
          />
        </div>
      </FadeUp>
    </main>
  )
}
