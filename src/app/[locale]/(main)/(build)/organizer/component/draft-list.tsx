import {
  OrganizerHackathonStatus,
  useListHackathonsByOrganizerQuery,
} from '@/graphql/generated/hooks'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import OrganizerCard from './draft-card'

const DraftList = () => {
  const t = useTranslations('HackathonOrganizer')
  const { data: h } = useSuspenseQuery({
    queryKey: useListHackathonsByOrganizerQuery.getKey({
      status: OrganizerHackathonStatus.Draft,
    }),
    queryFn: useListHackathonsByOrganizerQuery.fetcher({
      status: OrganizerHackathonStatus.Draft,
    }),
  })

  const progresses: { progress: string[]; id: string; name: string }[] =
    h.listHackathonsByOrganizer.data?.map(obj => {
      return { progress: obj.progress ?? [], id: obj.id, name: obj.name }
    }) ?? []

  return (
    <div className="mt-6 space-y-6">
      {progresses.length ? (
        progresses?.map(obj => (
          <OrganizerCard
            key={obj.id}
            progress={obj.progress}
            name={obj.name}
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
