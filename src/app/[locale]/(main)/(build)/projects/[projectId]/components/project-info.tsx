'use client'

import { Link } from '@/app/navigation'
import MenuLink from '@/constants/menu-link'
import { useProjectQuery } from '@/hooks/project/query'
import { useUser } from '@/store/user'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@hackquest/ui/shared/avatar'
import { Button } from '@hackquest/ui/shared/button'
import { LuArrowRight, LuImage } from 'react-icons/lu'

export function ProjectInfo() {
  const currentUser = useUser()
  const { data } = useProjectQuery()

  const isCreator = currentUser?.id === data?.creatorId

  return (
    <div className="flex flex-col gap-6 max-sm:pt-6 sm:mx-auto sm:max-w-[613px]">
      <div className="flex gap-4">
        <Avatar className="size-20 rounded-2xl border border-neutral-300 sm:size-32">
          <AvatarImage className="object-cover" src={data?.logo ?? ''} />
          <AvatarFallback className="bg-neutral-100">
            <LuImage className="size-9 text-secondary-neutral" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-3">
          <h1 className="sm:title-1 title-3 line-clamp-1">{data?.name}</h1>
          <p className="sm:body-m body-s line-clamp-2">
            {data?.detail?.oneLineIntro}
          </p>
        </div>
      </div>
      {isCreator && (
        <Link href={`${MenuLink.HACKATHON_PROJECTS}/${data?.id}/edit`}>
          <Button className="w-full">
            Edit Project
            <LuArrowRight className="icon-hover-translate size-4" />
          </Button>
        </Link>
      )}
    </div>
  )
}
