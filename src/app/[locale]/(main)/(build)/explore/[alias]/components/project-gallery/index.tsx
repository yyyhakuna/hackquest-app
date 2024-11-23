import { Pagination } from '@/components/common/pagination'
import {
  type HackathonExtend,
  HackathonJoinState,
  type HackathonRewardsExtend,
  type ProjectExtend,
  useFindHackathonRewardQuery,
  useFindTracksQuery,
  useHackathonListProjectsQuery,
} from '@/graphql/generated/hooks'
import type React from 'react'
import { useCallback, useState } from 'react'
import { PAGE_LIMIT, projectSorts } from '../../constants/data'
import NoData from './no-data'
import PrizeTrack from './prize-track'
import Projects from './projects'
import ProjectsSkeleton from './projects-skeleton'
import Search from './search'

interface ProjectGalleryProp {
  hackathon: HackathonExtend
}

const ProjectGallery: React.FC<ProjectGalleryProp> = ({ hackathon }) => {
  const currentStatus = hackathon.currentStatus
  const isAfterSubmit = [
    HackathonJoinState.Voting,
    HackathonJoinState.VotingClose,
  ].some(v => currentStatus?.includes(v))
  const hackathonPrizeTrack =
    hackathon?.judge?.map(v => ({
      label: v.rewardName,
      value: v.id,
    })) || []
  const prizeTracks = [
    {
      label: 'All',
      value: 'all',
    },
    ...hackathonPrizeTrack,
  ]

  const defaultParams = {
    page: 1,
    limit: PAGE_LIMIT,
    winner: false,
    sort: projectSorts[0]?.value,
    prizeTrack: 'All',
    rewardId: 'all',
    track: '',
  }

  const [params, setParams] = useState(defaultParams)

  const parseParams = useCallback(() => {
    return {
      page: params.page,
      limit: params.limit,
      where: {
        invalid: {
          equals: false,
        },
        hackathonId: {
          equals: hackathon.id,
        },
        ...(params.prizeTrack !== 'All'
          ? {
              prizeTrack: {
                contains: params.prizeTrack,
              },
            }
          : {}),
        ...(params.track
          ? {
              tracks: {
                has: params.track,
              },
            }
          : {}),
      },
      orderBy: [
        {
          createdAt: params.sort,
        },
      ],
    }
  }, [params, hackathon.id])

  const { data, isLoading } = useHackathonListProjectsQuery(
    parseParams() as any,
  )

  const { data: rewards } = useFindHackathonRewardQuery(
    {
      hackathonId: hackathon?.id,
    },
    {
      select: data => data?.findHackathonReward || [],
    },
  )

  const { data: tracks } = useFindTracksQuery(
    {},
    {
      select: (data: any) => {
        return (
          data.tracks?.map((v: string) => ({
            label: v,
            value: v,
          })) || []
        )
      },
    },
  )
  const clear = () => {
    setParams(defaultParams)
  }
  return (
    <div>
      {isAfterSubmit && (
        <div className="mb-8 flex flex-col gap-6">
          {rewards?.map((v, i) => (
            <PrizeTrack key={i} reward={v as HackathonRewardsExtend} />
          ))}
        </div>
      )}
      <div>
        {isAfterSubmit && (
          <p className="title-3 mb-4 text-neutral-800 sm:mb-6">All Project</p>
        )}
        <div>
          <Search
            tracks={
              (tracks || []) as {
                label: string
                value: any
              }[]
            }
            prizeTracks={prizeTracks}
            params={params}
            changeParams={info => {
              setParams({
                ...params,
                ...info,
                page: 1,
              })
            }}
            clear={clear}
          />
          {isLoading ? (
            <ProjectsSkeleton />
          ) : data?.listProjects?.data?.length! > 0 ? (
            <>
              <Projects
                projects={data?.listProjects?.data as ProjectExtend[]}
              />
              <div className="mt-4">
                <Pagination
                  total={data?.listProjects?.total || 0}
                  page={params.page}
                  limit={PAGE_LIMIT}
                  onPageChange={page => {
                    setParams({
                      ...params,
                      page,
                    })
                  }}
                />
              </div>
            </>
          ) : (
            <NoData />
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectGallery
