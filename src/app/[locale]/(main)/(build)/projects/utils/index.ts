import {
  ProjectType,
  SortOrder,
  useHighlightBuilderQuery,
  useHighlightProjectQuery,
} from '@/graphql/generated/hooks'
import { useSuspenseQuery } from '@tanstack/react-query'

export const parseProjectWhere = (params: Record<string, any>) => {
  const where = {
    type: {
      equals: ProjectType.Main,
    },
    invalid: {
      equals: false,
    },
  }
  if (params?.sector && params.sector !== 'default') {
    Object.assign(where, {
      tracks: {
        hasSome: [params.sector],
      },
    })
  }
  if (params?.stack && params.stack !== 'default') {
    Object.assign(where, {
      teachStack: {
        hasSome: [params.stack],
      },
    })
  }
  return where
}

const parseOrder = (params: Record<string, any>) => {
  const res = []
  if (params.sort === 'newest') {
    res.push({
      createdAt: SortOrder.Desc,
    })
  }
  if (params.sort === 'popular') {
    res.push({
      likes: SortOrder.Desc,
    })
  }
  return res
}

export const parseParams = (params: Record<string, any>) => {
  const where = params.showby === 'By Project' ? parseProjectWhere(params) : {}
  const orderBy = parseOrder(params)
  return {
    page: Number(params.page) || 1,
    limit: 6,
    where,
    orderBy,
  }
}

export const getProjectType = (winner: any[] | undefined) => {
  let largestPlace = 4
  if (winner && winner?.length > 0) {
    largestPlace = Math.max(...winner.map(item => item.place ?? 4))
  }
  switch (largestPlace) {
    case 1:
      return 'primaryChampion'
    case 2:
      return 'blueChampion'
    case 3:
      return 'brownChampion'
    default:
      return 'none'
  }
}

export type TabObj = {
  label: 'builderHighlight' | 'projectHighlight'
  value: string
}

export const useHighlightConfig = () => {
  const { data: highlightProjectList } = useSuspenseQuery({
    queryKey: useHighlightProjectQuery.getKey({
      where: {
        invalid: {
          equals: false,
        },
      },
    }),
    queryFn: useHighlightProjectQuery.fetcher({
      where: {
        invalid: {
          equals: false,
        },
      },
    }),
  })
  const highlightProject = highlightProjectList.highlightProject

  const { data: highlightBuilderList } = useSuspenseQuery({
    queryKey: useHighlightBuilderQuery.getKey(),
    queryFn: useHighlightBuilderQuery.fetcher(),
  })
  const highlightBuilder = highlightBuilderList.highlightBuilder

  const highlightConfig: TabObj[] = []
  if (highlightProject?.length !== 0) {
    highlightConfig.push({
      label: 'projectHighlight',
      value: 'project',
    })
  }
  if (highlightBuilder.length !== 0) {
    highlightConfig.push({
      label: 'builderHighlight',
      value: 'builder',
    })
  }

  return { highlightConfig, highlightProject, highlightBuilder }
}
