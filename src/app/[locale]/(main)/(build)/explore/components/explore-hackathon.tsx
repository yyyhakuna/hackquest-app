'use client'

import { Link, useRouter } from '@/app/navigation'
import { Pagination } from '@/components/common/pagination'
import HackathonCard from '@/components/hackathon/hackathon-card'
import MenuLink from '@/constants/menu-link'
import {
  type GetAllHackathonInfoQuery,
  type GetAllHackathonInfoQueryVariables,
  HackathonStatus,
  useGetAllHackathonInfoQuery,
} from '@/graphql/generated/hooks'
import useQueryToUrl from '@/hooks/use-query-to-url'
import { Button } from '@hackquest/ui/shared/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@hackquest/ui/shared/select'
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from '@hackquest/ui/shared/tabs'
import { useSuspenseQuery } from '@tanstack/react-query'
import {
  HACKATHON_STATUS,
  PAGE_LIMIT,
  ecosystemOptions,
  hackathonExploreTab,
  sortByOptions,
  tagOptions,
  techStackOptions,
  totalPrizeOptions,
} from '../constants/data'

interface ExploreHackathonSelectorProps {
  placeholder: string
  options?: Array<{
    label: string
    value: string
  }>
}

const ExploreHackathonSelect = (props: ExploreHackathonSelectorProps) => {
  const { placeholder, options } = props
  return (
    <Select>
      <SelectTrigger className="headline-m gap-2 border-none bg-neutral-100 px-6 py-2 text-primary-neutral">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options &&
          options.map((option, index) => (
            <SelectItem key={index} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
}

const ExploreHackathonContent = ({
  allHackathonInfo,
}: { allHackathonInfo: GetAllHackathonInfoQuery }) => {
  const _router = useRouter()

  return (
    <div className="grid gap-6 pt-6">
      {allHackathonInfo.listHackathons.data?.map((hackathonInfo, index) => (
        <Link key={index} href={`${MenuLink.EXPLORE}/${hackathonInfo.alias}`}>
          <HackathonCard
            hackathonInfo={hackathonInfo}
            isRecommend={!!hackathonInfo.priority}
          />
        </Link>
      ))}
    </div>
  )
}

const ExploreHackathon = () => {
  const { searchParam, onChange } = useQueryToUrl({
    key: 'curTab',
    isClear: true,
    defaultValue: HackathonStatus.Ongoing,
  })
  const { searchParam: pageSearchParam, onChange: onPageChange } =
    useQueryToUrl({
      key: 'page',
      defaultValue: '1',
      isScroll: true,
    })

  const page = pageSearchParam ? Number(pageSearchParam) : 1

  const queryParams: GetAllHackathonInfoQueryVariables = {
    where: {
      status: { equals: HACKATHON_STATUS },
    },
    status: searchParam
      ? (searchParam as HackathonStatus)
      : HackathonStatus.Ongoing,
    page,
    limit: PAGE_LIMIT,
  }

  const { data: allHackathonInfo } = useSuspenseQuery({
    queryKey: useGetAllHackathonInfoQuery.getKey(queryParams),
    queryFn: useGetAllHackathonInfoQuery.fetcher(queryParams),
  })

  return (
    <div className="pt-8">
      <h3 className="title-3 text-primary-neutral">All Hackathon</h3>
      <div className="border-b-[1px] border-b-neutral-200 pt-6 sm:border-none">
        <Tabs
          defaultValue={searchParam ?? HackathonStatus.Ongoing}
          onValueChange={(value: string) => {
            onChange(value)
          }}
        >
          <TabsList>
            {hackathonExploreTab.map((item, index) => (
              <TabsTrigger key={index} value={item.value}>
                {item.label}
              </TabsTrigger>
            ))}

            <TabsIndicator />
          </TabsList>
        </Tabs>
      </div>
      <div className="flex justify-between overflow-x-auto whitespace-nowrap py-6 sm:border-b-[1px] sm:border-b-netural-200">
        <div className="inline-flex gap-4 sm:flex">
          <ExploreHackathonSelect
            placeholder="Total Prize"
            options={totalPrizeOptions}
          />
          <ExploreHackathonSelect
            placeholder="Ecosystem"
            options={ecosystemOptions}
          />
          <ExploreHackathonSelect
            placeholder="Tech Stack"
            options={techStackOptions}
          />
          <ExploreHackathonSelect placeholder="Tag" options={tagOptions} />
        </div>
        <div className="flex gap-6">
          <Button
            variant="text"
            className="headline-m px-6 py-2 text-primary-neutral"
          >
            Clear all
          </Button>
          <ExploreHackathonSelect
            placeholder="Sort By"
            options={sortByOptions}
          />
        </div>
      </div>
      <ExploreHackathonContent allHackathonInfo={allHackathonInfo} />
      <div className="flex justify-center pt-6">
        {allHackathonInfo.listHackathons.total > PAGE_LIMIT && (
          <Pagination
            total={allHackathonInfo.listHackathons.total}
            page={page}
            limit={PAGE_LIMIT}
            onPageChange={(page: number) => {
              onPageChange(page.toString())
            }}
          />
        )}
      </div>
    </div>
  )
}

export default ExploreHackathon
