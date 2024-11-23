'use client'

import type { GetUserInfoQuery } from '@/graphql/generated/graphql'
import { removeToken, setToken } from '@/lib/user-token'
import { useUserStore } from '@/providers/root/user-provider'
import { createStore } from 'zustand'

export type SafeUser = GetUserInfoQuery['user']

export type UserState = {
  isAuthenticated: boolean
  user: SafeUser | null | undefined
}

export type UserActions = {
  signIn: (state: {
    access_token?: string | null
    user?: SafeUser | null
  }) => void
  signOut: () => void
}

export type UserStore = UserState & {
  actions: UserActions
}

/**
 * Create a user store
 */
export const createUserStore = (initialState?: SafeUser | null) =>
  createStore<UserStore>(set => ({
    isAuthenticated: !!initialState,
    user: initialState,
    actions: {
      signIn: state => {
        setToken(state.access_token!)
        set(() => ({
          isAuthenticated: true,
          user: state.user,
        }))
      },
      signOut: () => {
        removeToken()
        set(() => ({
          isAuthenticated: false,
          user: null,
        }))
      },
    },
  }))

/**
 * Hook to check if user is authenticated
 */
export const useAuthenticated = () =>
  useUserStore(state => state.isAuthenticated)

/**
 * Hook to get the current user
 */
export const useUser = () => useUserStore(state => state.user)

/**
 * Hook to get the user actions
 *
 * @example
 * const { signIn, signOut } = useUserActions()
 */
export const useUserActions = () => useUserStore(state => state.actions)
