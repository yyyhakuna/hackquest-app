'use client'

import {
  type CourseExtend,
  PageType,
  type PageV2,
} from '@/graphql/generated/hooks'
import { useLearnStore } from '@/providers/learn/learn-provider'
import {
  courseOptions,
  lessonOptions,
} from '@/providers/learn/utils/query-options'
import { getQueryClient } from '@/providers/root/query-client'
import { createStore } from 'zustand'

const queryClient = getQueryClient()
export type CourseType = Pick<
  CourseExtend,
  'units' | 'currentPageId' | 'nextPageId'
>
export type LearnStoreType = {
  course: CourseType
  courseLesson: PageV2
  pageType?: PageType
  loading: boolean
  setLoading: (loading: boolean) => void
}

export const createLearnStore = ({
  course,
  courseLesson,
  pageType = PageType.Default,
}: {
  course: CourseType
  courseLesson: PageV2
  pageType?: PageType
}) =>
  createStore<LearnStoreType>(set => ({
    course,
    courseLesson,
    pageType,
    loading: false,
    setLoading: loading => {
      set(() => ({
        loading: loading,
      }))
    },
  }))

export const useCourse = () => useLearnStore(state => state.course)
export const useCourseLesson = () => useLearnStore(state => state.courseLesson)
export const usePageType = () => useLearnStore(state => state.pageType)

export const useCourseLoading = () => useLearnStore(state => state.loading)
export const setCourseLoading = () => useLearnStore(state => state.setLoading)

export const useGetCourse = async (courseId: string) => {
  return queryClient.fetchQuery(courseOptions(courseId))
}

export const useGetLesson = async (lessonId: string) => {
  return queryClient.fetchQuery(lessonOptions(lessonId))
}
