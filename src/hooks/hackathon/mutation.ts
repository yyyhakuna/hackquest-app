import { useUpdateHackathonMutation } from '@/graphql/generated/hooks'
import toast from 'react-hot-toast'

export function useUpdateHackathon(
  options?: Parameters<typeof useUpdateHackathonMutation>[0],
) {
  return useUpdateHackathonMutation<string>({
    meta: {
      invalidates: [['FindUniqueHackathon']],
    },
    onError: error => {
      toast.error(error)
    },
    ...options,
  })
}
