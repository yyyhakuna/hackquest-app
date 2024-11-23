import {
  type FixedVote,
  type ProjectInfo,
  QueryMode,
  type ScoreVote,
  useListOrganizerJudgeProjectQuery,
} from '@/graphql/generated/hooks'
import { cn } from '@hackquest/ui/lib/utils'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams, useSearchParams } from 'next/navigation'
import type { Dispatch, SetStateAction } from 'react'
import { IoCheckmarkOutline } from 'react-icons/io5'

const OtherWinnerCard = ({
  defaultTrack,
  searchWords,
  setSelected,
  selected,
}: {
  defaultTrack: string
  searchWords: string
  setSelected: Dispatch<SetStateAction<ProjectInfo | undefined>>
  selected: ProjectInfo | undefined
}) => {
  const id = useParams().id as string
  const track = useSearchParams().get('track')

  const { data: li } = useSuspenseQuery({
    queryKey: useListOrganizerJudgeProjectQuery.getKey({
      where: {
        hackathonId: {
          equals: id,
        },
        prizeTrack: {
          contains: track || defaultTrack,
          mode: QueryMode.Insensitive,
        },
        name: {
          contains: searchWords,
          mode: QueryMode.Insensitive,
        },
      },
    }),
    queryFn: useListOrganizerJudgeProjectQuery.fetcher({
      where: {
        hackathonId: {
          equals: id,
        },
        prizeTrack: {
          contains: track || defaultTrack,
          mode: QueryMode.Insensitive,
        },
        name: {
          contains: searchWords,
          mode: QueryMode.Insensitive,
        },
      },
    }),
  })

  const hackathonWinner = li.listOrganizerJudgeProject?.projects

  return (
    <div
      className={cn(
        'absolute z-50 mt-[11px] ml-[22%] max-h-[730px] w-[73%] overflow-auto rounded-lg bg-neutral-white py-3 shadow-card',
        !searchWords && 'hidden',
      )}
    >
      {hackathonWinner?.length ? (
        hackathonWinner?.map(data => {
          const isSelected = data.id === selected?.id
          const getVotes = () => {
            if (data.fixOrSocreVote?.__typename === 'FixedVote') {
              return (data.fixOrSocreVote as FixedVote).totalVotes
            }
            if (data.fixOrSocreVote?.__typename === 'ScoreVote') {
              return (data.fixOrSocreVote as ScoreVote).finalScore
            }
          }
          const leader =
            data?.team?.members?.find(obj => obj.memberType === 'Leader')
              ?.nickname ?? ''
          return (
            <div
              key={data.id}
              className={cn(
                'flex cursor-pointer items-center justify-between rounded-xl p-3 transition-colors duration-300 ',
                isSelected && 'bg-neutral-100',
              )}
              onClick={() => {
                setSelected(data as ProjectInfo)
              }}
            >
              <div className="flex items-center gap-3">
                <img
                  src={data?.logo ?? ''}
                  alt=""
                  className="h-6 w-6 rounded-[4px]"
                />
                <div className="title-3 truncate text-primary-neutral">
                  {data?.name}
                </div>
                <div className='flex items-center gap-5'>
                  <span className="body-m text-secondary-neutral">
                    {leader}
                  </span>
                  <span className="body-m text-secondary-neutral">|</span>
                  <span className="body-m text-secondary-neutral">
                    Rank {data?.fixOrSocreVote?.rank}
                  </span>
                  <span className="body-m text-secondary-neutral">|</span>
                  <span className="body-m text-secondary-neutral">
                    Votes {getVotes()}
                  </span>
                </div>
              </div>
              <IoCheckmarkOutline className={cn(!isSelected && 'hidden')} />
            </div>
          )
        })
      ) : (
        <div className="p-3">no result</div>
      )}
    </div>
  )
}

export default OtherWinnerCard
