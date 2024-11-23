// import { BlockChainType } from '@/service/webApi/resourceStation/type';

import { BlockChainType } from '@/graphql/generated/graphql'
import { CustomBlockChainType } from '@/service/faucets/type'

export const faucetsFilterData = [
  {
    label: 'All',
    value: CustomBlockChainType.All,
  },
  {
    label: 'EVM',
    value: BlockChainType.Evm,
  },
  {
    label: 'Solana',
    value: BlockChainType.Solana,
  },
  {
    label: 'Sui',
    value: BlockChainType.Sui,
  },
  {
    label: 'Near',
    value: BlockChainType.Near,
  },
]

export const faucetsStepData = [
  {
    title: 'Choose a Faucet',
    content: 'Choose a testnet you request for test tokens',
  },
  {
    title: 'Complete your Profile',
    content: 'We require a completion of HackQuest Profile to prevent misuse',
  },
  {
    title: 'Receive Tokens',
    content: 'You will receive test tokens in seconds with your address',
  },
]

export const FAQData = [
  {
    problem: 'question1.problem',
    answer: 'question1.answer',
  },
  {
    problem: 'question2.problem',
    answer: 'question2.answer',
  },
  {
    problem: 'question3.problem',
    answer: 'question3.answer',
  },
] as const
