import { generateChainId } from '@/lib/utils'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import {
  coinbaseWallet,
  gateWallet,
  metaMaskWallet,
  okxWallet,
  phantomWallet,
  rainbowWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { http } from 'wagmi'
import {
  arbitrumSepolia,
  lineaSepolia,
  mainnet,
  manta,
  mantle,
  mantleSepoliaTestnet,
  sepolia,
  telosTestnet,
} from 'wagmi/chains'
import { mantaTestnet } from './chains/manta-testnet'

export const config = getDefaultConfig({
  appName: 'HackQuest',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  chains: [
    mainnet,
    mantle,
    manta,
    mantaTestnet,
    mantleSepoliaTestnet,
    lineaSepolia,
    sepolia,
    arbitrumSepolia,
    telosTestnet,
  ],
  wallets: [
    {
      groupName: 'Recommended',
      wallets: [
        metaMaskWallet,
        okxWallet,
        gateWallet,
        rainbowWallet,
        coinbaseWallet,
        phantomWallet,
      ],
    },
  ],
  transports: {
    [mainnet.id]: http(),
    [mantle.id]: http(),
    [manta.id]: http(),
    [mantaTestnet.id]: http(),
    [mantleSepoliaTestnet.id]: http(),
    [lineaSepolia.id]: http(),
    [sepolia.id]: http(),
    [arbitrumSepolia.id]: http(),
    [telosTestnet.id]: http(),
  },
  ssr: true,
})

export const ChainId = {
  Mainnet: mainnet.id,
  Mantle: mantle.id,
  Manta: process.env.NODE_ENV === 'development' ? mantaTestnet.id : manta.id,
  Sepolia: sepolia.id,
  LineaSepolia: lineaSepolia.id,
  ArbitrumSepolia: arbitrumSepolia.id,
  MantleSepolia: mantleSepoliaTestnet.id,
  TelosTestnet: telosTestnet.id,
  Solana: generateChainId('Solana'),
  Sui: generateChainId('Sui'),
} as const
