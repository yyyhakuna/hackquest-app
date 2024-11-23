import type { ListOrganizerApplicationQuery } from '@/graphql/generated/hooks'
import { cn } from '@hackquest/ui/lib/utils'
import { FeedbackIcon } from '@hackquest/ui/shared/feedback-icon'
import type { QueryObserverResult } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { FaRegTimesCircle } from 'react-icons/fa'
import { FaCircleCheck } from 'react-icons/fa6'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { MdOutlineAccessTime } from 'react-icons/md'
import { useApplicationAction } from '../../utils/use-application-action'
export const DeclineAction = ({
  refetch,
  id,
}: {
  refetch: () => Promise<
    QueryObserverResult<ListOrganizerApplicationQuery, Error>
  >
  id: string
}) => {
  const t = useTranslations('HackathonOrganizer.manage')
  const { undo } = useApplicationAction(refetch, [id])
  return (
    <div className="flex gap-6">
      <div
        className="headline-m flex items-center gap-1 text-primary-neutral"
        onClick={e => e.stopPropagation()}
      >
        <FaRegTimesCircle />
        {t('decline')}
      </div>

      <button
        className="headline-m flex items-center gap-1 text-primary-neutral underline"
        onClick={e => {
          e.stopPropagation()
          undo()
        }}
      >
        <FaRegTimesCircle /> Undo Decline
      </button>
    </div>
  )
}

export const WaitlistAction = ({
  refetch,
  id,
}: {
  refetch: () => Promise<
    QueryObserverResult<ListOrganizerApplicationQuery, Error>
  >
  id: string
}) => {
  const t = useTranslations('HackathonOrganizer.manage')
  const { approve, decline, undo } = useApplicationAction(refetch, [id])
  return (
    <div className="flex gap-6">
      <div
        className="headline-m flex items-center gap-1 text-primary-neutral"
        onClick={e => e.stopPropagation()}
      >
        <MdOutlineAccessTime />
        {t('waitlist')}
      </div>

      <button
        className="headline-m flex items-center gap-1 text-primary-neutral underline"
        onClick={e => {
          e.stopPropagation()
          approve()
        }}
      >
        Approve
      </button>

      <button
        className="headline-m flex items-center gap-1 text-primary-neutral underline"
        onClick={e => {
          e.stopPropagation()
          decline()
        }}
      >
        Decline
      </button>

      <button
        className="headline-m flex items-center gap-1 text-primary-neutral underline"
        onClick={e => {
          e.stopPropagation()
          undo()
        }}
      >
        Undo
      </button>
    </div>
  )
}

export const ApprovedAction = ({
  isSubmitted,
  registerConfirm,
  refetch,
}: {
  isSubmitted: boolean
  registerConfirm: boolean
  refetch: () => Promise<
    QueryObserverResult<ListOrganizerApplicationQuery, Error>
  >
  id: string
}) => {
  const t = useTranslations('HackathonOrganizer.manage')
  return (
    <div className="flex gap-6">
      <div className="headline-s flex items-center gap-1 text-primary-neutral">
        <FeedbackIcon /> {t('approve')}
      </div>

      <div
        className={cn(
          'headline-s flex items-center gap-1 text-neutral-400',
          registerConfirm && 'text-primary-neutral',
        )}
      >
        {registerConfirm ? (
          <FeedbackIcon />
        ) : (
          <FaCircleCheck className={cn('h-6 w-6')} />
        )}
        Confirmed
      </div>

      <div
        className={cn(
          'headline-s flex items-center gap-1 text-neutral-400',
          isSubmitted && 'text-primary-neutral',
        )}
      >
        {isSubmitted ? (
          <FeedbackIcon />
        ) : (
          <FaCircleCheck className={cn('h-6 w-6')} />
        )}{' '}
        Submitted
      </div>
    </div>
  )
}

export const PendingAction = ({
  refetch,
  id,
}: {
  refetch: () => Promise<
    QueryObserverResult<ListOrganizerApplicationQuery, Error>
  >
  id: string
}) => {
  const t = useTranslations('HackathonOrganizer.manage')
  const { approve, decline, waitlist } = useApplicationAction(refetch, [id])
  return (
    <div className="flex gap-6">
      <button
        className="headline-m flex items-center gap-1 text-primary-neutral underline"
        onClick={e => {
          e.stopPropagation()
          approve()
        }}
      >
        <IoCheckmarkCircle /> {t('approve')}
      </button>

      <button
        className="headline-m flex items-center gap-1 text-primary-neutral underline"
        onClick={e => {
          e.stopPropagation()
          decline()
        }}
      >
        <FaRegTimesCircle />
        {t('decline')}
      </button>

      <button
        className="headline-m flex items-center gap-1 text-primary-neutral underline"
        onClick={e => {
          e.stopPropagation()
          waitlist()
        }}
      >
        <MdOutlineAccessTime /> {t('waitlist')}
      </button>
    </div>
  )
}
