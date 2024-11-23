'use client'
import {
  GrowthFilter,
  useFindDistributionGrouthQuery,
  useFindDistributionQuery,
  useListOrganizerDistributionUtmSourcesQuery,
} from '@/graphql/generated/hooks'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { DistributionTab } from '../../constant'
import { parseGrowthType } from '../../utils'
import Sources from './Sources'
import DistributionTabs from './distribution-tabs'
import { GrowthEchartline, SourceEchartBar, SourceEchartPie } from './echarts'

const Distribution = ({ id }: { id: string }) => {
  const query = useSearchParams()
  const type = query.get('type')
  const _filter = query.get('filter')
  const { data, refetch } = useSuspenseQuery({
    queryKey: useListOrganizerDistributionUtmSourcesQuery.getKey({
      where: {
        hackathonId: { equals: id },
      },
    }),
    queryFn: useListOrganizerDistributionUtmSourcesQuery.fetcher({
      where: {
        hackathonId: { equals: id },
      },
    }),
    staleTime: 0,
  })

  const { data: d } = useSuspenseQuery({
    queryKey: useFindDistributionGrouthQuery.getKey({
      id,
      growthFilter: GrowthFilter.All,
      growthType: parseGrowthType(type ?? ''),
    }),
    queryFn: useFindDistributionGrouthQuery.fetcher({
      id,
      growthFilter: GrowthFilter.All,
      growthType: parseGrowthType(type ?? ''),
    }),
    staleTime: 0,
  })

  const { data: p } = useSuspenseQuery({
    queryKey: useFindDistributionQuery.getKey({
      id,
    }),
    queryFn: useFindDistributionQuery.fetcher({
      id,
    }),
    staleTime: 0,
  })

  const pieEchartData = p.findDistribution
  const sources = data.listOrganizerDistributionUTMSources ?? []

  return (
    <div className='mt-8 space-y-10'>
      <Sources utmSources={sources} refetch={refetch} />
      <div className="space-y-4">
        <span className="title-3 text-primary-neutral">Distribution</span>
        <DistributionTabs />
        <GrowthEchartline
          data={d?.findDistributionGrouth ?? []}
          curTab={DistributionTab.PAGE_VIEW}
        />
      </div>
      <div className="space-y-4">
        <span className="title-3 text-primary-neutral">Distribution</span>
        <div className="flex gap-6">
          <SourceEchartPie data={pieEchartData?.pageView ?? []} />
          <SourceEchartPie data={pieEchartData?.registration ?? []} />
          <SourceEchartBar data={pieEchartData?.submission ?? []} />
          <SourceEchartBar data={pieEchartData?.winner ?? []} />
        </div>
      </div>
    </div>
  )
}

export default Distribution
