'use client'

import { Link } from '@/app/navigation'
import { DeleteAlertDialog } from '@/components/common/delete-alert-dialog'
import MenuLink from '@/constants/menu-link'
import type { HackathonMemberExtend } from '@/graphql/generated/graphql'
import { useRemoveMemberMutation } from '@/graphql/generated/hooks'
import { useToggle } from '@/hooks/utils/use-toggle'
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
import { useQueryClient } from '@tanstack/react-query'
import * as React from 'react'
import toast from 'react-hot-toast'
import { AiOutlineUserDelete } from 'react-icons/ai'
import { LuMapPin, LuMoreVertical } from 'react-icons/lu'

export function TeamMemberCard({
  editable = false,
  projectId = null,
  member,
}: {
  editable?: boolean
  projectId: string | null
  member: HackathonMemberExtend
}) {
  const queryClient = useQueryClient()
  const [open, onOpenChange] = useToggle(false)
  const currentUser = useUser()

  const isTeamLead = currentUser?.id === member?.userId

  const { mutateAsync, isPending } = useRemoveMemberMutation()

  function onRemoveMember() {
    toast
      .promise(mutateAsync({ projectId: projectId!, memberId: member.id }), {
        loading: 'Removing member...',
        success: 'Member removed',
        error: 'Failed to remove member',
      })
      .then(() => {
        onOpenChange(false)
        queryClient.invalidateQueries({ queryKey: ['FindUniqueProject'] })
      })
      .catch(_error => {
      })
  }

  return (
    <React.Fragment>
      <Link href={`${MenuLink.USER_PROFILE}/${member?.username}`}>
        <Card className="relative flex flex-col items-center justify-center gap-6 rounded-2xl p-6">
          {editable && !isTeamLead && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="absolute top-6 right-10 outline-none"
                  onClick={event => event.stopPropagation()}
                >
                  <LuMoreVertical className="size-6" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[180px]" align="start">
                <DropdownMenuItem
                  className="headline-s gap-3"
                  onClick={event => {
                    event.stopPropagation()
                    onOpenChange(true)
                  }}
                >
                  <AiOutlineUserDelete className="size-5" />
                  <span className="whitespace-nowrap">Remove Member</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Avatar className="size-20">
            <AvatarImage src={member?.avatar ?? ''} />
            <AvatarFallback>{member?.nickname?.charAt(0)}</AvatarFallback>
          </Avatar>
          <h3 className="font-bold font-next-book text-2xl">
            {member?.nickname}
          </h3>
          {member.location ? (
            <p className="flex items-center gap-1">
              <LuMapPin className="size-4" />
              <span className="body-s">{member?.location}</span>
            </p>
          ) : (
            <div className="h-[21px] w-28 rounded-md bg-neutral-200/80" />
          )}
          {member.bio ? (
            <p className="body-s line-clamp-2 h-[42px] text-center text-secondary-neutral">
              {member?.bio}
            </p>
          ) : (
            <div className="h-[42px] w-full rounded-md bg-neutral-200/80" />
          )}
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {member.skills?.length
              ? member?.skills?.map(skill => (
                  <Tag color="yellow" className="body-s" key={skill}>
                    {skill}
                  </Tag>
                ))
              : new Array(3)
                  .fill(null)
                  .map((_, index) => (
                    <div
                      className="h-[29px] w-20 rounded-md bg-neutral-200/80"
                      key={index}
                    />
                  ))}
          </div>
        </Card>
      </Link>
      <DeleteAlertDialog
        open={open}
        onOpenChange={onOpenChange}
        title="Remove Member"
        loading={isPending}
        description="Are you sure you want to remove this member from your team? This action cannot be undone."
        onConfirm={event => {
          event.stopPropagation()
          onRemoveMember()
        }}
      />
    </React.Fragment>
  )
}
