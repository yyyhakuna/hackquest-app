import {
  CoLearningStatus,
  useListCoLearningQuery,
} from '@/graphql/generated/hooks'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import DraftCard from './draft-card'

const DraftList = () => {
  const t = useTranslations('HackathonOrganizer')
  const { data } = useSuspenseQuery({
    queryKey: useListCoLearningQuery.getKey({
      where: {
        status: CoLearningStatus.Draft,
      },
    }),
    queryFn: useListCoLearningQuery.fetcher({
      where: {
        status: CoLearningStatus.Draft,
      },
    }),
    staleTime: 0,
  })

  const coLearnings = data.listCoLearning.data ?? []

  return (
    <div className="mt-6 space-y-6">
      {coLearnings.length ? (
        coLearnings?.map(obj => (
          <DraftCard
            key={obj.id}
            progress={obj.progress ?? []}
            name={obj.name ?? ''}
            id={obj.id}
          />
        ))
      ) : (
        <div className="body-l text-center text-primary-neutral">
          {t('draftNotHave')}
        </div>
      )}
    </div>
  )
}

export default DraftList
