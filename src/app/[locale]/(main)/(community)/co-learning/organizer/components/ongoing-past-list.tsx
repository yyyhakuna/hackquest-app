'use client'
import { useRouter } from '@/app/navigation'
import {
  type CoLearning,
  CoLearningStatus,
  useListCoLearningQuery,
} from '@/graphql/generated/hooks'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import CoLearningCard from './co-leaning-card'

const OngoingPastList = () => {
  const _router = useRouter()
  const tab = useSearchParams().get('tab')
  const status =
    tab === 'Past Hackathon' ? CoLearningStatus.Past : CoLearningStatus.OnGoing
  const { data } = useSuspenseQuery({
    queryKey: useListCoLearningQuery.getKey({
      where: {
        status,
      },
    }),
    queryFn: useListCoLearningQuery.fetcher({
      where: {
        status,
      },
    }),
  })

  const coLearnings = data.listCoLearning.data

  return (
    <div className="mt-6 space-y-6">
      {coLearnings?.length ? (
        coLearnings.map(coLearning => (
          <div key={coLearning.id} className="w-full">
            <CoLearningCard coLearning={coLearning as CoLearning} />
          </div>
        ))
      ) : (
        <div className="body-l text-center text-primary-neutral">not found</div>
      )}
    </div>
  )
}

export default OngoingPastList
