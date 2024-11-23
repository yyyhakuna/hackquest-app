'use client'
import {
  useSuspenseQuery,
} from '@tanstack/react-query'
import { findHackathonJudgeDetailByUser } from './query-options'

export function useHackathonJudgeDetailByUserQuery() {
  return useSuspenseQuery(findHackathonJudgeDetailByUser())
}
