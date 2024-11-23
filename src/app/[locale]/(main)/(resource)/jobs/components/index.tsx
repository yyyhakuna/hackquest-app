'use client'
import { usePathname, useRouter } from '@/app/navigation'
import { Link } from '@/app/navigation'
import { Pagination } from '@/components/common/pagination'
import { useListJobStationsQuery } from '@/graphql/generated/hooks'
import { createUrl } from '@/lib/utils'
import type { Job } from '@/service/jobs/types'
import { Button } from '@hackquest/ui/shared/button'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import type React from 'react'
import { HiArrowRight } from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'
import { LuHelpCircle } from 'react-icons/lu'
import { type SearchParams, parseParams } from '../utils'
import { JobCard } from './job-card'
import { JobFilter } from './job-filter'
import { JobTabs } from './job-tabs'
import MobileSelectZone from './mobile-selector-zone'
interface JobsProps {
  searchParams: SearchParams
}

const Jobs: React.FC<JobsProps> = ({ searchParams }) => {
  const t = useTranslations('Jobs')
  const params = parseParams(searchParams)
  const currentParams = new URLSearchParams(searchParams.toString())
  const pathname = usePathname()
  const router = useRouter()
  const { data } = useSuspenseQuery({
    queryKey: useListJobStationsQuery.getKey(params),
    queryFn: useListJobStationsQuery.fetcher(params),
  })
  const page = Number(searchParams.page) || 1
  const updatePage = (newPage: number) => {
    if (newPage === page) return
    if (newPage === 1) {
      currentParams.delete('page')
    } else {
      currentParams.set('page', String(newPage))
    }
    const url = createUrl(pathname, currentParams)
    router.replace(url)
  }
  const jobs = data.listJobStations

  return (
    <div className="container p-6">
      <div className="mb-14 space-y-6">
        <div className="flex items-end justify-between">
          <h1 className="title-1 text-primary-neutral">{t('title')}</h1>
          <img
            src="/images/jobs/asset.svg"
            alt=""
            className="h-[55px] w-[55px] sm:hidden"
          />
        </div>
        <div className="flex gap-6">
          <Link href="jobs/publish">
            <Button>
              {t('postJob')}

              <IoMdAdd />
            </Button>
          </Link>
          <Link href="jobs/hiring">
            <Button variant="outline" color="neutral">
              {t('hiringPortal')} <HiArrowRight />
            </Button>
          </Link>
        </div>
      </div>
      <JobTabs />
      <MobileSelectZone className="mt-4 sm:hidden" />
      <div className="relative mt-6 flex w-full flex-start gap-8">
        <div className="flex flex-1 flex-col gap-6">
          {jobs.total > 0 ? (
            jobs.data?.map(job => <JobCard key={job.id} job={job as Job} />)
          ) : (
            <div className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl bg-neutral-white py-20">
              <LuHelpCircle size={32} className="text-neutral-medium-gray" />
              <p className="text-neutral-medium-gray">{t('noJobFound')}</p>
            </div>
          )}
          <Pagination
            total={jobs.total}
            onPageChange={updatePage}
            page={page}
          />
        </div>
        <JobFilter />
      </div>
    </div>
  )
}

export default Jobs
