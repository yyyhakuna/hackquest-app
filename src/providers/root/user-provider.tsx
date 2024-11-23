'use client'

import { type SafeUser, type UserStore, createUserStore } from '@/store/user'
import * as React from 'react'
import { type StoreApi, useStore } from 'zustand'

export const UserContext = React.createContext<StoreApi<UserStore> | null>(null)

export function UserProvider({
  children,
  initialState,
}: Readonly<{
  children: React.ReactNode
  initialState?: SafeUser | null
}>) {
  const storeRef = React.useRef<StoreApi<UserStore> | null>(null)

  if (!storeRef.current) {
    storeRef.current = createUserStore(initialState)
  }

  React.useEffect(() => {
    storeRef.current?.setState({ user: initialState })
  }, [initialState])

  return (
    <UserContext.Provider value={storeRef.current}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserStore<T>(selector: (state: UserStore) => T) {
  const store = React.useContext(UserContext)
  if (!store) {
    throw new Error('UserProvider is missing')
  }
  return useStore(store, selector)
}
