'use client'

import { Link } from '@/app/navigation'
import { VideoPlayer } from '@/components/common/video-player'
import MenuLink from '@/constants/menu-link'
import { useListEcosystemsQuery } from '@/graphql/generated/hooks'
import { useProjectQuery } from '@/hooks/project/query'
import { useUser } from '@/store/user'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@hackquest/ui/shared/avatar'
import { Separator } from '@hackquest/ui/shared/separator'
import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from '@hackquest/ui/shared/tabs'
import { Tag } from '@hackquest/ui/shared/tag'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@hackquest/ui/shared/tooltip'
import Image from 'next/image'
import * as React from 'react'
import { AiOutlineGithub } from 'react-icons/ai'
import { LuLayers } from 'react-icons/lu'
import { Card } from './card'
import { ProjectScore } from './project-score'
import ProjectVote from './project-vote'

function Tracks({ tracks = [] }: { tracks?: string[] }) {
  return (
    <Card>
      {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
      <label className="body-s text-neutral-400">Sector</label>
      <div className="mt-3 flex gap-3">
        <div className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-neutral-200">
          <LuLayers className="size-6" />
        </div>
        <div className="flex flex-wrap items-center gap-6">
          {tracks.map(track => (
            <span className="headline-l" key={track}>
              {track}
            </span>
          ))}
        </div>
      </div>
    </Card>
  )
}

function Ecosystems({
  ecology = [],
}: {
  ecology?: string[]
}) {
  const { data } = useListEcosystemsQuery(
    {},
    {
      staleTime: Number.POSITIVE_INFINITY,
      select: data => data.listEcosystems?.data,
    },
  )

  const ecosystems = React.useMemo(() => {
    return data?.filter(e => ecology.includes(e.type ?? ''))
  }, [data, ecology])

  return (
    <Card>
      {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
      <label className="body-s text-neutral-400">Ecology</label>
      <div className="mt-3 flex flex-wrap items-center gap-6">
        {ecosystems?.map(ecosystem => (
          <div className="relative size-12 overflow-hidden" key={ecosystem.id}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Image
                    src={ecosystem.image}
                    alt={ecosystem.type ?? ''}
                    fill
                    className="cursor-pointer rounded-full"
                  />
                </TooltipTrigger>
                <TooltipContent className="rounded-lg border-2 border-neutral-200 bg-neutral-white px-3 py-2 text-primary-neutral shadow-card">
                  <p className="headline-m">{ecosystem.type}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
      </div>
    </Card>
  )
}

function Placeholder({ message }: { message: string }) {
  return (
    <div className="flex aspect-video items-center justify-center rounded-xl bg-neutral-100">
      <span className="body-m text-secondary-neutral">{message}</span>
    </div>
  )
}

function Videos({
  pitchVideo,
  demoVideo,
  isCreator,
}: {
  pitchVideo?: string | null
  demoVideo?: string | null
  isCreator: boolean
}) {
  const hasVideos = pitchVideo || demoVideo

  if (!hasVideos && !isCreator) {
    return null
  }

  return (
    <div className="space-y-6">
      <h2 className="title-3">Videos</h2>
      <Tabs defaultValue={pitchVideo ? 'pitch-video' : 'demo-video'}>
        <TabsList>
          {pitchVideo && (
            <TabsTrigger value="pitch-video">Pitch Video</TabsTrigger>
          )}
          {demoVideo && (
            <TabsTrigger value="demo-video">Demo Video</TabsTrigger>
          )}
          {isCreator && !demoVideo && (
            <TabsTrigger value="demo-video">Demo Video</TabsTrigger>
          )}
          {isCreator && !pitchVideo && (
            <TabsTrigger value="pitch-video">Pitch Video</TabsTrigger>
          )}
          <TabsIndicator />
        </TabsList>
        <Separator className="my-6" />
        {pitchVideo ? (
          <TabsContent value="pitch-video">
            <VideoPlayer url={pitchVideo} />
          </TabsContent>
        ) : (
          isCreator && (
            <TabsContent value="pitch-video">
              <Placeholder message="Please Upload Pitch Video" />
            </TabsContent>
          )
        )}
        {demoVideo ? (
          <TabsContent value="demo-video">
            <VideoPlayer url={demoVideo} />
          </TabsContent>
        ) : (
          isCreator && (
            <TabsContent value="demo-video">
              <Placeholder message="Please Upload Demo Video" />
            </TabsContent>
          )
        )}
      </Tabs>
    </div>
  )
}

export function Overview() {
  const { data } = useProjectQuery()
  const currentUser = useUser()
  const isCreator = currentUser?.id === data?.creatorId
  const score = data?.progress || 20

  return (
    <>
      <ProjectVote />
      <div className="grid gap-6 sm:container max-sm:px-6 sm:grid-cols-[1fr_280px]">
        <div className="space-y-6 max-sm:order-1 sm:space-y-12">
          <Videos
            pitchVideo={data?.pitchVideo}
            demoVideo={data?.demoVideo}
            isCreator={isCreator}
          />
          {data?.detail?.detailedIntro && (
            <div className="space-y-6">
              <h2 className="title-3">Description</h2>
              <div
                className="prose"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                  __html: data.detail.detailedIntro,
                }}
              />
            </div>
          )}
          {data?.detail?.progress && (
            <div className="space-y-6">
              <h2 className="title-3">Progress During Hackathon</h2>
              <p className="body-s">{data?.detail?.progress}</p>
            </div>
          )}
          {(data?.teachStack?.length ?? 0) > 0 && (
            <div className="space-y-6">
              <h2 className="title-3">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {data?.teachStack?.map(tag => (
                  <Tag
                    className="body-m inline-flex h-12 items-center justify-center rounded-lg bg-neutral-100 px-6 py-2"
                    key={tag}
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
          )}
          {data?.addition?.fundraisingStatus && (
            <div className="space-y-6">
              <h2 className="title-3">Fundraising Status</h2>
              <p className="body-s">{data?.addition?.fundraisingStatus}</p>
            </div>
          )}
        </div>
        <div className="max-sm:order-0">
          <div className="space-y-6 sm:sticky sm:top-24">
            {isCreator && <ProjectScore score={score} />}
            <Card className="space-y-3">
              {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
              <label className="body-s text-neutral-400">Team Leader</label>
              <Link
                className="flex items-center gap-6"
                href={`${MenuLink.USER_PROFILE}/${data?.teamLead?.username}`}
              >
                <Avatar className="size-[60px]">
                  <AvatarImage
                    src={data?.teamLead?.avatar ?? ''}
                    alt="avatar"
                  />
                  <AvatarFallback>
                    {data?.teamLead?.nickname?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="headline-m">{data?.teamLead?.nickname}</span>
              </Link>
            </Card>
            {data?.addition?.isOpenSource && (
              <Card className="space-y-3">
                {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                <label className="body-s text-neutral-400">Open Source</label>
                <div className="flex items-center gap-6">
                  <AiOutlineGithub className="size-[60px] shrink-0" />
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <h3 className="headline-m">Github Link</h3>
                    <Link
                      className="headline-s block truncate text-blue hover:underline"
                      href={data?.addition?.githubLink ?? ''}
                      target="_blank"
                    >
                      {data?.addition?.githubLink}
                    </Link>
                  </div>
                </div>
              </Card>
            )}
            {(data?.tracks?.length ?? 0) > 0 && (
              <Tracks tracks={data?.tracks ?? []} />
            )}
            {(data?.ecology?.length ?? 0) > 0 && (
              <Ecosystems ecology={data?.ecology ?? []} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
