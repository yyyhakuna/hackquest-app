'use client'

import { Link } from '@/app/navigation'
import {
  type HackathonExtend,
  HackathonJoinState,
} from '@/graphql/generated/graphql'
import {
  useHackathonConfirmMutation,
  useSubmitHackathonToReviewMutation,
} from '@/graphql/generated/hooks'
import { AuthType, useAuthStore } from '@/store/auth'
import { useAuthenticated, useUser } from '@/store/user'
import { cn } from '@hackquest/ui/lib/utils'
import { Button } from '@hackquest/ui/shared/button'
import { Tag } from '@hackquest/ui/shared/tag'
import { useQueryClient } from '@tanstack/react-query'
import * as React from 'react'
import toast from 'react-hot-toast'
import { FiArrowRight } from 'react-icons/fi'
import { useShallow } from 'zustand/react/shallow'

export function HackathonActionButton({
  hackathon,
  className,
  showArrow = true,
  isDetail = false,
}: {
  hackathon: HackathonExtend
  className?: string
  showArrow?: boolean
  isDetail?: boolean
}) {
  const isAuthenticated = useAuthenticated()
  const currentUser = useUser()

  const { setAuthType, setAuthModalOpen } = useAuthStore(
    useShallow(state => ({
      setAuthType: state.setAuthType,
      setAuthModalOpen: state.setAuthModalOpen,
    })),
  )
  const queryClient = useQueryClient()
  const isCreator = currentUser?.id === hackathon.creatorId
  const renderLinkButton = (text: string, href: string, color?: string) => {
    if (!isAuthenticated) {
      return (
        <Button
          className={cn('flex-1', className)}
          color={color as any}
          onClick={() => {
            setAuthModalOpen(true)
            setAuthType(AuthType.SIGN_IN)
          }}
        >
          {text}
          {showArrow && (
            <FiArrowRight className="icon-hover-translate size-4" />
          )}
        </Button>
      )
    }
    return (
      <Link href={href} className="flex-1">
        <Button className={cn('w-full', className)} color={color as any}>
          {text}
          {showArrow && (
            <FiArrowRight className="icon-hover-translate size-4" />
          )}
        </Button>
      </Link>
    )
  }

  const renderDisabledButton = (text: string) => (
    <Button className={cn('flex-1', className)} disabled>
      {text}
    </Button>
  )

  const renderEditButton = () => {
    if (!isCreator || !isDetail || !showArrow) {
      return null
    }
    return (
      <Link href={`/hackathon/${hackathon.id}/create`} className="flex-1">
        <Button className={'w-full'}>
          <span>Edit</span>
          <FiArrowRight className="icon-hover-translate size-4" />
        </Button>
      </Link>
    )
  }

  const renderActionButton = ({
    text,
    onClick,
    color,
    loading,
  }: {
    text: string
    onClick: () => void
    color?: string
    loading?: boolean
  }) => {
    return (
      <Button
        className={cn('flex-1', className)}
        color={color as any}
        loading={loading}
        onClick={event => {
          event.preventDefault()
          event.stopPropagation()
          event.nativeEvent.stopImmediatePropagation()
          onClick()
        }}
      >
        {text}
        {showArrow && <FiArrowRight className="icon-hover-translate size-4" />}
      </Button>
    )
  }

  const renderDisabledEditButton = (text: string) => (
    <div className="flex w-full gap-4 max-sm:flex-col">
      {renderEditButton()}
      {renderDisabledButton(text)}
    </div>
  )

  const renderLinkEditButton = (text: string, href: string, color?: string) => (
    <div className="flex w-full gap-4 max-sm:flex-col">
      {renderEditButton()}
      {renderLinkButton(text, href, color)}
    </div>
  )

  const renderActionEditButton = ({
    text,
    onClick,
    color,
    loading,
  }: {
    text: string
    onClick: () => void
    color?: string
    loading?: boolean
  }) => (
    <div className="flex w-full gap-4 max-sm:flex-col">
      {renderEditButton()}
      {renderActionButton({
        text,
        onClick,
        color,
        loading,
      })}
    </div>
  )

  const confirm = useHackathonConfirmMutation()

  const submitPreview = useSubmitHackathonToReviewMutation()
  const [loading, setLoading] = React.useState(false)
  function onConfirm() {
    toast
      .promise(confirm.mutateAsync({ hackathonId: hackathon.id }), {
        loading: 'Confirming...',
        success: 'Confirmed',
        error: 'Confirm Failed',
      })
      .then(() => {
        setLoading(true)
        queryClient
          .invalidateQueries({
            predicate: query =>
              ['FindUniqueHackathon', 'ListHackathonsBySelf'].includes(
                query.queryKey[0] as string,
              ),
          })
          .finally(() => {
            setLoading(false)
          })
      })
  }

  function onSubmitPreview() {
    toast
      .promise(
        submitPreview.mutateAsync({
          updateHackathonId: hackathon.id,
          data: {
            status: {
              set: 'review',
            },
          },
        }),
        {
          loading: 'Submit...',
          success: 'Submited',
          error: 'Submit Failed',
        },
      )
      .then(() => {
        setLoading(true)
        queryClient
          .invalidateQueries({
            predicate: query =>
              ['FindUniqueHackathon', 'ListHackathonsBySelf'].includes(
                query.queryKey[0] as string,
              ),
          })
          .finally(() => {
            setLoading(false)
          })
      })
  }

  if (hackathon.status === 'draft') {
    if (!isCreator) {
      return renderDisabledEditButton('Pending')
    }
    return renderActionEditButton({
      text: 'Submit to Preview',
      onClick: onSubmitPreview,
      color: 'success',
      loading: submitPreview.isPending || loading,
    })
  }

  if (
    hackathon.currentStatus?.includes(HackathonJoinState.VotingClose) &&
    !isDetail
  ) {
    return <Tag className="headline-s bg-destructive-100">Ended</Tag>
  }

  if (hackathon.currentStatus?.includes(HackathonJoinState.UserReject)) {
    return renderDisabledEditButton('Is rejected')
  }
  if (hackathon.currentStatus?.includes(HackathonJoinState.Register)) {
    if (hackathon.currentStatus?.includes(HackathonJoinState.UserNotRegister)) {
      return renderLinkEditButton(
        'Start Register',
        `/hackathon/${hackathon.id}/register`,
      )
    } else if (
      hackathon.currentStatus?.includes(HackathonJoinState.UserContinueRegister)
    ) {
      return renderLinkEditButton(
        'Continue Register',
        `/hackathon/${hackathon.id}/register`,
      )
    } else if (
      hackathon.currentStatus?.includes(HackathonJoinState.UserRegistered) &&
      !hackathon.currentStatus?.includes(HackathonJoinState.Submit)
    ) {
      return renderLinkEditButton(
        'Edit Register',
        `/hackathon/${hackathon.id}/register`,
      )
    } else if (
      hackathon.currentStatus?.includes(HackathonJoinState.UserPendingApproval)
    ) {
      return renderDisabledEditButton('Pending')
    } else if (
      hackathon.currentStatus?.includes(HackathonJoinState.UserReject)
    ) {
      return renderLinkEditButton(
        'Register Again',
        `/hackathon/${hackathon.id}/register`,
        'destructive',
      )
    } else if (
      hackathon.currentStatus?.includes(HackathonJoinState.UserWaitlist)
    ) {
      return renderDisabledEditButton('Waitlist')
    } else if (
      hackathon.currentStatus?.includes(HackathonJoinState.UserApprovalConfirm)
    ) {
      return renderActionEditButton({
        text: 'Confirm Attendance',
        onClick: onConfirm,
        color: 'success',
        loading: confirm.isPending || loading,
      })
    }
  }
  if (
    hackathon.currentStatus?.includes(HackathonJoinState.Submit) &&
    hackathon.currentStatus?.includes(HackathonJoinState.UserRegistered)
  ) {
    if (hackathon.currentStatus?.includes(HackathonJoinState.UserSubmitted)) {
      return renderLinkEditButton(
        'Submit Another Project',
        `/hackathon/${hackathon.id}/null/submit`,
      )
    } else {
      return renderLinkEditButton(
        'Start Submit',
        `/hackathon/${hackathon.id}/null/submit`,
      )
    }
  }

  if (hackathon.currentStatus?.includes(HackathonJoinState.Voting)) {
    return (
      <div className="flex w-full gap-4 max-sm:flex-col">
        {renderDisabledButton('In voting')}
      </div>
    )
  }
  return null
}
