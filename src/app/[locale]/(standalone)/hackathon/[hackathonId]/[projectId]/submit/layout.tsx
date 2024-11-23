import { hackathonPrizeTracksOptions } from '@/hooks/hackathon/query-options'
import { getQueryClient } from '@/providers/root/query-client'
import { Spinner } from '@hackquest/ui/shared/spinner'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import type { Metadata } from 'next'
import * as React from 'react'

function SuspenseFallback() {
  return (
    <div className="flex h-96 items-center justify-center">
      <Spinner />
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Project Submission',
}

export default function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: {
    hackathonId: string
    projectId: string
  }
}>) {
  const { hackathonId } = params

  const queryClient = getQueryClient()

  queryClient.prefetchQuery(hackathonPrizeTracksOptions(hackathonId))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <React.Suspense fallback={<SuspenseFallback />}>
        {children}
      </React.Suspense>
    </HydrationBoundary>
  )
}
