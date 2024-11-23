'use client'
import { Link } from '@/app/navigation'
import { Button } from '@hackquest/ui/shared/button'
import { useTranslations } from 'next-intl'
import { IoMdAdd } from 'react-icons/io'
import { JobTabs } from './job-tabs'
const Hiring = async () => {
  const t = useTranslations('Jobs.hiring')

  //   const { data } = useQuery({
  //     queryKey: useListJobStationsQuery.getKey(),
  //     queryFn: useListJobStationsQuery.fetcher({
  //       limit: 1,
  //     }),
  //   })
  //   console.log(data)

  return (
    <div className="container p-6">
      <div className="mb-14 space-y-6">
        <div className="flex items-end justify-between">
          <h1 className="title-1 text-primary-neutral">{t('hiringPortal')}</h1>
          <img
            src="/images/jobs/asset.svg"
            alt=""
            className="h-[55px] w-[55px] sm:hidden"
          />
        </div>
        <div className="flex gap-6">
          <Link href="publish">
            <Button>
              {t('postJob')}
              <IoMdAdd />
            </Button>
          </Link>
        </div>
      </div>
      <JobTabs />
      <div className="relative mt-6 flex w-full flex-start gap-8">
        <div className="flex flex-1 flex-col gap-6">
          {/* <JobCard job={data!.listJobStations!.data![0] as Job} /> */}
          {/* {jobs.total > 0 ? (
            jobs.data?.map(job => <JobCard key={job.id} job={job as Job} />)
          ) : (
            <div className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl bg-neutral-white py-20">
              <LuHelpCircle size={32} className="text-neutral-medium-gray" />
              <p className="text-neutral-medium-gray">{t('noJobFound')}</p>
            </div>
          )} */}
          {/* <Pagination total={jobs.total} onPageChange={updatePage} page={page} /> */}
        </div>
        {/* <JobFilter /> */}
      </div>
    </div>
  )
}

export default Hiring
