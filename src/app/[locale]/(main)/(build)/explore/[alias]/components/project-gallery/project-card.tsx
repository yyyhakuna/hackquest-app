'use client'

import { Link, useRouter } from '@/app/navigation'
import MenuLink from '@/constants/menu-link'
import type { ProjectExtend } from '@/graphql/generated/graphql'
import {
  HackathonJoinState,
  useLikeProjectMutation,
} from '@/graphql/generated/hooks'
import { AuthType, useAuthStore } from '@/store/auth'
import { useAuthenticated } from '@/store/user'
import { cn } from '@hackquest/ui/lib/utils'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@hackquest/ui/shared/avatar'
import { Card } from '@hackquest/ui/shared/card'
import { Tag } from '@hackquest/ui/shared/tag'
import { useQueryClient } from '@tanstack/react-query'
import * as React from 'react'
import toast from 'react-hot-toast'
import { LuHeart, LuImage } from 'react-icons/lu'
import { useShallow } from 'zustand/react/shallow'

export function ProjectCard({
  project,
  rewardId,
  isReward = false,
  isSearch = false,
}: {
  project: ProjectExtend
  rewardId?: number
  isReward?: boolean
  isSearch?: boolean
}) {
  const isAuthenticated = useAuthenticated()
  const { setAuthType, setAuthModalOpen } = useAuthStore(
    useShallow(state => ({
      setAuthType: state.setAuthType,
      setAuthModalOpen: state.setAuthModalOpen,
    })),
  )
  const router = useRouter()
  const queryClient = useQueryClient()
  const reward = project?.rewards?.find(r => r.id === rewardId)
  const winner = project?.winner?.find(w => w.rewardId === rewardId)
  const hackathonStatus = reward?.hackathonStatus || []
  const isEnd = hackathonStatus.includes(HackathonJoinState.VotingClose)
  const { mutateAsync } = useLikeProjectMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: query =>
          ['HackathonListProjects', 'FindHackathonReward'].includes(
            query.queryKey[0] as string,
          ),
      })
    },
  })

  function likeProject() {
    if (!isAuthenticated) {
      setAuthModalOpen(true)
      setAuthType(AuthType.SIGN_IN)
      return
    }
    toast.promise(mutateAsync({ likeProjectId: project?.id! }), {
      loading: 'Loading...',
      success: project.isLiked ? 'Unliked project' : 'Liked project',
      error: project.isLiked
        ? 'Failed to unlike project'
        : 'Failed to like project',
    })
  }

  const likeHandle = () => {
    return (
      <div
        onClick={e => {
          e.preventDefault()
          likeProject()
        }}
        className="flex h-[4.0625rem] w-[4.0625rem] flex-col items-center justify-center gap-[.375rem] rounded-[.5rem] border border-neutral-300"
      >
        <LuHeart
          className={cn('size-4', project.isLiked && 'fill-destructive-400')}
        />
        <span className="headline-s text-primary-neutral">{project.likes}</span>
      </div>
    )
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const renderHeaderRight = React.useCallback(() => {
    if (isSearch) return null
    if (!isReward) {
      return likeHandle()
    }
    if (isEnd) {
      return (
        <div className="headline-s absolute top-6 right-0 flex h-8 items-center rounded-l-[1.125rem] bg-primary px-6 text-neutral-800">
          {winner?.name}
        </div>
      )
    } else {
      if (reward?.rank?.rank === 1) {
        return (
          <div className="headline-s absolute top-6 right-0 flex h-8 items-center rounded-l-[1.125rem] bg-primary px-6 text-neutral-800">
            Most popular
          </div>
        )
      } else {
        return likeHandle()
      }
    }
  }, [project])

  return (
    <Link href={`${MenuLink.HACKATHON_PROJECTS}/${project.alias}`}>
      <Card className="relative h-full p-6">
        <div className="flex justify-between">
          <Avatar className="size-20 rounded-2xl">
            <AvatarImage className="object-cover" src={project.logo ?? ''} />
            <AvatarFallback className="bg-neutral-100">
              <LuImage className="size-9 text-secondary-neutral" />
            </AvatarFallback>
          </Avatar>
          {renderHeaderRight()}
        </div>
        <h1 className="sm:title-3 title-5 mt-3 line-clamp-2 sm:text-2xl">
          {project.name}
        </h1>
        <p className="body-s mt-3 line-clamp-2 h-[42px] text-secondary-neutral">
          {project.detail?.oneLineIntro}
        </p>
        <div className="mt-6 space-y-1.5">
          {isReward ? (
            <>
              {reward?.disableJudge ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="body-s text-neutral-400">Votes Type</span>
                    <span className="headline-s text-primary-neutral">
                      Off site voting
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span className="body-s text-neutral-400">Rank</span>
                    <span className="headline-s text-primary-neutral">
                      {reward?.rank?.rank}/{reward?.rank?.total}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="body-s text-neutral-400">Votes</span>
                    <span className="headline-s text-primary-neutral">
                      {reward?.votes}
                    </span>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <span className="body-s text-neutral-400">Ecosystem</span>
                <span className="headline-s text-primary-neutral">
                  {project.ecology?.[0] || ''}
                </span>
              </div>
            </>
          )}

          <div className="flex items-center justify-between">
            <span className="body-s text-neutral-400">Builder</span>
            <div
              onClick={event => {
                event.preventDefault()
                event.stopPropagation()
                router.push(
                  `${MenuLink.USER_PROFILE}/${project.teamLead?.username}`,
                )
              }}
              className="inline-flex items-center gap-1.5"
            >
              <Avatar className="size-6">
                <AvatarImage
                  className="object-cover"
                  src={project.teamLead?.avatar ?? ''}
                />
                <AvatarFallback className="bg-neutral-100">
                  {project.teamLead?.nickname?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="headline-s text-primary-neutral">
                {project.teamLead?.nickname}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {project?.tracks?.map((track: string) => (
            <Tag key={track} className="body-s rounded-full bg-primary-100">
              {track}
            </Tag>
          ))}
        </div>
      </Card>
    </Link>
  )
}
