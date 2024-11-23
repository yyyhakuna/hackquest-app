import { Link } from '@/app/navigation'
import type { CoLearning } from '@/graphql/generated/hooks'
import dayjs from '@/lib/dayjs'
import { Button } from '@hackquest/ui/shared/button'
import { Separator } from '@hackquest/ui/shared/separator'
import { Tag } from '@hackquest/ui/shared/tag'
import type React from 'react'
import { FaTelegram, FaWeixin } from 'react-icons/fa6'
import { IoCodeSlashOutline } from 'react-icons/io5'
import { LuCalendar } from 'react-icons/lu'

const Item = ({
  Icon,
  title,
  content,
  rightElement,
}: {
  Icon: React.ReactNode
  title: string
  content: string
  rightElement?: React.ReactNode
}) => {
  return (
    <div className="flex items-center gap-3 ">
      {Icon}
      <div>
        <div className="body-xs text-secondary-neutral">{title}</div>
        <div className='headline-m max-w-[172px] truncate text-primary-neutral'>
          {content}
        </div>
      </div>
      {rightElement}
    </div>
  )
}

const PageHeader = ({ coLearning }: { coLearning: CoLearning }) => {
  const ecosystemText = coLearning.ecosystem?.join(',') ?? ''
  const startTime = dayjs(coLearning.timeline?.startTime).format('MMM DD')
  const endTime = dayjs(coLearning.timeline?.endTime).format('MMM DD, YYYY')
  const getCommunityIcon = () => {
    switch (coLearning.communityType) {
      case 'Wechat':
        return <FaWeixin className="size-8" />
      case 'Telegram':
        return <FaTelegram className="size-8" />
      default:
        return
    }
  }
  return (
    <div className="items-center space-y-4 sm:w-2/3 sm:space-y-6">
      <div className="gap-6 space-y-4 sm:flex sm:space-y-0">
        <h1 className="title-1 text-primary-neutral">{coLearning.name}</h1>
        <Tag>Open for Registration</Tag>
      </div>
      <div
        className="body-m text-secondary-neutral "
        dangerouslySetInnerHTML={{
          __html: coLearning.description ?? '',
        }}
      />
      <div className="gap-8 space-y-4 sm:flex sm:h-[34px] sm:space-y-0">
        <Item
          Icon={<IoCodeSlashOutline className="size-8 " />}
          title="ecosystem"
          content={ecosystemText}
        />
        <Separator orientation="vertical" className="hidden sm:block" />
        <Item
          Icon={<LuCalendar className="size-8" />}
          title="Date"
          content={startTime + ' - ' + endTime}
        />
        <Separator orientation="vertical" className="hidden sm:block" />

        {coLearning.communityType && (
          <Item
            Icon={getCommunityIcon()}
            title="ecosystem"
            content={coLearning.communityType}
            rightElement={
              <Link href={coLearning.communityUrl ?? ''}>
                <Button size="small">Join</Button>
              </Link>
            }
          />
        )}
      </div>
    </div>
  )
}

export default PageHeader
