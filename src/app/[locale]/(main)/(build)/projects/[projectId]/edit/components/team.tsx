import { Link } from '@/app/navigation'
import { FormTextarea } from '@/components/common/form-textarea'
import MenuLink from '@/constants/menu-link'
import type { HackathonMemberExtend } from '@/graphql/generated/graphql'
import { useProjectId, useProjectQuery } from '@/hooks/project/query'
import { copyText } from '@/lib/utils'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@hackquest/ui/shared/avatar'
import { Button } from '@hackquest/ui/shared/button'
import { Input } from '@hackquest/ui/shared/input'
import { Separator } from '@hackquest/ui/shared/separator'
import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { LuCopy } from 'react-icons/lu'
import { Card } from '../../components/card'
import { TeamMemberCard } from '../../components/team-member-card'
import type { FormValues } from '../utils/validations'

function TeamIntro() {
  const form = useFormContext<FormValues>()
  const { data } = useProjectQuery()
  return (
    <div className="space-y-6">
      <h2 className="title-3">Team Intro</h2>
      <Card className="space-y-4 sm:space-y-6 sm:p-8">
        <div className="flex gap-4 max-sm:flex-col sm:items-center sm:gap-12">
          <div className="space-y-1.5 rounded-xl bg-neutral-100 p-2 sm:max-w-44">
            <Input disabled defaultValue={data?.team?.code} />
            <Button
              className="w-full"
              onClick={() => {
                const url = `${window.location.origin}/project/${data?.team?.code}/invite?user=${data?.teamLead?.nickname}&project=${data?.name}`
                copyText(url)
                toast.success('Invite link copied')
              }}
            >
              Invite Link
              <LuCopy className="size-4" />
            </Button>
          </div>
          <Separator className="sm:h-[6.75rem] sm:w-px" />
          <div className="w-full space-y-3 sm:max-w-[6.75rem]">
            {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
            <label className="body-m text-secondary-neutral">
              Team leader:
            </label>
            <Link
              href={`${MenuLink.USER_PROFILE}/${data?.teamLead?.username}`}
              className="flex items-center gap-1.5"
            >
              <Avatar className="size-6">
                <AvatarImage src={data?.teamLead?.avatar ?? ''} />
                <AvatarFallback>
                  {data?.teamLead?.nickname?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="headline-l">{data?.teamLead?.nickname}</span>
            </Link>
          </div>
          <Separator className="sm:h-[6.75rem] sm:w-px" />
          <div className="w-full">
            <FormTextarea
              control={form.control}
              name="intro"
              label="Intro"
              placeholder="Team Intro"
              maxLength={200}
            />
          </div>
        </div>
        {/* <Button type="button" className="w-full">
          Post Teammate Recruitment
          <LuArrowRight className="size-4" />
        </Button> */}
      </Card>
    </div>
  )
}

export function Team() {
  const { data } = useProjectQuery()
  const projectId = useProjectId()

  const sortedMembers = React.useMemo(() => {
    if (!data?.team?.members) return []
    const teamLeadId = data?.teamLead?.userId
    return [...data.team.members].sort((a, _b) =>
      a.userId === teamLeadId ? -1 : 1,
    )
  }, [data])

  return (
    <div className="space-y-6 sm:container max-sm:px-6">
      <TeamIntro />
      <div className="space-y-6">
        <h2 className="title-3">Team Member</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {sortedMembers?.map(member => (
            <TeamMemberCard
              member={member as HackathonMemberExtend}
              key={member?.userId}
              editable={true}
              projectId={projectId}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
