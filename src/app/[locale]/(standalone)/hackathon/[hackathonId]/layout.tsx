import ClientOnly from '@/components/common/client-only'
import { hackathonQueryOptions } from '@/hooks/hackathon/query-options'
import { getQueryClient } from '@/providers/root/query-client'
import { Spinner } from '@hackquest/ui/shared/spinner'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import * as React from 'react'
import { LayoutHeader } from './components/layout-header'

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
  params: { hackathonId: string }
  children: React.ReactNode
}>) {
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(hackathonQueryOptions(params.hackathonId))

  return (
    <ClientOnly>
      <div className="flex min-h-screen w-screen flex-col overflow-hidden bg-neutral-100">
        <LayoutHeader />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <React.Suspense fallback={<SuspenseFallback />}>
            <div className="relative flex-1 overflow-y-auto scroll-smooth">
              <main className="mx-auto w-full max-w-[51.5rem] pt-8 pb-16">
                {children}
              </main>
            </div>
          </React.Suspense>
        </HydrationBoundary>
      </div>
    </ClientOnly>
  )
}
