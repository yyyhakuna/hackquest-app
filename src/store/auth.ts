import { create } from 'zustand'

export enum AuthType {
  EMAIL_CHECK = 'email-check',
  SIGN_IN = 'sign-in',
  SIGN_UP = 'sign-up',
  EMAIL_VERIFY = 'email-verify',
  FORGOT_PASSWORD = 'forgot-password',
  VERIFYING = 'verifying',
  VERIFYING_FAIL = 'verifying-fail',
  VERIFYING_SUCCESS = 'verifying-success',
  CHANGE_PASSWORD = 'change-password',
  RESET_PASSWORD = 'reset-password',
  INVITE_CODE = 'invite-code',
}

export enum UserRole {
  ADMIN = 'ADMIN',
  ORGANIZATION = 'ORGANIZATION',
  USER = 'USER',
  CONTENT = 'CONTENT',
}

export const callbackMap = {
  [AuthType.VERIFYING]: AuthType.VERIFYING,
  [AuthType.CHANGE_PASSWORD]: AuthType.CHANGE_PASSWORD,
}

interface AuthRouteType {
  type: AuthType
  prevType?: AuthType
  params?: Record<string, any>
}

export interface UserAuthType {
  settingsOpen: boolean
  authRouteType: AuthRouteType
  authModalOpen: boolean
  setSettingsOpen: (payload: boolean) => void
  setAuthType: (payload: AuthRouteType | AuthType) => void
  setAuthModalOpen: (open: boolean) => void
  notificationModalOpen: boolean
  setNotificationModalOpen: (open: boolean) => void
}

export const useAuthStore = create<UserAuthType>()(set => ({
  settingsOpen: false,
  authModalOpen: false,
  notificationModalOpen: false,
  authRouteType: {
    type: AuthType.SIGN_IN,
    prevType: AuthType.SIGN_IN,
    params: {},
  },

  setAuthModalOpen(payload) {
    set(_state => ({ authModalOpen: payload }))
  },

  setSettingsOpen(payload) {
    set(_state => ({ settingsOpen: payload }))
  },
  setNotificationModalOpen(payload) {
    set(_state => ({ notificationModalOpen: payload }))
  },

  setAuthType(payload) {
    if (!payload) return
    set(state => {
      const types = Object.values(AuthType)
      if (types.includes(payload as AuthType)) {
        payload = payload as AuthType
        payload = {
          type: payload,
          prevType: state.authRouteType.type,
          params: {},
        }
      } else if (types.includes((payload as AuthRouteType)?.type)) {
        payload = payload as AuthRouteType
        payload = {
          type: payload.type,
          prevType: state.authRouteType.type,
          params: payload.params || {},
        }
      }
      return { authRouteType: payload as AuthRouteType }
    })
  },
}))
