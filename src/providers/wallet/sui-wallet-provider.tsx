'use client'

import {
  ConnectModal,
  SuiClientProvider,
  WalletProvider,
  createNetworkConfig,
} from '@mysten/dapp-kit'
import { getFullnodeUrl } from '@mysten/sui/client'
import type * as React from 'react'
import { create } from 'zustand'

const { networkConfig } = createNetworkConfig({
  devnet: { url: getFullnodeUrl('devnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
  testnet: { url: getFullnodeUrl('testnet') },
})

type State = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const useSuiWalletModal = create<State>(set => ({
  open: false,
  onOpenChange: open => set({ open }),
}))

export function SuiWalletProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const open = useSuiWalletModal(state => state.open)
  const onOpenChange = useSuiWalletModal(state => state.onOpenChange)

  return (
    <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
      <WalletProvider>
        {children}
        <ConnectModal
          open={open}
          onOpenChange={onOpenChange}
          // @ts-expect-error: TODO: fix this
          trigger={null}
        />
      </WalletProvider>
    </SuiClientProvider>
  )
}
