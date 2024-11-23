import {
  HackathonMemberJoinStatus,
  type ListOrganizerApplicationQuery,
  useUpdateManyOrganizerApplicationMemberStatusMutation,
} from '@/graphql/generated/hooks'
import type { QueryObserverResult } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const useApplicationAction = (
  _refetch: () => Promise<
    QueryObserverResult<ListOrganizerApplicationQuery, Error>
  >,
  ids: string[],
) => {
  const update = useUpdateManyOrganizerApplicationMemberStatusMutation({})

  const undo = () => {
    if (ids.length) {
      toast.promise(
        update.mutateAsync({
          ids,
          joinStatus: HackathonMemberJoinStatus.Pending,
        }),
        {
          loading: 'Undo Now...',
          success: 'Undo Success',
          error: 'Failed to Undo',
        },
      )
    }
  }

  const waitlist = () => {
    if (ids.length) {
      toast.promise(
        update.mutateAsync({
          ids,
          joinStatus: HackathonMemberJoinStatus.Waiting,
        }),
        {
          loading: 'Waitlist Now...',
          success: 'Waitlist Success',
          error: 'Failed to waitlist',
        },
      )
    }
  }

  const decline = () => {
    if (ids.length) {
      toast.promise(
        update.mutateAsync({
          ids,
          joinStatus: HackathonMemberJoinStatus.Decline,
        }),
        {
          loading: 'Decline Now...',
          success: 'Decline Success',
          error: 'Failed to decline',
        },
      )
    }
  }

  const approve = () => {
    if (ids.length) {
      toast.promise(
        update.mutateAsync({
          ids,
          joinStatus: HackathonMemberJoinStatus.Approved,
        }),
        {
          loading: 'Approve Now...',
          success: 'Approve Success',
          error: 'Failed to approve',
        },
      )
    }
  }

  return { approve, decline, undo, waitlist }
}
