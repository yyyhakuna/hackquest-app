import ClientOnly from '@/components/common/client-only'
import MenuLink from '@/constants/menu-link'
import type { PageV2 } from '@/graphql/generated/hooks'
import { getToken } from '@/lib/user-token'
import { LearnProvider } from '@/providers/learn/learn-provider'
import {
  courseOptions,
  lessonOptions,
} from '@/providers/learn/utils/query-options'
import { getQueryClient } from '@/providers/root/query-client'
import { userInfoQueryOptions } from '@/service/auth'
import type { CourseType } from '@/store/learn'
import { Spinner } from '@hackquest/ui/shared/spinner'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import type { Metadata } from 'next'
import { permanentRedirect } from 'next/navigation'
import * as React from 'react'
import CourseProgress from './components/course-progress'
import LayoutFooter from './components/layout-footer'
import { LayoutHeader } from './components/layout-header'

export const metadata: Metadata = {
  title: 'Hackathon Learn',
}

function SuspenseFallback() {
  return (
    <div className="flex h-[calc(100vh-64px)] items-center justify-center">
      <Spinner />
    </div>
  )
}

export default async function Layout({
  params,
  children,
}: Readonly<{
  params: { alias: string; lessonId: string }
  children: React.ReactNode
}>) {
  try {
    const queryClient = getQueryClient()
    let userInfo
    if (getToken())
      userInfo = await queryClient.fetchQuery(userInfoQueryOptions())
    if (!userInfo) {
      return permanentRedirect(MenuLink.PRACTICES)
    }
    const { alias, lessonId } = params

    const { findCourseDetail: course } = await queryClient.fetchQuery(
      courseOptions(alias),
    )
    const { findUniquePage: courseLesson } = await queryClient.fetchQuery(
      lessonOptions(lessonId),
    )
    return (
      <ClientOnly>
        <LearnProvider
          course={course as CourseType}
          courseLesson={courseLesson as PageV2}
        >
          <div className="flex h-screen w-screen flex-col overflow-hidden bg-neutral-100">
            <LayoutHeader />
            <div className="mt-[-1px] h-[.3125rem] w-full bg-neutral-300 sm:hidden">
              <CourseProgress />
            </div>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <React.Suspense fallback={<SuspenseFallback />}>
                <div className="relative flex-1">
                  <main className="scroll-wrap-y absolute top-0 left-0 h-full w-full bg-neutral-white">
                    {children}
                  </main>
                </div>
              </React.Suspense>
            </HydrationBoundary>
            <LayoutFooter />
          </div>
        </LearnProvider>
      </ClientOnly>
    )
  } catch (err) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.info(`学习页面出错: ${err}`)
    // return permanentRedirect(MenuLink.PRACTICES)
  }
}
