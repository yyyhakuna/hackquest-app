import { alternates } from '@/constants/metadata'
import { execute } from '@/graphql/generated/execute'
import { FindCourseDetailDocument } from '@/graphql/generated/graphql'
import { useFindCourseDetailQuery } from '@/graphql/generated/hooks'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { Suspense } from 'react'
import LearningDetail from './components/course-detail'
import CourseDetailSkeleton from './components/course-detail-skeleton'

interface PageProps {
  params: {
    locale: string
    alias: string
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { alias, locale } = params

  const decodeAlias = decodeURIComponent(alias)
  const course = await execute(FindCourseDetailDocument, { where: {alias: {equals: decodeAlias}} })

  return {
    title: course.findCourseDetail.title,
    alternates: alternates(locale, `/course/${alias}`),
  }
}

export default async function Page({ params }: PageProps) {
  const queryClient = new QueryClient()

  const alias = decodeURIComponent(params.alias)

  const where = {alias: {equals:alias }}

  await queryClient.prefetchQuery({
    queryKey: useFindCourseDetailQuery.getKey({ where }),
    queryFn: useFindCourseDetailQuery.fetcher({ where }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<CourseDetailSkeleton />}>
        <LearningDetail alias={alias} />
      </Suspense>
    </HydrationBoundary>
  )
}
