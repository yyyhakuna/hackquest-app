import {
  type HackathonExtend,
  useFindUniqueHackathonQuery,
} from '@/graphql/generated/hooks'
import { useQuery, } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useOrganizerStore } from './store'

export const useHackathonInfo = (id: string) => {
  const { setHackathon } = useOrganizerStore()
  const { data } = useQuery({
    queryKey: useFindUniqueHackathonQuery.getKey({
      where: { id: id },
    }),
    queryFn: useFindUniqueHackathonQuery.fetcher({
      where: { id: id },
    }),
  })
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!data?.findUniqueHackathon) return
    setHackathon(data?.findUniqueHackathon as HackathonExtend)
  }, [data])

  return data?.findUniqueHackathon as HackathonExtend
}
