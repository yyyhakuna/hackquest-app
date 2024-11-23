'use client'

import type { FindUserProfileQuery } from '@/graphql/generated/graphql'
import { useFindUserProfileQuery } from '@/graphql/generated/hooks'
import { useUser } from '@/store/user'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { attestationsQueryOptions } from './query-options'

export function useProfileUsername() {
  const params = useParams()
  return params.username as string
}

export function useUserProfile() {
  const user = useUser()
  const username = useProfileUsername()

  return useSuspenseQuery({
    queryKey: useFindUserProfileQuery.getKey({ username }),
    queryFn: useFindUserProfileQuery.fetcher({ username }),
    staleTime: Number.POSITIVE_INFINITY,
    select: (data: FindUserProfileQuery) => {
      const profile = data.profile
      if (user && user.id === profile.id) {
        return {
          ...profile,
          isOwnProfile: true,
        }
      }
      return {
        ...profile,
        isOwnProfile: false,
      }
    },
  })
}

export function useUserAttestations() {
  const username = useProfileUsername()
  return useSuspenseQuery(attestationsQueryOptions(username))
}
