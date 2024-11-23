'use client'

import { Link } from '@/app/navigation'
import { DeleteAlertDialog } from '@/components/common/delete-alert-dialog'
import { trackTagColors } from '@/constants/global'
import MenuLink from '@/constants/menu-link'
import type { ProjectExtend } from '@/graphql/generated/graphql'
import {
  useCopyProjectMutation,
  useQuitProjectMutation,
} from '@/graphql/generated/hooks'
import { useToggle } from '@/hooks/utils/use-toggle'
import dayjs from '@/lib/dayjs'
import { copyText } from '@/lib/utils'
import { useUser } from '@/store/user'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@hackquest/ui/shared/avatar'
import { Card } from '@hackquest/ui/shared/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@hackquest/ui/shared/dropdown-menu'
import { Tag } from '@hackquest/ui/shared/tag'
import toast from 'react-hot-toast'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { LuCopy, LuImage, LuMoreVertical, LuShare2 } from 'react-icons/lu'
import { RxExit } from 'react-icons/rx'

export function ProjectCard({
  project,
}: {
  project: ProjectExtend
}) {
  const currentUser = useUser()
  const [open, onOpenChange] = useToggle(false)

  const isCreator = project?.creatorId === currentUser?.id

  const { mutateAsync } = useCopyProjectMutation({
    meta: {
      invalidates: [['ListProjectsBySelf']],
    },
  })

  const quitProject = useQuitProjectMutation({
    meta: {
      invalidates: [['ListProjectsBySelf']],
    },
    onSuccess: () => {
      toast.success('You have quit this project')
      onOpenChange(false)
    },
    onError: () => {
      toast.error('Failed to quit project')
    },
  })

  function copyProject() {
    toast.promise(mutateAsync({ copyProjectId: project.id }), {
      loading: 'Loading...',
      success: 'Project duplicated',
      error: 'Failed to duplicate project',
    })
  }

  return (
    <Link href={`${MenuLink.HACKATHON_PROJECTS}/${project.alias}`}>
      <Card className="h-full p-6">
        <div className="flex justify-between">
          <Avatar className="size-20 rounded-2xl">
            <AvatarImage className="object-cover" src={project.logo ?? ''} />
            <AvatarFallback className="bg-neutral-100">
              <LuImage className="size-9 text-secondary-neutral" />
            </AvatarFallback>
          </Avatar>
          <div className="space-x-6">
            {isCreator && (
              <button
                type="button"
                className="outline-none"
                onClick={async event => {
                  event.stopPropagation()
                  event.preventDefault()
                  event.nativeEvent.stopImmediatePropagation()
                  const url = `${window.origin}/project/${project.team?.code}/invite?user=${project.teamLead?.nickname}&project=${project.name}`
                  await copyText(encodeURI(url))
                  toast.success('Invite link copied')
                }}
              >
                <AiOutlineUserAdd className="size-6" />
              </button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="outline-none"
                  onClick={event => event.stopPropagation()}
                >
                  <LuMoreVertical className="size-6" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[180px]" align="start">
                <DropdownMenuItem
                  className="headline-s gap-3"
                  onClick={async event => {
                    event.stopPropagation()
                    const url = `${window.location.origin}/projects/${project.alias}`
                    await copyText(url)
                    toast.success('Share link copied')
                  }}
                >
                  <LuShare2 className="size-4" />
                  <span>Share Link</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="headline-s gap-3"
                  onClick={event => {
                    event.stopPropagation()
                    onOpenChange(true)
                  }}
                >
                  <RxExit className="size-4" />
                  <span>Quit Project</span>
                </DropdownMenuItem>
                {isCreator && (
                  <DropdownMenuItem
                    className="headline-s gap-3"
                    onClick={event => {
                      event.stopPropagation()
                      copyProject()
                    }}
                  >
                    <LuCopy className="size-4" />
                    <span className="whitespace-nowrap">Duplicate Project</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <h1 className="sm:title-3 title-5 mt-3 line-clamp-1 sm:text-2xl">
          {project.name}
        </h1>
        <p className="body-s mt-3 line-clamp-2 h-[42px] text-secondary-neutral">
          {project.detail?.oneLineIntro}
        </p>
        <div className="mt-6 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="body-s text-neutral-400">Last Edit</span>
            <span className="headline-s text-primary-neutral">
              {dayjs(project.updatedAt).format('YYYY-MM-DD')}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="body-s text-neutral-400">Builder</span>
            <object>
              <Link
                href={`${MenuLink.USER_PROFILE}/${project.teamLead?.username}`}
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
              </Link>
            </object>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          {project?.tracks?.slice(0, 4)?.map((track: string) => (
            <Tag key={track} color={trackTagColors[track]} className="body-s">
              {track}
            </Tag>
          ))}
        </div>
      </Card>
      <DeleteAlertDialog
        open={open}
        onOpenChange={onOpenChange}
        title="Quit Project"
        description="You are about to quit this project. This action will remove your project from the competition."
        loading={quitProject.isPending}
        onConfirm={event => {
          event.stopPropagation()
          quitProject.mutate({ quitProjectId: project.id })
        }}
      />
    </Link>
  )
}
