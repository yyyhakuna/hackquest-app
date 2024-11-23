'use client'

import webApi from '@/service'
import type { UserProfileType } from '@/service/user/type'
import { useUser } from '@/store/user'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import * as React from 'react'

type ProfileContextValue = {
  profile?: UserProfileType
  isLoading: boolean
  invalidate: () => void
}

export const ProfileContext = React.createContext<ProfileContextValue>(null!)

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient()
  const currentUser = useUser()
  const username = currentUser?.username || ''

  const { data, isLoading } = useQuery({
    enabled: !!username,
    queryKey: ['profile', username],
    staleTime: Number.POSITIVE_INFINITY,
    queryFn: () => webApi.userApi.getUserProfileByUsername(username),
  })

  const invalidate = React.useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['profile', username] })
  }, [queryClient, username])

  const contextValue = React.useMemo(
    () => ({
      profile: data,
      isLoading,
      invalidate,
    }),
    [data, invalidate, isLoading],
  )

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  if (!ProfileContext) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return React.useContext(ProfileContext)
}
