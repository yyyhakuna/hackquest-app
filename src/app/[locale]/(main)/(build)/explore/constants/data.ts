import { HackathonStatus } from "@/graphql/generated/hooks"


export const PAGE_LIMIT = 9
export const HACKATHON_STATUS = 'publish'

export const hackathonExploreTab = [
  {
    label: 'Ongoing Hackthone',
    value: HackathonStatus.Ongoing,
  },
  {
    label: 'Past Hackthone',
    value: HackathonStatus.Past,
  },
] as const

export const totalPrizeOptions = [
  {
    label: 'Default',
    value: 'Solana',
  },
  {
    label: '>5000',
    value: 'Mantle',
  },
  {
    label: '5000-10000',
    value: 'Arbitrium',
  },
  {
    label: '10000-50000',
    value: 'Ethereum',
  },
  {
    label: '>50000',
    value: 'Linea',
  },
]

export const ecosystemOptions = [
  {
    label: 'Default',
    value: 'default',
  },
  {
    label: 'Solana',
    value: 'solana',
  },
  {
    label: 'Mantle',
    value: 'mantle',
  },
  {
    label: 'Arbitrium',
    value: 'Arbitrium',
  },
  {
    label: 'Ethereum',
    value: 'Ethereum',
  },
  {
    label: 'Linea',
    value: 'Linea',
  },
  {
    label: 'Sui',
    value: 'Sui',
  },
]

export const techStackOptions = [
  {
    label: 'Default',
    value: 'default',
  },
  {
    label: 'React',
    value: 'React',
  },
  {
    label: 'Next',
    value: 'next',
  },
  {
    label: 'Vue',
    value: 'vue',
  },
  {
    label: 'Web3',
    value: 'web3',
  },
  {
    label: 'Ethers',
    value: 'ethers',
  },
  {
    label: 'Node',
    value: 'node',
  },
  {
    label: 'Go',
    value: 'go',
  },
  {
    label: 'Python',
    value: 'python',
  },
  {
    label: 'Solidity',
    value: 'solidity',
  },
  {
    label: 'Rust',
    value: 'rust',
  },
  {
    label: 'Move',
    value: 'move',
  },
]

export const tagOptions = [
  {
    label: 'Default',
    value: 'default',
  },
  {
    label: 'For Newbie',
    value: 'newbie',
  },
  {
    label: 'For Senior',
    value: 'For Senior',
  },
  {
    label: 'Large Prize',
    value: 'Large Prize',
  },
  {
    label: 'Live',
    value: 'Live',
  },
  {
    label: 'Linea',
    value: 'Linea',
  },
  {
    label: 'Voting',
    value: 'Voting',
  },
]

export const sortByOptions = [
  {
    label: 'Default',
    value: 'default',
  },
  {
    label: 'Most popular',
    value: 'Most popular',
  },
  {
    label: 'Newest',
    value: 'Newest',
  },
]
