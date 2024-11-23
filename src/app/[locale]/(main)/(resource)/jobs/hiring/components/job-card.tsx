'use client'
import { Link } from '@/app/navigation'
import type { Job } from '@/service/jobs/types'
import { Button } from '@hackquest/ui/shared/button'
import { Tag } from '@hackquest/ui/shared/tag'
import { useTranslations } from 'next-intl'
import { LuClock4, LuMapPin } from 'react-icons/lu'
import { LuDollarSign } from 'react-icons/lu'
import { formatLocation, formatSalary } from '../../utils'
import { workTypes } from '../../validations'

export function JobCard({ job }: { job: Job }) {
  const t = useTranslations('Jobs')

  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="sm:card-hover relative flex w-full flex-col gap-4 rounded-2xl border-2 border-neutral-200 bg-neutral-white p-4 sm:gap-6 sm:p-6">
        <div className="items-center gap-4 sm:flex ">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
            <img
              src={job.companyLogo}
              alt={job.companyName}
              className="rounded-full"
            />
          </div>
          <div className="mt-4 flex flex-col sm:mt-0">
            <span
              className="body-xs text-secondary-neutral"
              data-prevent-nprogress={true}
              //   onClick={e => {
              //     e.preventDefault()
              //     e.stopPropagation()
              //     window.open(job.website, '_blank'
              //   }}
            >
              {job.companyName}
            </span>
            <h3 className="headline-m text-primary-neutral">{job.name}</h3>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {job.tags.map(tag => (
            <Tag key={tag} className="body-s text-primary-neutral">
              {tag}
            </Tag>
          ))}
        </div>
        <div className="body-xs flex flex-row flex-wrap items-center gap-3 text-secondary-neutral">
          <div className="flex items-center gap-4">
            {job.minSalary && job.maxSalary ? (
              <div className="flex shrink-0 items-center gap-2 ">
                <LuDollarSign /> {formatSalary(job)}
              </div>
            ) : null}
            {job.workType && (
              <div className="flex shrink-0 items-center gap-2">
                <LuClock4 className="h-5 w-5" />
                <span>
                  {t(workTypes.find(type => type.id === job.workType)?.label!)}
                </span>
              </div>
            )}
          </div>
          {job.workMode && (
            <div className=" flex shrink-0 items-center gap-2 sm:mt-0">
              <LuMapPin className="h-5 w-5" />
              <span>{formatLocation(job)}</span>
            </div>
          )}
        </div>
        <Button className="absolute right-0" />
        {/* <FavoriteButton jobId={job.id} favorited={job.favorited} className="absolute bottom-7 left-4 sm:hidden" /> */}
      </div>
    </Link>
  )
}
