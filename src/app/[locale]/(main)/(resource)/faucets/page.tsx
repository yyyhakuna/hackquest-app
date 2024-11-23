import MenuLink from '@/constants/menu-link'
import { BlockChainType } from '@/graphql/generated/graphql'
import { useGetAllFaucetsQuery } from '@/graphql/generated/hooks'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import FaucetsPage from './components/faucet-page'
import FaucetSkeleton from './components/faucetSkeleton'

interface FaucetsProp {
  params: {
    locale: string
  }
}

export async function generateMetadata({
  params,
}: FaucetsProp): Promise<Metadata> {
  const { locale } = params

  const metadata: Metadata = {
    title: 'Free Testnet Faucets',
    alternates: {
      canonical: `https://www.hackquest.io${locale ? `/${locale}` : ''}${MenuLink.FAUCETS}`,
    },
  }

  return metadata
}

const Faucets = async () => {
  const queryClient = new QueryClient()

  const queryParams = Object.values(BlockChainType)

  await queryClient.prefetchQuery({
    queryKey: useGetAllFaucetsQuery.getKey(),
    queryFn: useGetAllFaucetsQuery.fetcher({
      where: {
        type: {
          in: queryParams,
        },
      },
    }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<FaucetSkeleton />}>
        <FaucetsPage />
      </Suspense>
    </HydrationBoundary>
  )
}

export default Faucets
