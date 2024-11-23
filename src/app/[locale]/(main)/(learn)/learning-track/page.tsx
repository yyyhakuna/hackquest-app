import { EcosystemSkeleton } from '@/components/ecosystem/ecosystem-skeleton'
import { alternates } from '@/constants/metadata'
import type {
  EcosystemInfoWhereInput,
  Language,
} from '@/graphql/generated/graphql'
import { useListEcosystemInfosQuery } from '@/graphql/generated/hooks'
import { getQueryClient } from '@/providers/root/query-client'
import { Separator } from '@hackquest/ui/shared/separator'
import Image from 'next/image'
import * as React from 'react'
import { EcosystemFilter } from './components/ecosystem-filter'
import EcosystemGrid from './components/ecosystem-grid'

type PageProps = {
  params: {
    locale: string
  }
  searchParams: {
    [key: string]: string | undefined
  }
}

export async function generateMetadata({ params }: PageProps) {
  return {
    title: 'Learning Track',
    alternates: alternates(params.locale, 'learning-track'),
  }
}

async function getEcosystems({ params, searchParams }: PageProps) {
  const where: EcosystemInfoWhereInput = {
    lang: { equals: params.locale === 'en' ? 'en' : 'zh' },
    ...(searchParams.language && {
      basic: {
        is: {
          language: {
            equals: searchParams.language as Language,
          },
        },
      },
    }),
  }

  const queryClient = getQueryClient()

  const { listEcosystemInfos } = await queryClient.fetchQuery({
    queryKey: useListEcosystemInfosQuery.getKey({ where }),
    queryFn: useListEcosystemInfosQuery.fetcher({ where, limit: null }),
    staleTime: Number.POSITIVE_INFINITY,
  })

  return listEcosystemInfos
}

export default function Page({ params, searchParams }: PageProps) {
  const ecosystems = getEcosystems({ params, searchParams })
  return (
    <div className="container max-sm:px-6">
      <div className="relative py-8 sm:py-20">
        <h1 className="title-1">Certified Learning Track</h1>
        <p className="body-m mt-2 text-secondary-neutral">
          Deep Dive into leading Ecosystems
        </p>
        <div className="absolute top-0 right-32 hidden sm:block">
          <Image
            src="/images/logo/duck.png"
            alt="duck"
            width={163}
            height={234}
          />
        </div>
      </div>
      <EcosystemFilter />
      <Separator className="mt-4 mb-6 sm:mb-8" />
      <div className="group-has-[[data-pending]]:pointer-events-none group-has-[[data-pending]]:animate-pulse">
        <React.Suspense fallback={<EcosystemSkeleton />}>
          <EcosystemGrid ecosystemsPromise={ecosystems as any} />
        </React.Suspense>
      </div>
    </div>
  )
}
