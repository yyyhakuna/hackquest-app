import { Editor } from '@hackquest/editor/react'
import { cn } from '@hackquest/ui/lib/utils'
import { Tag } from '@hackquest/ui/shared/tag'
import type React from 'react'

interface CardItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  receivers: number
  status?: 'upcoming' | 'end' | 'inProgress'
  desc: string
  content: string
}

const CardItem: React.FC<CardItemProps> = ({
  title,
  receivers,
  status,
  desc,
  content,
}) => {
  const renderTag = () => {
    switch (status) {
      case 'upcoming':
        return <Tag className="bg-neutral-200">Upcoming</Tag>
      case 'inProgress':
        return <Tag className="bg-success-100">Admin-triggered</Tag>
      case 'end':
        return <Tag className="bg-neutral-200 text-neutral-400">End</Tag>
    }
  }
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {title && <span>{title}</span>}
          {status && renderTag()}
        </div>
        <div className="">
          <span>recievers</span>
          <span className="p-[38px]">{receivers}</span>
        </div>
      </div>
      <div className="mt-3 mb-2 flex justify-between">
        <span className="body-s text-neutral-600">{desc}</span>
        <span>
          {receivers}/{receivers}
        </span>
      </div>

      <Editor
        className={cn(
          'body-s rounded-md border border-neutral-300 p-2 text-primary-neutral',
          status === 'end' && 'bg-neutral-100 text-neutral-400',
        )}
        value={content}
        disabled={true}
      />
    </div>
  )
}

export default CardItem
