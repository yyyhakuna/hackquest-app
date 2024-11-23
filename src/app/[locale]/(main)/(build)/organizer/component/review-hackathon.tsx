import {
  type HackathonExtend,
  OrganizerHackathonStatus,
  useListHackathonsByOrganizerQuery,
} from '@/graphql/generated/hooks'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import HackathonCard from './hackathon-card'

const ReviewHackathons = () => {
  const _t = useTranslations('HackathonOrganizer')
  const { data: h } = useSuspenseQuery({
    queryKey: useListHackathonsByOrganizerQuery.getKey({
      status: OrganizerHackathonStatus.Review,
    }),
    queryFn: useListHackathonsByOrganizerQuery.fetcher({
      status: OrganizerHackathonStatus.Review,
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
          You don’t have any hackathon in review
        </div>
      )}
    </div>
  )
}

export default ReviewHackathons
