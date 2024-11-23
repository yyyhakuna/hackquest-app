'use client'

import { useFindCourseDetailQuery } from '@/graphql/generated/hooks'
import { useSuspenseQuery } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import LearningDetailContent from './course-detail-content'
import LearningDetailHeader from './course-detail-header'

const LearningDetail = ({ alias }: { alias: string }) => {

  const where = {alias: {equals:alias }}

  const { data } = useSuspenseQuery({
    queryKey: useFindCourseDetailQuery.getKey({where}),
    queryFn: useFindCourseDetailQuery.fetcher({where}),
    select: data => data.findCourseDetail,
  })

  if (!data) {
    notFound()
  }

  return (
    <>
      <div className="sm:-mt-8 sm:bg-neutral-100 sm:pt-8">
        <div className="container">
          <LearningDetailHeader course={data} />
        </div>
      </div>

      <div className="container">
        <LearningDetailContent course={data} />
      </div>
    </>
  )
}

export default LearningDetail
