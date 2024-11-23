import { Link, useRouter } from '@/app/navigation'
import type { CoLearning } from '@/graphql/generated/hooks'
import dayjs from '@/lib/dayjs'
import { cn } from '@hackquest/ui/lib/utils'
import { Button } from '@hackquest/ui/shared/button'
import { Tag } from '@hackquest/ui/shared/tag'
import type React from 'react'
import { CiCalendar } from 'react-icons/ci'
import { FiClock } from 'react-icons/fi'
import { LuArrowRight } from 'react-icons/lu'

const Item = ({
  imgSrc,
  title,
  titleClassName,
}: {
  imgSrc: string | React.ReactElement
  title: string
  titleClassName?: string
}) => {
  return (
    <div className="flex items-center gap-2">
      {typeof imgSrc === 'string' ? (
        <img src={imgSrc} className="h-4 w-4" />
      ) : (
        imgSrc
      )}
      <div className={cn(' body-s text-secondary-neutral ' + titleClassName)}>
        {title}
      </div>
    </div>
  )
}

const CoLearningCard = ({ coLearning }: { coLearning: CoLearning }) => {
  const router = useRouter()
  const startTime = dayjs(coLearning.timeline?.startTime).format('MMM DD')
  const endTime = dayjs(coLearning.timeline?.endTime).format('MMM DD, YYYY')
  return (
    <div
      className="flex cursor-pointer gap-6 rounded-2xl border-2 border-neutral-200 p-6 transition-colors duration-300 hover:bg-neutral-100"
      onClick={() => {
        router.push(`co-learning/${coLearning.id}`)
      }}
    >
      <div className="w-full space-y-4">
        <img
          src="/images/events/events_banner.png"
          className="h-[174px] w-full rounded-lg object-cover sm:hidden"
        />
        <Tag>Ongoing</Tag>
        <div className="title-3 items-center gap-4 sm:flex">
          <span className="headline-l text-primary-neutral">
            {coLearning.name}
          </span>
          <div className="mt-4 flex gap-4 sm:mt-0">
            <Item
              imgSrc="/images/events/events_banner.png"
              title="solane"
              titleClassName=" text-neutral-800"
            />
            <Item
              imgSrc="/images/events/events_banner.png"
              title="solane"
              titleClassName=" text-neutral-800"
            />
          </div>
        </div>
        <div
          className="body-xs hidden h-[36px] text-secondary-neutral sm:block"
          dangerouslySetInnerHTML={{
            __html: coLearning.description ?? '',
          }}
        />
        <Item
          imgSrc={<CiCalendar />}
          title={startTime + ' - ' + endTime}
          titleClassName=""
        />
        <div className="flex w-full gap-4">
          <Link href={`/co-learning/${coLearning.id}/register`} className="">
            <Button className="" onClick={e => e.stopPropagation()}>
              Register Now <LuArrowRight />
            </Button>
          </Link>
          <Item
            title="16 days left"
            imgSrc={<FiClock />}
            titleClassName="headline-xs"
          />
        </div>
      </div>
      <img
        src="/images/events/events_banner.png"
        className="hidden rounded-lg sm:block"
      />
    </div>
  )
}

export default CoLearningCard
