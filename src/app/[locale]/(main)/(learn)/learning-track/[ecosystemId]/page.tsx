import { CertificatePreviewDialog } from '@/components/certificate/certificate-preview-dialog'
import { alternates } from '@/constants/metadata'
import { useFindEcosystemInfoQuery } from '@/graphql/generated/hooks'
import { getQueryClient } from '@/providers/root/query-client'
import * as React from 'react'
import { BasicInfo, BasicInfoSkeleton } from './components/basic-info'
import { CertificateWidget } from './components/certificate-widget'
import { ExpandButton } from './components/expand-button'
import { PhaseList, PhaseSkeleton } from './components/phase-list'

interface PageProps {
  params: {
    locale: string
    ecosystemId: string
  }
}

async function getEcosystemInfo({
  params: { ecosystemId, locale },
}: PageProps) {
  const queryClient = getQueryClient()

  const where = {
    ecosystemId_lang: {
      ecosystemId,
      lang: locale === 'en' ? 'en' : 'zh',
    },
  }

  return queryClient.fetchQuery({
    queryKey: useFindEcosystemInfoQuery.getKey({ where }),
    queryFn: useFindEcosystemInfoQuery.fetcher({ where }),
    staleTime: Number.POSITIVE_INFINITY,
  })
}

export async function generateMetadata({ params }: PageProps) {
  const { ecosystemId, locale } = params
  const { ecosystem } = await getEcosystemInfo({ params })
  return {
    title: ecosystem?.name,
    description: ecosystem?.description,
    alternates: alternates(locale, `learning-track/${ecosystemId}`),
  }
}

export default async function Page({ params }: PageProps) {
  const ecosystem = getEcosystemInfo({ params })

  return (
    <div className="-mt-6 sm:-mt-8">
      <React.Suspense fallback={<BasicInfoSkeleton />}>
        <BasicInfo ecosystemPromise={ecosystem} />
      </React.Suspense>
      <div className="py-8 sm:container max-sm:px-5">
        <div className="flex w-full flex-col-reverse gap-8 sm:flex-row">
          <div className="flex-1 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="title-3">Syllabus</h3>
              <ExpandButton ecosystemPromise={ecosystem} />
            </div>
            <React.Suspense fallback={<PhaseSkeleton />}>
              <PhaseList ecosystemPromise={ecosystem} />
            </React.Suspense>
          </div>
          <React.Suspense>
            <CertificateWidget ecosystemPromise={ecosystem} />
          </React.Suspense>
        </div>
      </div>
      <CertificatePreviewDialog />
    </div>
  )
}
