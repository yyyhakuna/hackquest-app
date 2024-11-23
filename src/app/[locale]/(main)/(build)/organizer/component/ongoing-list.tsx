'use client'
import { useRouter } from '@/app/navigation'
import {
  type HackathonExtend,
  OrganizerHackathonStatus,
  useListHackathonsByOrganizerQuery,
} from '@/graphql/generated/hooks'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import HackathonCard from './hackathon-card'

const OngoingList = () => {
  const t = useTranslations('HackathonOrganizer')
  const _router = useRouter()
  const { data: h } = useSuspenseQuery({
    queryKey: useListHackathonsByOrganizerQuery.getKey({
      status: OrganizerHackathonStatus.Ongoing,
    }),
    queryFn: useListHackathonsByOrganizerQuery.fetcher({
      status: OrganizerHackathonStatus.Ongoing,
    }),
  })

  const hackathons = h?.listHackathonsByOrganizer.data

  return (
    <div className="mt-6 space-y-6">
      {hackathons?.length ? (
        hackathons?.map((hac, _index) => (
          <div key={hac.id} className="w-full">
            <HackathonCard hackathonInfo={hac as HackathonExtend} />
          </div>
        ))
      ) : (
        <div className="body-l text-center text-primary-neutral">
          {t('ongoingNotHave')}
        </div>
      )}
    </div>
  )
}

export default OngoingList
