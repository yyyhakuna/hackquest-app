import { getActiveEcosystem } from '@/actions/ecosystem'
import { EcosystemSkeleton } from '@/components/ecosystem/ecosystem-skeleton'
import MenuLink from '@/constants/menu-link'
import { alternates } from '@/constants/metadata'
import { useListEcosystemInfosQuery } from '@/graphql/generated/hooks'
import { getQueryClient } from '@/providers/root/query-client'
import { redirect } from 'next/navigation'
import * as React from 'react'
import { EcosystemGrid } from './components/ecosystem-grid'

type PageProps = {
  params: { locale: string }
}

export async function generateMetadata({ params }: PageProps) {
  return {
    title: 'Home',
    description: 'Explore Learning Tracks',
    alternates: alternates(params.locale, 'home'),
  }
}

async function getEcosystems({ params }: PageProps) {
  const where = {
    lang: { equals: params.locale === 'en' ? 'en' : 'zh' },
  }

  const queryClient = getQueryClient()

  const { listEcosystemInfos } = await queryClient.fetchQuery({
    queryKey: useListEcosystemInfosQuery.getKey({ where }),
    queryFn: useListEcosystemInfosQuery.fetcher({ where }),
    staleTime: Number.POSITIVE_INFINITY,
  })

  return listEcosystemInfos
}

export default async function Page({ params }: PageProps) {
  const ecosystemId = await getActiveEcosystem()
  const ecosystemsPromise = getEcosystems({ params })

  if (ecosystemId) {
    redirect(`${MenuLink.HOME}/${ecosystemId}`)
  } else {
    return (
      <main className="container space-y-6">
        <h1 className="title-3">Explore Learning Tracks</h1>
        <React.Suspense fallback={<EcosystemSkeleton />}>
          <EcosystemGrid ecosystemsPromise={ecosystemsPromise as any} />
        </React.Suspense>
      </main>
    )
  }
}
