'use client'

import {
  useCreateJobFavoriteMutation,
  useDeleteJobFavoriteMutation,
} from '@/graphql/generated/hooks'
import { useAuthStore } from '@/store/auth'
import { useAuthenticated, useUser } from '@/store/user'
import { cn } from '@hackquest/ui/lib/utils'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { LuBookmark } from 'react-icons/lu'
import { useShallow } from 'zustand/react/shallow'

export function FavoriteButton({
  jobId,
  favorited = false,
  className,
}: {
  jobId: string
  favorited?: boolean
  className?: string
}) {
  const router = useRouter()
  const isAuthenticated = useAuthenticated()
  const currentUser = useUser()
  const { setAuthModalOpen } = useAuthStore(
    useShallow(state => ({
      setAuthModalOpen: state.setAuthModalOpen,
    })),
  )

  const { mutateAsync: favoriteMutation, isPending: isFavoritePending } =
    useCreateJobFavoriteMutation({
      onSuccess: () => {
        router.refresh()
        toast.success('Save job favorite')
      },
    })

  const { mutateAsync: unfavoriteMutation, isPending: isDeletePending } =
    useDeleteJobFavoriteMutation({
      onSuccess: () => {
        router.refresh()
        toast.success('Saved job removed')
      },
    })

  function onClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()

    if (!isAuthenticated) {
      toast.error('Please login first')
      setAuthModalOpen(true)
      return
    }

    if (favorited) {
      unfavoriteMutation({
        where: {
          userId: {
            equals: currentUser?.id,
          },
          jobId: {
            equals: jobId,
          },
        },
      })
    } else {
      favoriteMutation({
        data: {
          userId: currentUser?.id!,
          job: {
            connect: {
              id: jobId,
            },
          },
        },
      })
    }
  }

  return (
    <button
      aria-label={favorited ? 'Remove from saved' : 'Save for later'}
      data-prevent-nprogress={true}
      disabled={isFavoritePending || isDeletePending}
      className={cn('outline-none', className)}
      onClick={onClick}
    >
      <LuBookmark
        aria-hidden
        size={24}
        className={cn('text-secondary-neutral', {
          'fill-neutral-rich-gray': favorited,
        })}
      />
    </button>
  )
}
