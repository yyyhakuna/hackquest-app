import { HACKATHON_STATUS } from '@/app/[locale]/(main)/(build)/explore/constants/data'
import {
  type GetAllHackathonInfoQueryVariables,
  HackathonStatus,
  type HighlightProjectQueryVariables,
  useGetAllHackathonInfoQuery,
  useHighlightBuilderQuery,
  useHighlightProjectQuery,
} from '@/graphql/generated/hooks'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

const useHighExplore = () => {
  const hackathonHighlightTab: Array<{
    label: string
    value: string
  }> = []

  const queryParams: GetAllHackathonInfoQueryVariables = useMemo(() => {
    return {
      where: {
        status: { equals: HACKATHON_STATUS },
        priority: { gt: 0 },
      },
      status: HackathonStatus.Ongoing,
      page: -1,
    }
  }, [])

  const { data: allHackathonInfo } = useSuspenseQuery({
    queryKey: useGetAllHackathonInfoQuery.getKey(queryParams),
    queryFn: useGetAllHackathonInfoQuery.fetcher(queryParams),
  })

  if (allHackathonInfo?.listHackathons?.total) {
    hackathonHighlightTab.push({
      label: 'Hackathon Highlight',
      value: 'hackathon',
    })
  }

  const projectParams: HighlightProjectQueryVariables = useMemo(() => {
    return {
      where: { invalid: { equals: false } },
    }
  }, [])

  const { data: highlightProjectList } = useSuspenseQuery({
    queryKey: useHighlightProjectQuery.getKey(projectParams),
    queryFn: useHighlightProjectQuery.fetcher(projectParams),
  })

  if (highlightProjectList?.highlightProject?.length) {
    hackathonHighlightTab.push({
      label: 'Project Highlight',
      value: 'project',
    })
  }

  const { data: highlightBuilderList } = useSuspenseQuery({
    queryKey: useHighlightBuilderQuery.getKey(),
    queryFn: useHighlightBuilderQuery.fetcher(),
  })

  if (highlightBuilderList?.highlightBuilder?.length) {
    hackathonHighlightTab.push({
      label: 'Builder Highlight',
      value: 'builder',
    })
  }
  return {
    allHackathonInfo,
    highlightProjectList,
    highlightBuilderList,
    hackathonHighlightTab,
  }
}

export default useHighExplore
