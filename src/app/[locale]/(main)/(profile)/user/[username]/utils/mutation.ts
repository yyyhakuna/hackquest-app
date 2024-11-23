import { useRouter } from '@/app/navigation'
import { useUpdateUserProfileMutation } from '@/graphql/generated/hooks'
import toast from 'react-hot-toast'

export function useUpdateUserProfile(
  options?: Parameters<typeof useUpdateUserProfileMutation>[0],
) {
  const router = useRouter()
  return useUpdateUserProfileMutation({
    meta: {
      invalidates: [['FindUserProfile']],
    },
    onSuccess: () => {
      router.refresh()
      toast.success('Profile updated')
    },
    ...options,
  })
}
