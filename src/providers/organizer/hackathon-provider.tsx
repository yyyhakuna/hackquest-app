// 'use client'

// import {
//   useFindUniqueHackathonQuery,
//   type HackathonExtend,
// } from '@/graphql/generated/hooks'
// import webApi from '@/service'
// import type { UserProfileType } from '@/service/user/type'
// import {
//   useQuery,
//   useQueryClient,
//   useSuspenseQuery,
// } from '@tanstack/react-query'
// import * as React from 'react'

// type HackathonContextValue = {
//   hackathon: HackathonExtend
// }

// export const ProfileContext = React.createContext<HackathonContextValue>(null!)

// export function ProfileProvider({ children }: { children: React.ReactNode }) {
//   const { data } = useSuspenseQuery({
//     queryKey: useFindUniqueHackathonQuery.getKey({
//       where: { id },
//     }),
//     queryFn: useFindUniqueHackathonQuery.fetcher({
//       where: { id },
//     }),
//   })

//   const invalidate = React.useCallback(() => {
//     queryClient.invalidateQueries({ queryKey: ['profile', username] })
//   }, [queryClient, username])

//   const contextValue = React.useMemo(
//     () => ({
//       profile: data,
//       isLoading,
//       invalidate,
//     }),
//     [data, invalidate, isLoading],
//   )

//   return (
//     <ProfileContext.Provider value={contextValue}>
//       {children}
//     </ProfileContext.Provider>
//   )
// }

// export function useProfile() {
//   if (!ProfileContext) {
//     throw new Error('useProfile must be used within a ProfileProvider')
//   }
//   return React.useContext(ProfileContext)
// }
