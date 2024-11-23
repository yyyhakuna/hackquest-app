'use client'

import { useConnectGithubMutation } from '@/graphql/generated/hooks'
import { useEventListener } from '@/hooks/use-event-listener'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { notFound } from 'next/navigation'
import toast from 'react-hot-toast'
import { LuChevronLeft } from 'react-icons/lu'
import { AttestationItem } from './components/attestations/attestation-item'
import { Web3BuilderScore } from './components/builder-score'
import { Certification } from './components/certification'
import { Experience } from './components/experience'
import { Hackathon } from './components/hackathon'
import { BasicProfile } from './components/profile/basic-profile'
import { CompleteProfile } from './components/profile/complete-profile'
import { Resume } from './components/resume'
import { UserActivity } from './components/user-activity'
import { useUserProfile } from './utils/query'
import { useAttestationStore } from './utils/store'

export default function Page() {
  const [parent] = useAutoAnimate()
  const { expanded, setExpanded } = useAttestationStore()
  const { data: profile } = useUserProfile()

  const connectGithub = useConnectGithubMutation({
    meta: {
      invalidates: [['FindUserProfile']],
    },
  })

  function eventHandler(event: MessageEvent) {
    const data = event.data
    if (data.source === 'github' && data.accessToken) {
      toast.promise(
        connectGithub.mutateAsync({ accessToken: data.accessToken }),
        {
          loading: 'Connecting github...',
          success: 'Github connected',
          error: 'Timeout while connecting github',
        },
      )
    }
  }

  useEventListener('message', eventHandler)

  if (!profile) {
    notFound()
  }

  return (
    <div className="-mt-8 h-full w-full space-y-8">
      <BasicProfile />
      <div className="pb-16 sm:flex sm:justify-center">
        <div className="flex-1 space-y-8 max-sm:px-6 sm:max-w-[1136px] sm:px-8">
          <CompleteProfile />
          <Web3BuilderScore />
          <UserActivity />
          <Certification />
          <Resume />
          <Experience />
          <Hackathon />
        </div>
        <div
          data-state={expanded ? 'expanded' : 'collapsed'}
          className="group relative hidden border-l border-l-neutral-300 p-3 duration-300 data-[state=collapsed]:w-0 data-[state=expanded]:w-80 sm:flex sm:items-center"
          ref={parent}
        >
          <button
            type="button"
            className="-left-3 absolute top-[calc(50%-0.75rem)] inline-flex size-6 items-center justify-center rounded-full border border-secondary-neutral bg-neutral-white text-secondary-neutral outline-none"
            onClick={() => setExpanded(!expanded)}
          >
            <LuChevronLeft className="size-4 duration-200 group-data-[state=expanded]:rotate-180" />
          </button>
          {expanded && (
            <div className="w-full pr-6 pl-2">
              <AttestationItem />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
