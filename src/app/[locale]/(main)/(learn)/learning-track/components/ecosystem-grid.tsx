'use client'

import { Link } from '@/app/navigation'
import { EcosystemCard } from '@/components/ecosystem/ecosystem-card'
import type { EcosystemInfoListPaginated } from '@/graphql/generated/graphql'
import * as React from 'react'

export default function EcosystemGrid({
  ecosystemsPromise,
}: {
  ecosystemsPromise: Promise<EcosystemInfoListPaginated>
}) {
  const { data } = React.use(ecosystemsPromise)

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {!data?.length ? (
        <p className="col-span-full mt-8 text-center text-secondary-neutral">
          No ecosystems found.
        </p>
      ) : (
        data.map(ecosystem => (
          <Link
            key={ecosystem.ecosystemId}
            href={`/learning-track/${ecosystem.ecosystemId}`}
          >
            <EcosystemCard ecosystem={ecosystem} />
          </Link>
        ))
      )}
    </div>
  )
}
