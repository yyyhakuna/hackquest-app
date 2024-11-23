'use client'
import { Link } from '@/app/navigation'
import { Pagination } from '@/components/common/pagination'
import HackathonCard from '@/components/hackathon/hackathon-card'
import { ProjectCard } from '@/components/hackathon/project-card'
import MenuLink from '@/constants/menu-link'
import {
  type ProjectExtend,
  useGetAllHackathonInfoQuery,
  useHackathonListProjectsQuery,
  useLikeProjectMutation,
} from '@/graphql/generated/hooks'
import useQueryToUrl from '@/hooks/use-query-to-url'
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from '@hackquest/ui/shared/tabs'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { InfoType } from '../../explore/[alias]/constants/type'
import { parseParams } from '../utils'
import SelectorZone from './selector-zone'

const ProjectsByHackathon = () => {
  const [limit, setLimit] = useState(6)
  useEffect(() => {
    const isMobileDevice = typeof window === 'object' && window.innerWidth < 640
    isMobileDevice ? setLimit(6) : setLimit(9)
  }, [])
  const { searchParam: pageSearchParam, onChange: onPageChange } =
    useQueryToUrl({
      key: 'page',
      defaultValue: '1',
      isScroll: true,
    })
  const page = pageSearchParam ? Number(pageSearchParam) : 1

  const { data: h } = useSuspenseQuery({
    queryKey: useGetAllHackathonInfoQuery.getKey({ page, limit }),
    queryFn: useGetAllHackathonInfoQuery.fetcher({ page, limit }),
  })
  const hackathons = h.listHackathons.data
  const total = h.listHackathons.total
  return (
    <div className="flex flex-wrap gap-6">
      {hackathons?.map((hac, _index) => (
        <Link
          key={hac.id}
          className="w-full"
          href={`${MenuLink.EXPLORE}/${hac.alias}?tab=${InfoType.PROJECT_GALLERY}`}
        >
          <HackathonCard hackathonInfo={hac} />
        </Link>
      ))}
      <Pagination
        total={total}
        page={page}
        onPageChange={p => {
          onPageChange(p.toString())
        }}
      />
    </div>
  )
}

const ProjectsByProject = () => {
  const [limit, setLimit] = useState(6)
  useEffect(() => {
    const isMobileDevice = typeof window === 'object' && window.innerWidth < 640
    isMobileDevice ? setLimit(6) : setLimit(12)
  }, [])
  const searchParams = useSearchParams()
  const paramsObject = Object.fromEntries(searchParams.entries())
  const params = parseParams(paramsObject)
  const { mutateAsync } = useLikeProjectMutation()
  const { searchParam: pageSearchParam, onChange: onPageChange } =
    useQueryToUrl({
      key: 'page',
      defaultValue: '1',
      isScroll: true,
    })
  const page = pageSearchParam ? Number(pageSearchParam) : 1

  const { data: p } = useSuspenseQuery({
    queryKey: useHackathonListProjectsQuery.getKey({ ...params, limit, page }),
    queryFn: useHackathonListProjectsQuery.fetcher({ ...params, limit, page }),
  })
  const projects = p.listProjects.data

  const total = p.listProjects.total
  return (
    <div className="flex flex-wrap gap-6">
      {projects!.map((pro, _index) => (
        <ProjectCard
          key={pro.id}
          type="like"
          isLiked={pro.isLiked ?? false}
          className="w-full sm:w-[calc((100%-48px)/3)]"
          contentObj={{
            Ecosystem: pro.ecology?.join(',') ?? '',
            TeamLeader: (
              <div className="flex items-center gap-1">
                <img
                  src={pro.teamLead?.avatar ?? ''}
                  className=" h-6 w-6 rounded-full bg-primary-500 object-cover"
                />
                {pro.teamLead?.nickname}
              </div>
            ),
          }}
          likeNum={pro.likes ?? 0}
          onIconClick={e => {
            e.preventDefault()
            e.stopPropagation()
            toast.promise(mutateAsync({ likeProjectId: pro.id }), {
              loading: 'Loading...',
              success: pro.isLiked ? 'Unliked project' : 'Liked project',
              error: pro.isLiked
                ? 'Failed to unlike project'
                : 'Failed to like project',
            })
          }}
          project={pro as ProjectExtend}
          linkTo={`${MenuLink.HACKATHON_PROJECTS}/${pro.alias}`}
        />
      ))}
      <Pagination
        total={total}
        page={page}
        onPageChange={p => {
          onPageChange(p.toString())
        }}
      />
    </div>
  )
}

const AllProject = () => {
  const { searchParam: showby, onChange: onShowbyChange } = useQueryToUrl({
    key: 'showby',
    defaultValue: 'By Hackathon',
    isScroll: true,
  })

  const t = useTranslations('Archive')
  const tabsList: string[] = [t('byHackathon'), t('byProject')]
  return (
    <div className="space-y-6 overflow-hidden pt-6 sm:pt-8">
      <span className="title-3 pt-6 text-primary-neutral sm:pt-8">
        {t('allProject')}
      </span>
      <div>
        <Tabs
          defaultValue={showby ?? 'By Hackathon'}
          className=""
          onValueChange={onShowbyChange}
        >
          <TabsList>
            {tabsList.map((value, _index) => (
              <TabsTrigger value={value} key={value}>
                {value}
              </TabsTrigger>
            ))}
            <TabsIndicator />
          </TabsList>
          <SelectorZone />
          {showby === 'By Project' ? (
            <ProjectsByProject />
          ) : (
            <ProjectsByHackathon />
          )}
        </Tabs>
      </div>
    </div>
  )
}

export default AllProject
