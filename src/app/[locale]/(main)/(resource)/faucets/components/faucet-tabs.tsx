'use client'
import { BlockChainType, type GetAllFaucetsQuery } from '@/graphql/generated/graphql'
import { useGetAllFaucetsQuery } from '@/graphql/generated/hooks'

import useQueryToUrl from '@/hooks/use-query-to-url'
import { CustomBlockChainType } from '@/service/faucets/type'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@hackquest/ui/shared/select'
import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from '@hackquest/ui/shared/tabs'
import { useSuspenseQuery } from '@tanstack/react-query'
import { faucetsFilterData } from '../constants/data'
import FaucetCard from './faucet-card'

interface TabsProps {
  faucets: GetAllFaucetsQuery['listFaucets']['data']
  defaultValue: string
  onTabChange: (value: string) => void
}

const QUERY_PARAM = 'ftype'

const queryMap = new Map<string, Array<BlockChainType>>([
  [CustomBlockChainType.All, [BlockChainType.Evm, BlockChainType.Near, BlockChainType.Solana, BlockChainType.Sui]],
  [BlockChainType.Evm, [BlockChainType.Evm]],
  [BlockChainType.Near, [BlockChainType.Near]],
  [BlockChainType.Solana, [BlockChainType.Solana]],
  [BlockChainType.Sui, [BlockChainType.Sui]],
])

const WebTabs: React.FC<TabsProps> = props => {
  const { faucets, defaultValue, onTabChange } = props

  return (
    <Tabs
      defaultValue={defaultValue}
      onValueChange={(value: string) => {
        onTabChange(value)
      }}
    >
      <TabsList className="mb-4 pr-[875px]">
        {faucetsFilterData.map((faucet, index) => (
          <TabsTrigger key={index} value={faucet.value as string}>
            {faucet.label}
          </TabsTrigger>
        ))}
        <TabsIndicator />
      </TabsList>
      <div className="mb-8 h-[1px] bg-neutral-200" />
      {faucetsFilterData.map((faucetsFilter, index) => (
        <TabsContent key={index} value={faucetsFilter.value as string}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {faucets?.map((faucetInfo, index) => (
              <FaucetCard key={index} faucet={faucetInfo} />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

const MobileSelect: React.FC<TabsProps> = props => {
  const { faucets, defaultValue, onTabChange } = props

  return (
    <>
      <div className="border-neutral-200 border-b-[1px] pt-6 pb-4">
        <Select
          onValueChange={(value: string) => {
            onTabChange(value)
          }}
          defaultValue={defaultValue}
        >
          <SelectTrigger className="w-[163px] border-none bg-neutral-100">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {faucetsFilterData.map((faucet, index) => (
              <SelectItem key={index} value={faucet.value as string}>
                {faucet.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {faucets?.map((faucetInfo, index) => (
          <FaucetCard key={index} faucet={faucetInfo} />
        ))}
      </div>
    </>
  )
}

const FaucetTabs = () => {
  const { searchParam, onChange } = useQueryToUrl({ key: QUERY_PARAM })

  const defaultValue = searchParam ?? CustomBlockChainType.All

  const { data: faucetsList } = useSuspenseQuery({
    queryKey: [useGetAllFaucetsQuery.getKey(), queryMap.get(defaultValue)],
    queryFn: useGetAllFaucetsQuery.fetcher({
      where: {
        type: {
          in: queryMap.get(defaultValue),
        },
      },
    }),
  })

  return (
    <>
      <div className="hidden sm:block">
        <WebTabs faucets={faucetsList?.listFaucets.data ?? []} defaultValue={defaultValue} onTabChange={onChange} />
      </div>
      <div className="sm:hidden">
        <MobileSelect
          faucets={faucetsList?.listFaucets.data ?? []}
          defaultValue={defaultValue}
          onTabChange={onChange}
        />
      </div>
    </>
  )
}

export default FaucetTabs
