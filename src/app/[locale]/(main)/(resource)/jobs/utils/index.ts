import type { Job } from '@/service/jobs/types'
import { revalidateTag } from 'next/cache'
import { workModes } from '../validations'

export const LIMIT_PER_PAGE = 10

export type SearchParams = {
  page?: string
  keyword?: string
  workTypes?: string
  workModes?: string
  tags?: string
}

export function generateQueryParams(query?: SearchParams) {
  const offsetInt = Number.parseInt(query?.page ?? '1')
  const page = Number.isNaN(offsetInt) ? 1 : offsetInt
  const keyword = query?.keyword

  const workTypes = Array.isArray(query?.workTypes)
    ? query?.workTypes?.join(',')
    : query?.workTypes
  const workModes = Array.isArray(query?.workModes)
    ? query?.workModes?.join(',')
    : query?.workModes

  const tags = Array.isArray(query?.tags) ? query?.tags?.join(',') : query?.tags

  return {
    page,
    keyword,
    workTypes,
    workModes,
    tags,
    limit: LIMIT_PER_PAGE,
  }
}

export function formatLocation(job: Job) {
  const mode = workModes.find(w => w.id === job.workMode)

  if (mode?.id === 'ONSITE') {
    return job.location
  } else if (mode?.id === 'REMOTE') {
    return 'Remote'
  } else {
    return 'N/A'
  }
}

function formatWithSuffix(
  num: number,
  divisor: number,
  suffix: string,
): string {
  const result = num / divisor
  return result % 1 === 0
    ? `${result}${suffix}`
    : `${result.toFixed(1)}${suffix}`
}

export function formatNumber(num?: number): string {
  if (!num) return ''
  if (num >= 1_000_000_000) {
    return formatWithSuffix(num, 1_000_000_000, 'B')
  } else if (num >= 1_000_000) {
    return formatWithSuffix(num, 1_000_000, 'M')
  } else if (num >= 1_000) {
    return formatWithSuffix(num, 1_000, 'K')
  } else {
    return num.toString()
  }
}

export function formatSalary(job: Job) {
  const min = formatNumber(job?.minSalary)?.replace(/[KMB]$/, '')
  const max = formatNumber(job?.maxSalary)

  return `${min} - ${max} ${job?.currency ?? ''}`
}

export async function revalidate() {
  revalidateTag('jobs')
  revalidateTag('published-jobs')
}

export const parseWhere = (params: Record<string, any>) => {
  const where = {}
  const types = ['FULL_TIME', 'PART_TIME', 'INTERNSHIP']
  const modes = ['ONSITE', 'REMOTE']

  if (params?.workTypes) {
    let arr: string[] = []
    if (Array.isArray(params.workTypes)) {
      arr = params.workTypes.filter(v => types.includes(v))
    } else {
      if (types.includes(params.workTypes)) {
        arr.push(params.workTypes)
      }
    }
    Object.assign(where, {
      workType: {
        in: arr,
      },
    })
  }
  if (params?.workModes) {
    let arr: string[] = []
    if (Array.isArray(params.workModes)) {
      arr = params?.workModes.filter(v => modes.includes(v))
    } else {
      if (modes.includes(params.workModes)) {
        arr.push(params.workModes)
      }
    }
    Object.assign(where, {
      workMode: {
        in: arr,
      },
    })
  }
  if (params?.workModes) {
    let arr: string[] = []
    if (Array.isArray(params.workModes)) {
      arr = params?.workModes.filter(v => modes.includes(v))
    } else {
      if (modes.includes(params.workModes)) {
        arr.push(params.workModes)
      }
    }
    Object.assign(where, {
      workMode: {
        in: arr,
      },
    })
  }
  if (params?.tags) {
    let arr: string[] = []
    if (Array.isArray(params.tags)) {
      arr = params.tags
    } else {
      arr.push(params.tags)
    }
    Object.assign(where, {
      tags: {
        hasSome: arr,
      },
    })
  }
  return where
}

export const parseParams = (params: Record<string, any>) => {
  const where = parseWhere(params)

  return {
    page: Number(params.page) || 1,
    limit: 12,
    where,
    // orderBy: parseOrder(params.orderby),
  }
}
