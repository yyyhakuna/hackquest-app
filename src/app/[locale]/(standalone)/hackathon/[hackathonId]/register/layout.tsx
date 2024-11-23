import { hackathonRegisterInfoQueryOptions } from '@/hooks/hackathon/query-options'
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
  title: 'Hackathon Registration',
}

export default function Layout({
  params,
  children,
}: Readonly<{
  params: { hackathonId: string }
  children: React.ReactNode
}>) {
  const { hackathonId } = params
  const queryClient = getQueryClient()

  queryClient.prefetchQuery(hackathonRegisterInfoQueryOptions(hackathonId))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <React.Suspense fallback={<SuspenseFallback />}>
        {children}
      </React.Suspense>
    </HydrationBoundary>
  )
}
