import MenuLink from '@/constants/menu-link'
import { alternates } from '@/constants/metadata'
import { execute } from '@/graphql/generated/execute'
import { GetFaucetDetailByIdDocument } from '@/graphql/generated/graphql'
import {
  useGetFaucetDetailByIdQuery,
  useListFaucetsClaimRecordByChainIdQuery,
} from '@/graphql/generated/hooks'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import type { Metadata } from 'next'
import type { FC } from 'react'
import FaucetInfo from './components/faucet-info'

interface BlogDetailProp {
  params: {
    chainId: string
    locale: string
  }
}

export async function generateMetadata({
  params,
}: BlogDetailProp): Promise<Metadata> {
  const { chainId, locale } = params
  const faucet = await execute(GetFaucetDetailByIdDocument, {
    where: {
      chainId: {
        equals: Number(chainId),
      },
    },
  })

  return {
    title: faucet.findFirstFaucet.name,
    alternates: alternates(locale, `${MenuLink.FAUCETS}/${params.chainId}`),
  }
}

const FaucetDetail: FC<BlogDetailProp> = async ({ params }) => {
  const { chainId } = params
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: useGetFaucetDetailByIdQuery.getKey(),
    queryFn: useGetFaucetDetailByIdQuery.fetcher({
      where: {
        chainId: {
          equals: Number(chainId),
        },
      },
    }),
  })

  await queryClient.prefetchQuery({
    queryKey: useListFaucetsClaimRecordByChainIdQuery.getKey({ chainId }),
    queryFn: useListFaucetsClaimRecordByChainIdQuery.fetcher({
      page: 1,
      limit: 10,
      chainId,
    }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FaucetInfo chainId={chainId} />
    </HydrationBoundary>
  )
}

export default FaucetDetail
