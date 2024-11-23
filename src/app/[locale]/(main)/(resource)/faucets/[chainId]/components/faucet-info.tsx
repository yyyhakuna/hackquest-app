'use client'

import { useGetFaucetDetailByIdQuery } from '@/graphql/generated/hooks'
import { useAuthenticated } from '@/store/user'
import { useSuspenseQuery } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import DonateCard from './donate-card'
import FaucetInfoHeader from './faucet-info-header'
import FaucetTable, { FaucetEmptyTable } from './faucet-table'

interface FaucetInfoProp {
  chainId: string
}

const FaucetInfo: React.FC<FaucetInfoProp> = ({ chainId }) => {
  const { data: faucetInfo } = useSuspenseQuery({
    queryKey: useGetFaucetDetailByIdQuery.getKey(),
    queryFn: useGetFaucetDetailByIdQuery.fetcher({
      where: {
        chainId: {
          equals: Number(chainId),
        },
      },
    }),
  })

  const isAuthenticated = useAuthenticated()

  if (!faucetInfo) {
    notFound()
  }

  return (
    <div className="px-6 sm:pr-[344px]">
      <FaucetInfoHeader faucetInfo={faucetInfo.findFirstFaucet} />
      {isAuthenticated ? (
        <FaucetTable faucetInfo={faucetInfo.findFirstFaucet} />
      ) : (
        <FaucetEmptyTable />
      )}
      <DonateCard faucetInfo={faucetInfo.findFirstFaucet} />
    </div>
  )
}

export default FaucetInfo
