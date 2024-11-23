'use client'

import { switchEcosystem } from '@/actions/ecosystem'
import { Link, useRouter } from '@/app/navigation'
import { EcosystemCard } from '@/components/ecosystem/ecosystem-card'
import type { EcosystemInfoListPaginated } from '@/graphql/generated/graphql'
import { useAuthStore } from '@/store/auth'
import { useAuthenticated } from '@/store/user'
import { useQueryClient } from '@tanstack/react-query'
import * as React from 'react'

export function EcosystemGrid({
  ecosystemsPromise,
}: {
  ecosystemsPromise: Promise<EcosystemInfoListPaginated>
}) {
  const router = useRouter()
  const { setAuthModalOpen } = useAuthStore()
  const isAuthenticated = useAuthenticated()
  const queryClient = useQueryClient()
  const { data } = React.use(ecosystemsPromise)

  async function onSwitchEcosystem(ecosystemId: string) {
    if (!isAuthenticated) {
      setAuthModalOpen(true)
      return
    }
    await switchEcosystem(ecosystemId)
    await queryClient.invalidateQueries({
      queryKey: ['ListActiveEcosystemInfos'],
    })
    router.refresh()
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {data?.map(ecosystem => (
        <Link
          key={ecosystem.ecosystemId}
          href={isAuthenticated ? `/home/${ecosystem.ecosystemId}` : '#'}
          onClick={() => onSwitchEcosystem(ecosystem.ecosystemId)}
        >
          <EcosystemCard className="p-6" ecosystem={ecosystem} />
        </Link>
      ))}
    </div>
  )
}
