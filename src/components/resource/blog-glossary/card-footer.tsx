import type { Blog } from '@/graphql/generated/hooks'
import { cn } from '@hackquest/ui/lib/utils'
import dayjs from 'dayjs'
import type React from 'react'

type CardFooterProp = {
  blog: Blog
  className?: string
  maxWidth?: string
}

const CardFooter: React.FC<CardFooterProp> = ({ blog, className, maxWidth }) => {
  return (
    <div className={cn('body-xs flex w-full items-center gap-[0.625rem] text-neutral-500', className)}>
      <div className={cn('flex max-w-[42.5%] items-center', `${maxWidth}`)}>
        <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap" title={blog?.creatorName}>
          {`by  ${blog?.creatorName}`}
        </div>
      </div>
      <div className={'border-x-neutral-200 border-r border-l px-[0.625rem]'}>
        {dayjs(blog?.publishDate).format('MMM D,YYYY')}
      </div>
      <div>{blog?.duration} min read</div>
    </div>
  )
}

export default CardFooter
