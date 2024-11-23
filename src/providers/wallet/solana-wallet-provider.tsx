'use client'

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import {
  CoinbaseWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import * as React from 'react'

export function SolanaWalletProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const network = WalletAdapterNetwork.Devnet

  const endpoint = React.useMemo(() => clusterApiUrl(network), [network])

  const wallets = React.useMemo(() => [new CoinbaseWalletAdapter()], [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
