import type { CoLearning } from '@/graphql/generated/hooks'
import dayjs from '@/lib/dayjs'
import { cn } from '@hackquest/ui/lib/utils'
import { Button } from '@hackquest/ui/shared/button'
import { Separator } from '@hackquest/ui/shared/separator'
import { LuDownload, LuVideo } from 'react-icons/lu'

//status:indicate the item status, 0 means this Item it's going to start, 1 means this Item is in progress, 2 means this Item is elapsed
const Item = ({
  status,
  date,
  title,
  schedule,
  items = [],
}: {
  status: 0 | 1 | 2
  date: string
  title: string
  schedule: string
  items?: string[]
}) => {
  return (
    <div className="relative flex gap-8">
      <div className="body-s w-16 py-4 text-secondary-neutral">{date}</div>
      <Separator
        orientation="vertical"
        className={cn(
          ' absolute left-16',
          status === 1 && 'bg-secondary-neutral',
        )}
      />
      <div className="flex w-full justify-between py-3">
        <div className="space-y-2 ">
          <div className="headline-m text-primary-neutral">{title}</div>
          <div className="body-s text-primary-neutral">{schedule}</div>
          {status !== 2 && (
            <Button
              color={status === 0 ? 'neutral' : 'primary'}
              variant={status === 0 ? 'outline' : 'default'}
              size="small"
            >
              {status === 0 ? (
                'View Recording'
              ) : (
                <div className="flex items-center gap-1">
                  <span>Join Meeting</span>
                  <LuVideo className="size-4" />
                </div>
              )}
            </Button>
          )}
        </div>
        <div className="hidden space-y-2 sm:block">
          {items.map(item => (
            <div
              className="body-s w-[280px] truncate text-secondary-neutral"
              key={item}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const Timeline = ({ coLearning }: { coLearning: CoLearning }) => {
  const events = coLearning.events
  return (
    <div className="mt-6 space-y-4 sm:mt-16 sm:w-2/3">
      <div className="flex items-center gap-4">
        <div className="title-3 text-primary-neutral">Timeline</div>
        <Button
          variant="outline"
          color="neutral"
          className="hidden sm:block"
          size="small"
        >
          Calendar <LuDownload />
        </Button>
      </div>

      <div>
        {events?.map(item => {
          const schedule =
            dayjs(item.startTime).format('h:mm A') +
            ' - ' +
            dayjs(item.endTime).format('h:mm A')
          const status = dayjs().isBefore(item.startTime)
            ? 2
            : dayjs().isAfter(item.endTime)
              ? 0
              : 1
          return (
            <Item
              status={status}
              key={item.id}
              date={dayjs(item.startTime).format('MMM DD')}
              title={item.title ?? ''}
              schedule={schedule}
            />
          )
        })}
      </div>
      <Button variant="outline" color="neutral" className="sm:hidden">
        Calendar <LuDownload />
      </Button>
    </div>
  )
}

export default Timeline
