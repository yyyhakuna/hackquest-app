'use client'

import { Link } from '@/app/navigation'
import { DeleteAlertDialog } from '@/components/common/delete-alert-dialog'
import MenuLink from '@/constants/menu-link'
import {
  type HackathonExtend,
  HackathonJoinState,
} from '@/graphql/generated/graphql'
import { useQuitHackathonMutation } from '@/graphql/generated/hooks'
import { useHackathonState } from '@/hooks/hackathon/query'
import useMediaQuery from '@/hooks/use-media-query'
import { useToggle } from '@/hooks/utils/use-toggle'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { cn } from '@hackquest/ui/lib/utils'
import { Button } from '@hackquest/ui/shared/button'
import { Card } from '@hackquest/ui/shared/card'
import { Tag } from '@hackquest/ui/shared/tag'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import * as React from 'react'
import toast from 'react-hot-toast'
import { LuArrowRight, LuChevronLeft } from 'react-icons/lu'

export function HackathonCard({
  editable = true,
  hackathon,
}: {
  editable?: boolean
  hackathon: HackathonExtend
}) {
  const [parent] = useAutoAnimate()
  const queryClient = useQueryClient()
  const [open, onOpenChange] = useToggle(false)
  const isLargeScreen = useMediaQuery('(min-width: 640px)')
  const [showDetail, setShowDetail] = React.useState(isLargeScreen)
  const { getDeadline } = useHackathonState()

  const { mutateAsync, isPending } = useQuitHackathonMutation()

  function onConfirm() {
    toast
      .promise(mutateAsync({ hackathonId: hackathon.id }), {
        loading: 'Quitting hackathon...',
        success: 'You have quit this hackathon',
        error: 'Failed to quit hackathon',
      })
      .then(() => {
        queryClient.invalidateQueries({
          predicate: query => {
            return ['ListHackathons', 'ListHackathonsBySelf'].includes(
              query.queryKey[0] as string,
            )
          },
        })
      })
      .finally(() => {
        onOpenChange(false)
      })
  }

  const deadline = getDeadline(hackathon)

  const isLive = !hackathon.currentStatus?.some(
    status =>
      status === HackathonJoinState.RegisterNotOpen ||
      status === HackathonJoinState.VotingClose,
  )

  const prizeTrack = hackathon.rewards?.map(reward => reward.name).join(', ')

  React.useEffect(() => {
    setShowDetail(isLargeScreen)
  }, [isLargeScreen])

  return (
    <React.Fragment>
      <Link href={`${MenuLink.EXPLORE}/${hackathon.alias}`}>
        <Card className="p-6 max-sm:relative" ref={parent}>
          <button
            className="absolute top-6 right-6 outline-none sm:hidden"
            onClick={event => {
              event.preventDefault()
              event.stopPropagation()
              event.nativeEvent.stopImmediatePropagation()
              setShowDetail(!showDetail)
            }}
          >
            <LuChevronLeft
              className={cn('size-6', showDetail ? '-rotate-90' : '')}
            />
          </button>
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <div className="shrink-0 sm:min-w-[395px] sm:max-w-[395px] sm:py-6">
              <h2 className="line-clamp-1 font-bold font-next-book text-lg sm:text-2xl">
                {hackathon.name}
              </h2>
              {showDetail && (
                <p className="body-s mt-3 line-clamp-2 text-secondary-neutral">
                  {hackathon.info?.intro}
                </p>
              )}
              <div className="mt-6 space-x-3">
                {isLive ? (
                  <React.Fragment>
                    <Tag className="headline-s bg-success-100">Live</Tag>
                    <Tag className="headline-s bg-blue-100">
                      {`${deadline.timeDiff} ${deadline.timeDiff > 1 ? 'days' : 'day'} left`}
                    </Tag>
                  </React.Fragment>
                ) : (
                  <Tag className="headline-s bg-destructive-100">Ended</Tag>
                )}
              </div>
            </div>
            {showDetail && (
              <div className="space-y-6 max-sm:mt-6 sm:ml-6 sm:px-6 sm:py-4">
                <div className="space-y-3">
                  <h4 className="body-s text-neutral-400">Prize Track</h4>
                  <p className="headline-m line-clamp-1">{prizeTrack}</p>
                </div>
                <div className="flex items-start gap-x-8">
                  <div className="space-y-3">
                    <h4 className="body-s whitespace-nowrap text-neutral-400">
                      Schedule
                    </h4>
                    <p className="headline-m line-clamp-1">
                      {deadline.schedule}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="body-s whitespace-nowrap text-neutral-400">
                      Submission Type
                    </h4>
                    <p className="headline-m line-clamp-1">
                      {(hackathon.members?.length ?? 0) > 1
                        ? 'Team project'
                        : 'Solo project'}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="relative h-[166px] w-full shrink-0 max-sm:mt-6 sm:h-[186px] sm:w-[330px]">
              <Image
                src={hackathon.info?.image ?? ''}
                alt={hackathon.name}
                fill
                className="rounded-xl object-cover"
              />
            </div>
          </div>
          {showDetail && editable && hackathon?.projectCount! > 0 && (
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <object>
                <Link
                  href={
                    isLive
                      ? `/hackathon/${hackathon.id}/null/submit`
                      : MenuLink.BUILDER_HOME
                  }
                >
                  <Button variant="outline" color="neutral" className="w-full">
                    {isLive ? 'Submit Another Project' : 'View My Project'}
                    <LuArrowRight className="size-4" />
                  </Button>
                </Link>
              </object>
              <Button
                className="w-full"
                onClick={event => {
                  event.preventDefault()
                  event.stopPropagation()
                  event.nativeEvent.stopImmediatePropagation()
                  onOpenChange(true)
                }}
              >
                Quit Hackathon
                <LuArrowRight className="size-4" />
              </Button>
            </div>
          )}
        </Card>
      </Link>
      <DeleteAlertDialog
        open={open}
        onOpenChange={onOpenChange}
        loading={isPending}
        title="Quit Hackathon"
        description="If you are the team leader, this project will withdraw from this hackathon. If you are a team member, this project will quit."
        onConfirm={onConfirm}
      />
    </React.Fragment>
  )
}
