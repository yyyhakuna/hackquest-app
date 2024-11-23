'use client'

import { Link } from '@/app/navigation'
import { ServerPagination } from '@/components/common/server-pagination'
import { ecosystemTagColors } from '@/constants/global'
import type { CourseListPaginated, CourseV2 } from '@/graphql/generated/graphql'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@hackquest/ui/shared/card'
import { Tag } from '@hackquest/ui/shared/tag'
import Image from 'next/image'
import * as React from 'react'
import { LuBarChart } from 'react-icons/lu'
import { LuBook } from 'react-icons/lu'
import { PiCode } from 'react-icons/pi'

export function CourseGrid({
  coursesPromise,
  searchParams,
  page,
  limit,
}: {
  coursesPromise: Promise<CourseListPaginated>
  searchParams: Record<string, string | number | undefined>
  page: number
  limit: number
}) {
  const { data, total } = React.use(coursesPromise)

  const noFilters = Object.values(searchParams).every(
    value => value === undefined,
  )

  const currentPage = Math.max(1, page)
  const totalPages = Math.ceil(total / limit)

  return (
    <React.Fragment>
      <div className="grid gap-4 group-has-[[data-pending]]:pointer-events-none group-has-[[data-pending]]:animate-pulse sm:grid-cols-3">
        {!data?.length ? (
          <p className="col-span-full mt-8 text-center text-secondary-neutral">
            No courses found.
          </p>
        ) : (
          data.map(course => (
            <Link
              key={course.id}
              href={`/courses/${course.alias}`}
              prefetch={noFilters ? true : undefined}
            >
              <CourseCard course={course} />
            </Link>
          ))
        )}
      </div>
      <ServerPagination
        total={total}
        limit={limit}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </React.Fragment>
  )
}

export function CourseCard({ course }: { course: Omit<CourseV2, '_count'> }) {
  return (
    <Card className="relative">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        {course.ecosystem?.map(ecosystem => (
          <Tag key={ecosystem} color={ecosystemTagColors[ecosystem]}>
            {ecosystem}
          </Tag>
        ))}
      </div>
      <CardContent className="space-y-4 p-4">
        <div className="relative size-16">
          <Image
            src="/images/project/project-default.png"
            alt={course.title}
            fill
          />
        </div>
        <CardTitle className="headline-m sm:headline-l line-clamp-1">
          {course.title}
        </CardTitle>
        <CardDescription className="body-m hidden h-[4.5rem] text-secondary-neutral sm:line-clamp-3">
          {course.description}
        </CardDescription>
        <CardFooter className="flex items-center gap-5 p-0 text-neutral-600">
          <div className="flex items-center gap-2">
            <PiCode className="size-4" />
            <span className="body-xs sm:body-s">{course.language}</span>
          </div>
          <div className="flex items-center gap-2">
            <LuBarChart className="size-4" />
            <span className="body-xs sm:body-s">{course.level}</span>
          </div>
          <div className="flex items-center gap-2">
            <LuBook className="size-4" />
            <span className="body-xs sm:body-s">{course.track}</span>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  )
}
