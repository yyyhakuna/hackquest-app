import { DeleteAlertDialog } from '@/components/common/delete-alert-dialog'
import MenuLink from '@/constants/menu-link'
import {
  type HackathonExtend,
  useQuitHackathonMutation,
} from '@/graphql/generated/hooks'
import { useToggle } from '@/hooks/utils/use-toggle'
import { copyText } from '@/lib/utils'
import { cn } from '@hackquest/ui/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@hackquest/ui/shared/dropdown-menu'
import { useQueryClient } from '@tanstack/react-query'
import * as React from 'react'
import toast from 'react-hot-toast'
import { FiMoreVertical } from 'react-icons/fi'
import { LuShare2 } from 'react-icons/lu'
import { RxExit } from 'react-icons/rx'

interface MoreProp {
  hackathon: HackathonExtend
  className?: string
}

const More: React.FC<MoreProp> = ({ hackathon, className }) => {
  const queryClient = useQueryClient()
  const [open, onOpenChange] = useToggle(false)

  const quitHackathon = useQuitHackathonMutation()

  function onConfirm() {
    toast
      .promise(quitHackathon.mutateAsync({ hackathonId: hackathon.id }), {
        loading: 'Quitting hackathon...',
        success: 'You have quit this hackathon',
        error: 'Failed to quit hackathon',
      })
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['ListHackathonsBySelf'] })
      })
      .finally(() => {
        onOpenChange(false)
      })
  }

  return (
    <React.Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="border-none outline-none"
            onClick={event => event.stopPropagation()}
          >
            <FiMoreVertical
              className={cn(
                'size-6 cursor-pointer text-neutral-800',
                className,
              )}
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[11.25rem]">
          <DropdownMenuItem
            className="gap-2"
            aria-label="Share Link"
            onClick={() => {
              copyText(
                `${window.origin}/${MenuLink.EXPLORE}/${hackathon.alias}`,
              )
              toast.success('Share link copied')
            }}
          >
            <LuShare2 className="size-4" />
            <span className="headline-s">Share Link</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-2"
            aria-label="Quit Hackathon"
            onClick={event => {
              event.stopPropagation()
              onOpenChange(true)
            }}
          >
            <RxExit className="size-4" />
            <span className="headline-s">Quit Hackathon</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteAlertDialog
        open={open}
        onOpenChange={onOpenChange}
        title="Quit Hackathon"
        loading={quitHackathon.isPending}
        description="If you are the team leader, this project will withdraw from this hackathon. If you are a team member, this project will quit."
        onConfirm={onConfirm}
      />
    </React.Fragment>
  )
}

export default More
