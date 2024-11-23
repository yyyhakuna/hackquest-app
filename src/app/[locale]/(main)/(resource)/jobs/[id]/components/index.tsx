'use client'
import { useFindUniqueJobStationQuery } from '@/graphql/generated/hooks'
import type { Job } from '@/service/jobs/types'
import { Tag } from '@hackquest/ui/shared/tag'
import { useSuspenseQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { LuClock4, LuDollarSign, LuMapPin } from 'react-icons/lu'
import { formatLocation, formatSalary } from '../../utils'
import { workTypes } from '../../validations'
import { Back } from './back'
import { Footer } from './footer'
import { JobDescription } from './job-description'

export default function Page({ id }: { id: string }) {
  const t = useTranslations('Jobs')
  const { data } = useSuspenseQuery({
    queryKey: useFindUniqueJobStationQuery.getKey({ where: { id: id } }),
    queryFn: useFindUniqueJobStationQuery.fetcher({ where: { id: id } }),
  })

  const job = data.findUniqueJobStation as Job

  return (
    <motion.div
      className='container fixed top-0 flex h-full w-full flex-col bg-neutral-white py-6 pb-[-300px] sm:static sm:max-h-[calc(100vh-112px)] sm:py-0'
      initial={{ translateX: -50, opacity: 0 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className=" w-full flex-1 space-y-4 overflow-auto sm:max-w-4xl"
        style={{ scrollbarWidth: 'none' }}
      >
        <Back />
        <h1 className="title-3 pt-5 text-primary-neutral sm:pt-0">
          {job.name}
        </h1>
        <div className="flex items-center gap-2">
          <div className="relative h-6 w-6 overflow-hidden rounded-full">
            <Image
              src={job.companyLogo}
              alt={job.companyName}
              fill
              className="rounded-full"
            />
          </div>
          <h3 className="body-s text-secondary-neutral">{job.companyName}</h3>
        </div>
        <div className="body-xs flex items-center gap-4 text-secondary-neutral">
          {job.minSalary && job.maxSalary ? (
            <div className="flex shrink-0 items-center gap-2 ">
              <LuDollarSign /> {formatSalary(job)}
            </div>
          ) : null}
          <div className="flex items-center gap-2">
            <LuClock4 className="h-5 w-5" />
            <span>{t(workTypes.find(w => w.id === job.workType)!.label)}</span>
          </div>
          <div className="flex items-center gap-2">
            <LuMapPin className="h-5 w-5" />
            <span>{formatLocation(job)}</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {job.tags?.map(tag => (
            <Tag key={tag} className="body-s text-primary-neutral">
              {tag}
            </Tag>
          ))}
        </div>
        <JobDescription description={job.description} />
      </div>
      <Footer
        createdAt={job.createdAt}
        contact={job.contact!}
        id={job.id}
        favorited={!!job.favorites?.length}
      />
    </motion.div>
  )
}
