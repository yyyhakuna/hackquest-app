import type {
  InputMaybe,
  JobStationWhereInput,
} from '@/graphql/generated/graphql'

export interface Job {
  id: string
  userId?: string
  name: string
  companyName: string
  companyLogo: string
  website?: string
  workMode: 'REMOTE' | 'ONSITE'
  location?: string | null
  workType: 'FULL_TIME' | 'PART_TIME' | 'INTERNSHIP'
  tags: string[]
  description?: any
  contact?: Record<string, string>
  minSalary: number
  maxSalary: number
  currency: string
  status?: 'open' | 'closed'
  createdAt: string
  updatedAt?: string
  favorites?: []
}

export type SearchParams = {
  page?: string
  keyword?: string
  workTypes?: string
  workModes?: string
  tags?: string
}

export interface JobStationQueryParamType {
  page?: number
  limit?: number
  where?: InputMaybe<JobStationWhereInput>
}
