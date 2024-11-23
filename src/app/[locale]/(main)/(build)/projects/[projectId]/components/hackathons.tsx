'use client'

import { Pagination } from '@/components/common/pagination'
import type { HackathonExtend } from '@/graphql/generated/graphql'
import { useListHackathonsQuery } from '@/graphql/generated/hooks'
import { useProjectQuery } from '@/hooks/project/query'
import * as React from 'react'
import { ExploreHackathon } from './explore-hackathon'
import { HackathonCard } from './hackathon-card'

export function Hackathons({
  title,
  editable,
}: {
  title: string
  editable: boolean
}) {
  const [page, setPage] = React.useState(1)
  const { data: project } = useProjectQuery()

  const { data } = useListHackathonsQuery(
    {
      projectId: project?.id,
      limit: 4,
      page,
    },
    {
      enabled: !!project?.id,
      staleTime: Number.POSITIVE_INFINITY,
      select: data => data.listHackathons,
    },
  )

  return (
    <div className="space-y-6 sm:container max-sm:px-6">
      <h2 className="title-3">{title}</h2>
      <section className="grid gap-6">
        {data?.data?.map(hackathon => (
          <HackathonCard
            key={hackathon.id}
            hackathon={hackathon as HackathonExtend}
            editable={editable}
          />
        ))}
        {(data?.total ?? 0) < 4 ? (
          <ExploreHackathon />
        ) : (
          <Pagination
            total={data?.total}
            page={page}
            limit={4}
            onPageChange={setPage}
          />
        )}
      </section>
    </div>
  )
}
