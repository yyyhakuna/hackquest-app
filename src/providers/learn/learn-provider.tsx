'use client'

import { useRouter } from '@/app/navigation'
import type { PageV2 } from '@/graphql/generated/hooks'
import {
  type CourseType,
  type LearnStoreType,
  createLearnStore,
} from '@/store/learn'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import * as React from 'react'
import { useEffect } from 'react'
import { type StoreApi, useStore } from 'zustand'
import { lessonOptions } from './utils/query-options'

export const LearnContext =
  React.createContext<StoreApi<LearnStoreType> | null>(null)

export function LearnProvider({
  children,
  course,
  courseLesson,
}: Readonly<{
  children: React.ReactNode
  course: CourseType
  courseLesson: PageV2
}>) {
  const { alias } = useParams()
  const router = useRouter()
  const storeRef = React.useRef<StoreApi<LearnStoreType> | null>(null)
  storeRef.current = createLearnStore({ course, courseLesson })
  const { data } = useQuery(lessonOptions(course.nextPageId as string))
  useEffect(() => {
    router.prefetch(`/learn/${alias}/${course.nextPageId}`)
  }, [course, router, alias])
  return (
    <LearnContext.Provider value={storeRef.current}>
      {children}
    </LearnContext.Provider>
  )
}

export function useLearnStore<T>(selector: (state: LearnStoreType) => T) {
  const store = React.useContext(LearnContext)
  if (!store) {
    throw new Error('LearnProvider is missing')
  }
  return useStore(store, selector)
}
