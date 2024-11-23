import { projectQueryOptions } from '@/hooks/project/query-options'
import { getQueryClient } from '@/providers/root/query-client'
import { Spinner } from '@hackquest/ui/shared/spinner'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import type { Metadata } from 'next'
import * as React from 'react'

function SuspenseFallback() {
  return (
    <div className="flex h-full items-center justify-center">
      <Spinner />
    </div>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { projectId: string }
}): Promise<Metadata> {
  const queryClient = getQueryClient()
  const { findUniqueProject: project } = await queryClient.fetchQuery(
    projectQueryOptions(params.projectId),
  )
  return {
    title: `${project?.name}`,
    description: project?.detail?.oneLineIntro,
  }
}

export default function ProjectLayout({
  params,
  children,
}: {
  params: { projectId: string }
  children: React.ReactNode
}) {
  const { projectId } = params

  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(projectQueryOptions(projectId))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <React.Suspense fallback={<SuspenseFallback />}>
        {children}
      </React.Suspense>
    </HydrationBoundary>
  )
}
