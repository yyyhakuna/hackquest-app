import { cn } from '@hackquest/ui/lib/utils'
import type React from 'react'
import type { ReactNode } from 'react'

type PageHeaderProp = {
  title: string
  description: string
  img: ReactNode
  button: ReactNode
  className?:string
}

const PageHeader: React.FC<PageHeaderProp> = ({title,description,img,button,className}) => {

  return <div className={cn('relative flex flex-col gap-6',className)}>
    <h1 className='title-1 flex items-center justify-between text-neutral-800'>
      <span>{title}</span>
      <div className='sm:hidden'>{img}</div>
    </h1>
    <p className='body-m w-full text-neutral-500 sm:w-[68%]'>{description}</p>
    {button}
    <div className='hidden sm:block '>
    {img}
    </div>
  </div>
}

export default PageHeader
