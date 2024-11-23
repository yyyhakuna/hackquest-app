import GlobalModal from '@/components/global-modal'
import { execute } from '@/graphql/generated/execute'
import {
  GetUserInfoDocument,
  type GetUserInfoQuery,
} from '@/graphql/generated/graphql'
import { getToken } from '@/lib/user-token'
import { ProviderComposer } from '@hackquest/ui/components/common'
import { GoogleAnalytics } from '@next/third-parties/google'
import type { PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'
import { WalletProvider } from '../wallet'
import { LocaleProvider } from './locale-provider'
import { MissionProvider } from './mission-provider'
import { UserProvider } from './user-provider'

const baseContexts: JSX.Element[] = []

export async function WebAppProviders({ children }: PropsWithChildren) {
  let query: GetUserInfoQuery | null = null

  if (getToken()) {
    query = await execute(GetUserInfoDocument)
  }

  return (
    <ProviderComposer contexts={baseContexts}>
      <LocaleProvider>
        <WalletProvider>
          <UserProvider initialState={query?.user}>
            <MissionProvider>
              {children}
              <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_MEASUREMENT_ID!} />
              <GlobalModal />
              <Toaster
                toastOptions={{ className: 'text-center' }}
                containerStyle={{ zIndex: 2147483647 }}
              />
            </MissionProvider>
          </UserProvider>
        </WalletProvider>
      </LocaleProvider>
    </ProviderComposer>
  )
}
