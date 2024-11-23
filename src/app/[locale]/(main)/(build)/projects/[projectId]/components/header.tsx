'use client'

import { useRouter } from '@/app/navigation'
import { useLikeProjectMutation } from '@/graphql/generated/hooks'
import { useProjectQuery } from '@/hooks/project/query'
import { copyText } from '@/lib/utils'
import { useAuthStore } from '@/store/auth'
import { useUser } from '@/store/user'
import { cn } from '@hackquest/ui/lib/utils'
import toast from 'react-hot-toast'
import { LuArrowLeft, LuHeart, LuShare2 } from 'react-icons/lu'

export function Header() {
  const router = useRouter()
  const currentUser = useUser()
  const authStore = useAuthStore()
  const { data } = useProjectQuery()

  const isLiked = data?.isLiked

  const { mutateAsync, isPending } = useLikeProjectMutation({
    meta: {
      invalidates: [['FindUniqueProject']],
    },
  })

  async function likeProject() {
    if (!currentUser) {
      authStore.setAuthModalOpen(true)
      toast.error('Please login to like project')
      return
    }
    toast.promise(mutateAsync({ likeProjectId: data?.id! }), {
      loading: 'Loading...',
      success: isLiked ? 'Unliked project' : 'Liked project',
      error: isLiked ? 'Failed to unlike project' : 'Failed to like project',
    })
  }

  return (
    <div className="flex items-center justify-between">
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-1"
      >
        <LuArrowLeft className="size-4 max-sm:size-6" />
        <span className="body-m font-bold max-sm:hidden">Back</span>
      </button>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="inline-flex size-14 flex-col items-center justify-center gap-0.5 rounded-lg border border-neutral-300 duration-300 hover:bg-neutral-100"
          disabled={isPending}
          onClick={likeProject}
        >
          <LuHeart
            className={cn('size-4', isLiked && 'fill-destructive-400')}
          />
          <span className="headline-s">{data?.likes}</span>
        </button>
        <button
          type="button"
          className="inline-flex size-14 items-center justify-center rounded-lg border border-neutral-300 duration-300 hover:bg-neutral-100"
          onClick={async () => {
            const url = `${window.location.origin}/projects/${data?.alias}`
            await copyText(url)
            toast.success('Share link copied')
          }}
        >
          <LuShare2 className="size-4" />
        </button>
      </div>
    </div>
  )
}
