import { execute } from '@/graphql/generated/execute'
import {
  CreateJobFavoriteDocument,
  DeleteJobFavoriteDocument,
  FindUniqueJobStationDocument,
  ListJobStationsDocument,
} from '@/graphql/generated/graphql'
import { queryOptions } from '@tanstack/react-query'
import type { JobStationQueryParamType, } from './types'

export const jobsQueryOptions = (params: JobStationQueryParamType) => {
  return queryOptions({
    queryKey: ['jobs-get'],
    queryFn: async () => execute(ListJobStationsDocument, params),
  })
}

export const jobDetailQueryOptions = (id?: string) => {
  const param = { where: { id } }
  return queryOptions({
    queryKey: ['job-get'],
    queryFn: async () => execute(FindUniqueJobStationDocument, param),
  })
}

export const favoriteJob = (userId: string, jobId: string) => {
  const param = {
    data: {
      userId: userId,
      job: {
        connect: {
          id: jobId,
        },
      },
    },
  }
  return queryOptions({
    queryKey: ['job-get'],
    queryFn: async () => execute(CreateJobFavoriteDocument, param),
  })
}

export const unFavoriteJob = (userId: string, jobId: string) => {
  const param = {
    where: {
      userId: {
        equals: userId,
      },
      jobId: {
        equals: jobId,
      },
    },
  }
  return queryOptions({
    queryKey: ['job-get'],
    queryFn: async () => execute(DeleteJobFavoriteDocument, param),
  })
}
