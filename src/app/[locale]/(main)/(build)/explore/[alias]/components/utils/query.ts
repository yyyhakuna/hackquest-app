'use client'

import { useListEcosystemsQuery } from '@/graphql/generated/hooks'
import {
  type UseQueryOptions,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { hackathonQueryOptions } from './query-options'

export function useHackathonAlias() {
  const params = useParams()
  return params.alias as string
}

export function useHackathonQuery() {
  const alias = useHackathonAlias()
  return useSuspenseQuery(hackathonQueryOptions(alias))
}

export function useEcosystemsQuery() {
  return useListEcosystemsQuery(
    {},
    {
      staleTime: Number.POSITIVE_INFINITY,
      select: data =>
        data.listEcosystems?.data?.map(item => ({
          value: item.type as string,
          label: item.type as string,
        })),
    },
  )
}

async function fetcher(url: string) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 8000)
  const response = await fetch(url, {
    signal: controller.signal,
  })
  clearTimeout(timer)
  return response
}

export async function getTimezone() {
  const response = await fetcher('https://worldtimeapi.org/api/ip')
  if (!response.ok) {
    throw new Error('Failed to fetch timezone')
  }

  const json: Record<string, any> = await response.json()
  const data = json || {}
  return data
}

export function useTimezone(
  options?: Omit<
    UseQueryOptions<Record<string, any>, Error>,
    'queryKey' | 'queryFn' | 'select' | 'staleTime'
  >,
) {
  return useQuery({
    queryKey: ['timezone'],
    queryFn: getTimezone,
    staleTime: Number.POSITIVE_INFINITY,
    select: data => data?.timezone,
    ...options,
  })
}
