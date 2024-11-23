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
      className="flex w-full cursor-pointer justify-between gap-6 rounded-2xl border-2 border-neutral-200 p-6 transition-colors duration-300 hover:bg-neutral-100"
      onClick={() => {
        router.push(`co-learning/${coLearning.id}`)
      }}
    >
      <div className=" flex-1 space-y-4">
        <Tag>Ongoing</Tag>
        <div className="title-3 flex gap-4 text-primary-neutral">
          {coLearning.name}
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
        <div
          className="body-xs h-[36px] text-secondary-neutral"
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
          <div className="flex w-1/2 gap-6">
            <Link href={`organizer/${coLearning.id}`} className="flex-1">
              <Button className="w-full" onClick={e => e.stopPropagation()}>
                Manage <LuArrowRight />
              </Button>
            </Link>
            <Link href={`organizer/${coLearning.id}/create`} className="flex-1">
              <Button
                className="w-full"
                variant="outline"
                color="neutral"
                onClick={e => e.stopPropagation()}
              >
                Edit <LuArrowRight />
              </Button>
            </Link>
          </div>
          <Item
            title="16 days left"
            imgSrc={<FiClock />}
            titleClassName="headline-xs"
          />
        </div>
      </div>
      <img src="/images/events/events_banner.png" />
    </div>
  )
}

export default CoLearningCard
