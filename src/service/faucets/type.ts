import type { BlockChainType } from '@/graphql/generated/graphql'

export enum FaucetsPathEnum {
  Faucets = '/faucets',
}

export enum CustomBlockChainType {
  All = 'ALL',
}

export interface FaucetType {
  id: string
  name: string
  type: BlockChainType
  rpcUrl: string
  chainId: string
  symbol: string
  blockBrowserUrl: string
  amount: number
  owner: string
  balance: number
  intervalTime: number
  thumbnail: string
}

export interface FaucetClaimDTO {
  chainId: string
  address: string
}

export interface FaucetRecordType {
  claimTime: string
  exportUrl: string
  id: string
}

export interface FaucetRecordsDTO {
  page: number
  limit: number
}
