import type { FC, PropsWithChildren } from 'react'
import type en from './src/i18n/locales/en.json'

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    NEXT_PUBLIC_MEASUREMENT_ID: string
    NEXT_PUBLIC_THIRDWEB_CLIENT_ID: string
  }
}

type Messages = typeof en

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}

  export type ComponentType<P = PropsWithChildren> = {
    className?: string
  } & PropsWithChildren &
    P

  export type Component<P = PropsWithChildren> = FC<ComponentType & P>
}

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: {
      invalidates?: Array<QueryKey>
    }
  }
}
