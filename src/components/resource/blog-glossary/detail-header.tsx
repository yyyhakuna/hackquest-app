import { useRouter } from '@/app/navigation'
import type { Blog, Glossary } from '@/graphql/generated/hooks'
import { Tag } from '@hackquest/ui/shared/tag'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import type React from 'react'
import { FiArrowLeft } from 'react-icons/fi'

interface DetailHeaderProp {
  info: Blog & Glossary
  type: 'blog' | 'glossary'
}

const DetailHeader: React.FC<DetailHeaderProp> = ({ info, type }) => {
  const t = useTranslations()
  const router = useRouter()
  return (
    <div className="px-6 pb-8 text-neutral-800 sm:container">
      <div
        className="headline-s flex cursor-pointer items-center gap-2"
        onClick={() => router.back()}
      >
        <FiArrowLeft />
        <span>{t('Common.back')}</span>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <h1 className="title-1">{info.title}</h1>
        <div className="flex flex-wrap gap-2">
          {info[type === 'blog' ? 'categories' : 'tracks']?.map(item => (
            <Tag key={item} className="bg-primary-200">
              {item}
            </Tag>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4 text-neutral-500">
          <div>
            {`By `}
            <span className="headline-m text-blue-500">{info.creatorName}</span>
          </div>
          <span className={'border-neutral-500 border-l pl-4'}>
            {dayjs(info?.publishDate).format('MMM D,YYYY')}
          </span>
          <span className="border-neutral-500 border-l pl-4">
            {info?.duration} min read
          </span>
        </div>
      </div>
    </div>
  )
}

export default DetailHeader
