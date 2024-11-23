import { EcosystemDropdown } from '@/components/ecosystem/ecosystem-dropdown'
import { CertificateWidget } from '@/components/home/certificate-widget'
import { CertificateWidgetSkeleton } from '@/components/home/certificate-widget-skeleton'
import { CourseWidget } from '@/components/home/course-widget'
import { DailyQuestWidget } from '@/components/home/daily-quest-widget'
import { HackathonWidget } from '@/components/home/hackathon-widget'
import { alternates } from '@/constants/metadata'
import type { EcosystemPhaseExtend } from '@/graphql/generated/graphql'
import {
  useCertificateProgressQuery,
  useFindEcosystemInfoQuery,
} from '@/graphql/generated/hooks'
import { getQueryClient } from '@/providers/root/query-client'
import { Separator } from '@hackquest/ui/shared/separator'
import * as React from 'react'
import { PhaseList } from './components/phase-list'

type PageProps = {
  params: {
    ecosystemId: string
    locale: string
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

async function getCertificate({ params }: PageProps) {
  const { ecosystemId, locale } = params
  const queryClient = getQueryClient()

  const where = {
    ecosystemId_lang: {
      ecosystemId,
      lang: locale === 'en' ? 'en' : 'zh',
    },
  }

  return queryClient.fetchQuery({
    queryKey: useCertificateProgressQuery.getKey({ where }),
    queryFn: useCertificateProgressQuery.fetcher({ where }),
    staleTime: Number.POSITIVE_INFINITY,
  })
}

export async function generateMetadata({ params }: PageProps) {
  const { ecosystemId, locale } = params
  const { ecosystem } = await getEcosystemInfo({ params })
  return {
    title: ecosystem?.name,
    description: ecosystem?.description,
    alternates: alternates(locale, `home/${ecosystemId}`),
  }
}

export default async function Page({ params }: PageProps) {
  const { ecosystem } = await getEcosystemInfo({ params })

  const phases = (ecosystem?.phases as EcosystemPhaseExtend[]) || []

  const certificate = getCertificate({ params })

  return (
    <div className="sm:-mt-8 -mt-6 grid grid-cols-1 sm:container max-sm:p-5 sm:grid-cols-[1fr_1px_320px] sm:px-0">
      <div className="sm:hidden">
        <EcosystemDropdown />
      </div>
      <div className="w-full space-y-6 max-sm:mt-5 sm:space-y-8 sm:py-8 sm:pr-8">
        <PhaseList phases={phases} ecosystemId={ecosystem?.ecosystemId} />
      </div>
      <Separator className="h-full max-sm:hidden" orientation="vertical" />
      <div className="w-full max-sm:hidden">
        <React.Suspense fallback={<CertificateWidgetSkeleton />}>
          <CertificateWidget certificatePromise={certificate} />
        </React.Suspense>
        <HackathonWidget />
        <CourseWidget />
        <DailyQuestWidget />
      </div>
    </div>
  )
}
