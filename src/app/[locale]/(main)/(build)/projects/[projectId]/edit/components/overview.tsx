'use client'

import { FormEditor } from '@/components/common/form-editor'
import { FormInput } from '@/components/common/form-input'
import { FormTextarea } from '@/components/common/form-textarea'
import {
  useFindTracksQuery,
  useListEcosystemsQuery,
  useUpdateProjectMutation,
} from '@/graphql/generated/hooks'
import { useProjectId, useProjectQuery } from '@/hooks/project/query'
import { shortenHex } from '@/lib/utils'
import { WalletAvatar } from '@/providers/wallet/wallet-avatar'
import { cn } from '@hackquest/ui/lib/utils'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@hackquest/ui/shared/avatar'
import {
  CheckboxCards,
  CheckboxCardsItem,
} from '@hackquest/ui/shared/checkbox-cards'
import { IconButton } from '@hackquest/ui/shared/icon-button'
import { Separator } from '@hackquest/ui/shared/separator'
import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from '@hackquest/ui/shared/tabs'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'
import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AiOutlineGithub } from 'react-icons/ai'
import { FiPlusSquare } from 'react-icons/fi'
import { LuLayers, LuUnlink, LuWallet } from 'react-icons/lu'
import { Card } from '../../components/card'
import { ProjectScore } from '../../components/project-score'
import { getCurrentScore } from '../utils/current-score'
import type { FormValues } from '../utils/validations'
import { TechTag } from './tech-tag'
import { UploadVideo } from './upload-video'

function Tracks() {
  const { setValue, watch } = useFormContext<FormValues>()
  const value = watch('tracks') ?? []

  const { data } = useFindTracksQuery(
    {},
    {
      select: data => data.tracks,
      staleTime: Number.POSITIVE_INFINITY,
    },
  )

  return (
    <Card>
      <span className="body-s text-neutral-400">Sector</span>
      {value.length > 0 ? (
        <div className="mt-3 flex gap-3">
          <div className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-neutral-200">
            <LuLayers className="size-6" />
          </div>
          <div className="flex flex-wrap items-center gap-6">
            {value.map(track => (
              <span className="headline-l" key={track}>
                {track}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-3 flex items-center gap-3">
          <IconButton className="size-12 shrink-0 cursor-default border-none bg-primary enabled:hover:bg-primary">
            <FiPlusSquare className="size-6" />
          </IconButton>
          <span className="headline-l">Add Sector</span>
        </div>
      )}
      <CheckboxCards
        value={value}
        onValueChange={value => setValue('tracks', value)}
        className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3"
      >
        {data?.map(track => (
          <CheckboxCardsItem key={track} value={track}>
            {track}
          </CheckboxCardsItem>
        ))}
      </CheckboxCards>
    </Card>
  )
}

function Ecosystems() {
  const { setValue, watch } = useFormContext<FormValues>()
  const { data } = useListEcosystemsQuery(
    {},
    {
      staleTime: Number.POSITIVE_INFINITY,
      select: data => data.listEcosystems?.data,
    },
  )

  const value = watch('ecology') ?? []

  const ecosystems = React.useMemo(() => {
    return data?.filter(e => value.includes(e.type ?? ''))
  }, [data, value])

  return (
    <Card>
      <span className="body-s text-neutral-400">Ecology</span>
      {value.length > 0 ? (
        <div className="mt-3 flex flex-wrap items-center gap-6">
          {ecosystems?.map(ecosystem => (
            <div
              className="relative size-12 overflow-hidden"
              key={ecosystem.id}
            >
              <Image
                src={ecosystem.image}
                alt={ecosystem.type ?? ''}
                fill
                className="rounded-full"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-3 flex items-center gap-3">
          <IconButton className="size-12 shrink-0 cursor-default border-none bg-primary enabled:hover:bg-primary">
            <FiPlusSquare className="size-6" />
          </IconButton>
          <span className="headline-l">Add Ecology</span>
        </div>
      )}
      <CheckboxCards
        value={value}
        onValueChange={value => setValue('ecology', value)}
        className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3"
      >
        {data?.map(ecosystem => (
          <CheckboxCardsItem key={ecosystem.id} value={ecosystem.type ?? ''}>
            {ecosystem.type}
          </CheckboxCardsItem>
        ))}
      </CheckboxCards>
    </Card>
  )
}

export function Overview() {
  const projectId = useProjectId()
  const { data } = useProjectQuery()
  const form = useFormContext<FormValues>()

  const progress = getCurrentScore(form)

  const pitchVideoUrl = form.watch('pitchVideo')
  const demoVideoUrl = form.watch('demoVideo')

  const update = useUpdateProjectMutation({
    meta: {
      invalidates: [['FindUniqueProject'], ['ListProjectsBySelf']],
    },
  })

  async function onConnect(address: string) {
    form.setValue('wallet', address)
    toast.promise(
      update.mutateAsync({
        where: { id: projectId },
        data: {
          wallet: { set: address },
          progress: { set: progress + 10 },
        },
      }),
      {
        loading: 'Connecting wallet...',
        success: 'Wallet connected',
        error: 'Failed to connect wallet',
      },
    )
  }

  function onDisconnect() {
    form.setValue('wallet', null)
    toast.promise(
      update.mutateAsync({
        where: { id: projectId },
        data: {
          wallet: { set: null },
          progress: { set: progress - 10 },
        },
      }),
      {
        loading: 'Disconnecting wallet...',
        success: 'Wallet disconnected',
        error: 'Failed to disconnect wallet',
      },
    )
  }

  return (
    <div className="grid gap-6 sm:container max-sm:px-6 sm:grid-cols-[1fr_512px]">
      <div className="space-y-6 max-sm:order-1 sm:space-y-12">
        <div className="space-y-6">
          <h2 className="title-3">Videos</h2>
          <Tabs defaultValue="pitchVideo">
            <TabsList>
              <TabsTrigger value="pitchVideo">Pitch Video</TabsTrigger>
              <TabsTrigger value="demoVideo">Demo Video</TabsTrigger>
              <TabsIndicator />
            </TabsList>
            <Separator className="my-6" />
            <TabsContent value="pitchVideo">
              <UploadVideo videoUrl={pitchVideoUrl} type="pitchVideo" />
            </TabsContent>
            <TabsContent value="demoVideo">
              <UploadVideo videoUrl={demoVideoUrl} type="demoVideo" />
            </TabsContent>
          </Tabs>
        </div>
        <div className="space-y-6">
          <h2 className="title-3">Description</h2>
          <FormEditor
            control={form.control}
            name="detailedIntro"
            className="sm:h-80"
            placeholder="Detailed Intro of Your Project"
          />
        </div>
        <div className="space-y-6">
          <h2 className="title-3">Progress During Hackathon</h2>
          <FormTextarea
            control={form.control}
            name="progress"
            placeholder="Progress During Hackathon"
          />
        </div>
        <TechTag />
        <div className="space-y-6">
          <h2 className="title-3">Fundraising Status</h2>
          <FormTextarea
            control={form.control}
            name="fundraisingStatus"
            placeholder="Fundraising Status"
          />
        </div>
        <div className="space-y-6">
          <h2 className="title-3">Wallet</h2>
          <ConnectButton.Custom>
            {({ openConnectModal, account, mounted }) => {
              return (
                <button
                  type="button"
                  disabled={!mounted || update.isPending}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-2xl border-neutral-300 bg-neutral-100 p-5',
                    {
                      'justify-center': !data?.wallet,
                    },
                  )}
                  onClick={() => {
                    if (!account?.address) {
                      toast.error('Please connect your wallet first')
                      openConnectModal()
                      return
                    }
                    !data?.wallet && onConnect(account.address)
                  }}
                >
                  {data?.wallet ? (
                    <WalletAvatar address={data?.wallet} size={28} />
                  ) : (
                    <LuWallet className="size-7" />
                  )}
                  <span className="headline-m">
                    {data?.wallet ? shortenHex(data.wallet) : 'Connect Wallet'}
                  </span>
                  {data?.wallet && (
                    <div
                      className="ml-auto flex cursor-pointer items-center gap-2"
                      onClick={event => {
                        event.stopPropagation()
                        onDisconnect()
                      }}
                    >
                      <LuUnlink className="size-4" />
                      <span className="body-m underline">Disconnect</span>
                    </div>
                  )}
                </button>
              )
            }}
          </ConnectButton.Custom>
        </div>
      </div>
      <div className="max-sm:order-0">
        <div className="space-y-6 sm:sticky sm:top-24">
          <ProjectScore score={getCurrentScore(form)} />
          <Card>
            <span className="body-s text-neutral-400">Team Leader</span>
            <div className="mt-3 flex items-center gap-6">
              <Avatar className="size-[60px]">
                <AvatarImage src={data?.teamLead?.avatar ?? ''} alt="avatar" />
                <AvatarFallback>
                  {data?.teamLead?.nickname?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="headline-m text-primary-neutral">
                {data?.teamLead?.nickname}
              </span>
            </div>
          </Card>
          <Card>
            <span className="body-s text-neutral-400">Open Source</span>
            <div className="mt-3 flex items-center gap-3">
              <AiOutlineGithub className="size-12" />
              <FormInput
                control={form.control}
                name="githubLink"
                placeholder="Provide the github link"
              />
            </div>
          </Card>
          <Tracks />
          <Ecosystems />
        </div>
      </div>
    </div>
  )
}
