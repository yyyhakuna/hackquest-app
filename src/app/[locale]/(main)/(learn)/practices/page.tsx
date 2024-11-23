import { alternates } from '@/constants/metadata'
import type {
  CourseLevel,
  InputMaybe,
  Language,
  SortOrder,
} from '@/graphql/generated/graphql'
import { useListCoursesQuery } from '@/graphql/generated/hooks'
import { getQueryClient } from '@/providers/root/query-client'
import { Separator } from '@hackquest/ui/shared/separator'
import * as React from 'react'
import { CourseFilter } from './components/course-filter'
import { CourseGrid } from './components/course-grid'
import { CourseSkeleton } from './components/course-skeleton'

type PageProps = {
  params: {
    locale: string
  }
  searchParams: {
    [key: string]: string | undefined
  }
}

function parseSearchParams(params: PageProps['searchParams']) {
  const offsetInt = Number.parseInt(params?.page ?? '1')
  const page = Number.isNaN(offsetInt) ? 1 : offsetInt
  return {
    page,
    limit: 12,
    orderBy: {
      createdAt: 'desc' as InputMaybe<SortOrder>,
    },
    ...(params?.ecosystem && {
      ecosystem: {
        has: params.ecosystem,
      },
    }),
    ...(params?.language && {
      language: {
        equals: params.language as Language,
      },
    }),
    ...(params?.track && {
      track: {
        equals: params.track,
      },
    }),
    ...(params?.level && {
      level: {
        equals: params.level as CourseLevel,
      },
    }),
  }
}

export async function generateMetadata({ params }: PageProps) {
  return {
    title: 'Practices',
    alternates: alternates(params.locale, 'practices'),
  }
}

async function getCourses(searchParams: ReturnType<typeof parseSearchParams>) {
  const { page, limit, orderBy, ...where } = searchParams

  const queryClient = getQueryClient()

  const { listCourses } = await queryClient.fetchQuery({
    queryKey: useListCoursesQuery.getKey({ page, limit, orderBy, where }),
    queryFn: useListCoursesQuery.fetcher({ page, limit, orderBy, where }),
    staleTime: Number.POSITIVE_INFINITY,
  })

  return listCourses
}

export default function Page({ searchParams }: PageProps) {
  const params = parseSearchParams(searchParams)

  const courses = getCourses(params)

  return (
    <div className="group sm:container max-sm:px-6">
      <div className="py-8 sm:py-20">
        <h1 className="title-1">Project</h1>
        <p className="body-m mt-2 text-secondary-neutral">
          Deep Dive into leading Ecosystems
        </p>
      </div>
      <CourseFilter />
      <Separator className="mt-4 mb-6 sm:mb-8" />
      <React.Suspense fallback={<CourseSkeleton />}>
        <CourseGrid
          searchParams={searchParams}
          coursesPromise={courses as any}
          page={params.page}
          limit={params.limit}
        />
      </React.Suspense>
    </div>
  )
}
