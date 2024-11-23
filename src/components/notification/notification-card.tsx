import dayjs from '@/lib/dayjs'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@hackquest/ui/shared/avatar'
import type React from 'react'

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface NotificationCardProp {}

const NotificationCard: React.FC<NotificationCardProp> = () => {
  const isRead = true
  return (
    <div
      className={`flex cursor-pointer items-center gap-3 border-neutral-200 border-b p-6 ${isRead && 'bg-neutral-100'}`}
    >
      <Avatar className="size-9">
        <AvatarImage src={''} alt={''} />
        <AvatarFallback>{'S'}</AvatarFallback>
      </Avatar>
      <div className="flex-1 shrink-0">
        <div className="body-s flex justify-between text-neutral-500">
          <span>Product Update</span>
          <span>{dayjs().format('MMM D,YYYY')}</span>
        </div>
        <div className="body-m mt-1 text-neutral-800">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
      </div>
    </div>
  )
}

export default NotificationCard
