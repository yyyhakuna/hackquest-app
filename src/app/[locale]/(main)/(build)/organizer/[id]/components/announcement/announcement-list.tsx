'use client'
import {
  type HackathonAnnouncement,
  useListHackathonAnnouncementQuery,
} from '@/graphql/generated/hooks'
import dayjs from '@/lib/dayjs'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import BaseCard from './base-card'
import CreateCard from './create-announcement'
import CreateModal from './create-modal'

const AnnouncementList = () => {
  const params = useParams()
  const id = params.id as string
  const { data, refetch } = useSuspenseQuery({
    queryKey: useListHackathonAnnouncementQuery.getKey({
      id,
    }),
    queryFn: useListHackathonAnnouncementQuery.fetcher({ id }),
  })
  const d = data.listHackathonAnnouncement ?? []

  return (
    <div className='mt-4 flex flex-wrap gap-4'>
      <CreateCard refetch={refetch} />
      {d.map(obj => {
        const isExpire = dayjs().isAfter(new Date(obj.actualTime))

        return (
          <BaseCard
            key={obj.id}
            title={obj.title ?? ''}
            isCustomAnnouncement
            className=" w-[calc(25%-12px)]"
            CustomDialog={
              <CreateModal
                iniData={obj as HackathonAnnouncement}
                isExpired={isExpire}
                refetch={refetch}
              />
            }
            isExpire={isExpire}
            announcementId={obj.id}
            hackathonId={id}
          />
        )
      })}
    </div>
  )
}

export default AnnouncementList
