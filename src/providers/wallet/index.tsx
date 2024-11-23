'use client'

import { config } from '@/config/wagmi'
import { theme } from '@/config/wagmi/theme'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { useLocale } from 'next-intl'
import * as React from 'react'
import { WagmiProvider } from 'wagmi'
import { ReactQueryProvider } from '../root/query-client-provider'
import { SolanaWalletProvider } from './solana-wallet-provider'
import { SuiWalletProvider } from './sui-wallet-provider'
import { WalletAvatar } from './wallet-avatar'

export function WalletProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = useLocale()

  return (
    <WagmiProvider config={config}>
      <ReactQueryProvider>
        <SolanaWalletProvider>
          <SuiWalletProvider>
            <React.Suspense>
              <RainbowKitProvider
                theme={theme}
                avatar={WalletAvatar}
                showRecentTransactions={true}
                locale={locale === 'en' ? 'en-US' : 'zh-CN'}
              >
                {children}
              </RainbowKitProvider>
            </React.Suspense>
          </SuiWalletProvider>
        </SolanaWalletProvider>
      </ReactQueryProvider>
    </WagmiProvider>
  )
}
