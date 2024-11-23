'use client'

import { applicationField } from '@/components/hackathon-registration'
import type { ApplicationField } from '@/components/hackathon-registration/type'
import {
  type HackathonExtend,
  HackathonJoinState,
} from '@/graphql/generated/graphql'
import {
  useListEcosystemsQuery,
  useListValidateProjectsQuery,
} from '@/graphql/generated/hooks'
import dayjs from '@/lib/dayjs'
import { getZodKeys } from '@/lib/utils'
import {
  type UseQueryOptions,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { get, has } from 'lodash-es'
import { useParams } from 'next/navigation'
import * as React from 'react'
import * as z from 'zod'
import {
  hackathonPrizeTracksOptions,
  hackathonQueryOptions,
  hackathonRegisterInfoQueryOptions,
} from './query-options'

export function useHackathonId() {
  const params = useParams()
  return params.hackathonId as string
}

export function useHackathonQuery() {
  const hackathonId = useHackathonId()
  return useSuspenseQuery(hackathonQueryOptions(hackathonId))
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

export async function getTimezone() {
  const response = await fetch('http://ip-api.com/json')
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

export function useHackathonPrizeTracksQuery() {
  const hackathonId = useHackathonId()
  return useSuspenseQuery(hackathonPrizeTracksOptions(hackathonId))
}

export function useValidateProjectQuery() {
  const hackathonId = useHackathonId()
  return useQuery({
    queryKey: useListValidateProjectsQuery.getKey({ hackathonId }),
    queryFn: useListValidateProjectsQuery.fetcher({ hackathonId }),
    staleTime: Number.POSITIVE_INFINITY,
    select: data => data.projects,
  })
}

export function useHackathonRegisterInfoQuery() {
  const hackathonId = useHackathonId()
  return useSuspenseQuery(hackathonRegisterInfoQueryOptions(hackathonId))
}

export function useFormSchema<T extends ApplicationField>(fields: T[]) {
  const formSchema = React.useMemo(() => {
    let schema = {}

    fields?.forEach(field => {
      const fullField = applicationField[field.type]

      if (fullField) {
        const mergedField = { ...fullField, ...field }
        const validateSchema = fullField.getValidator(mergedField)
        schema = { ...schema, ...validateSchema }
      } else {
        const validator = z.string().min(field.optional ? 0 : 1)
        schema = {
          ...schema,
          [field.id]: field.optional ? validator.optional() : validator,
        }
      }
    })

    return z.object(schema)
  }, [fields])

  return formSchema
}

export function useDefaultValues<T extends z.ZodTypeAny>(
  schema: T,
  initialValues?: Record<string, any>,
) {
  const schemaKeys = getZodKeys(schema)

  const defaultValues = schemaKeys.reduce(
    (acc, field) => {
      if (has(initialValues, field)) {
        const value = get(initialValues, field, '')
        acc[field] = value ?? ''
      } else {
        acc[field] = ''
      }
      return acc
    },
    {} as Record<string, string>,
  )

  return defaultValues
}

export function useHackathonState() {
  function getTotalPrize(hackathon: HackathonExtend) {
    const total = hackathon?.rewards?.reduce((pre, next) => {
      return pre + Number(next.totalRewards)
    }, 0)
    return total || 0
  }

  function getDeadline(hackathon: HackathonExtend) {
    const status = hackathon.currentStatus?.find(status =>
      [
        HackathonJoinState.Register,
        HackathonJoinState.Submit,
        HackathonJoinState.Voting,
      ].includes(status),
    )

    switch (status) {
      case HackathonJoinState.Register:
        return {
          schedule: 'Registration',
          timeDiff: dayjs(hackathon?.timeline?.registrationClose).diff(
            dayjs(),
            'day',
          ),
        }
      case HackathonJoinState.Submit:
        return {
          schedule: 'Submission',
          timeDiff: dayjs(hackathon?.timeline?.submissionClose).diff(
            dayjs(),
            'day',
          ),
        }
      case HackathonJoinState.Voting:
        return {
          schedule: 'Voting',
          timeDiff: dayjs(hackathon?.timeline?.rewardTime).diff(dayjs(), 'day'),
        }

      default:
        return {
          schedule: 'Ended',
          timeDiff: 0,
        }
    }
  }

  return { getTotalPrize, getDeadline }
}
