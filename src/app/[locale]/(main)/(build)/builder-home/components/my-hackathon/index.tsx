'use client'

import { AnimatedContent } from '@/components/common/animated-content'
import { Pagination } from '@/components/common/pagination'
import {
  type HackathonExtend,
  type HackathonStatus,
  useListHackathonsBySelfQuery,
} from '@/graphql/generated/hooks'
import { useSetState } from '@/hooks/use-set-state'
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from '@hackquest/ui/shared/tabs'
import { useTranslations } from 'next-intl'
import type React from 'react'
import { useRef } from 'react'
import { PAGE_LIMIT, myHackathonTabs } from '../../constants/data'
import HackathonSkeleton from '../hackathon-skeleton/hackathon-skeleton'
import HackathonNodata from '../no-data/hackathon-nodata'
import MyHackathonCard from './my-hackathon-card'

interface MyHackathonProps {
  scrollToRef: (ref: HTMLDivElement) => void
}
const MyHackathon: React.FC<MyHackathonProps> = ({ scrollToRef }) => {
  const t = useTranslations()
  const [params, setParams] = useSetState({
    page: 1,
    limit: 4,
    status: myHackathonTabs[0]?.value,
  })
  const ref = useRef<HTMLDivElement>(null)
  const { data, isPending } = useListHackathonsBySelfQuery(params, {
    select: data => data.listHackathonsBySelf,
    staleTime: Number.POSITIVE_INFINITY,
  })

  return (
    <div className="flex flex-col gap-6" ref={ref}>
      <p className="title-3 text-neutral-800">{t('BuilderHome.myHackathon')}</p>
      <Tabs
        value={params.status}
        onValueChange={tab => {
          setParams({
            page: 1,
            status: tab as HackathonStatus,
          })
        }}
      >
        <TabsList className="headline-s flex justify-start gap-4">
          {myHackathonTabs.map(v => (
            <TabsTrigger key={v.value} value={v.value}>
              {v.label}
            </TabsTrigger>
          ))}
          <TabsIndicator />
        </TabsList>
      </Tabs>
      <AnimatedContent
        value={params.status}
        className="flex flex-col gap-6 sm:border-neutral-200 sm:border-t sm:pt-6"
      >
        {isPending ? (
          <HackathonSkeleton />
        ) : data?.data?.length! > 0 ? (
          <>
            {data?.data?.map(hackathon => (
              <div className="w-full" key={hackathon.id}>
                <MyHackathonCard hackathon={hackathon as HackathonExtend} />
              </div>
            ))}
            <Pagination
              total={data?.total}
              page={params.page}
              limit={PAGE_LIMIT}
              onPageChange={page => {
                scrollToRef(ref.current!)
                setParams({
                  page,
                })
              }}
            />
          </>
        ) : (
          <HackathonNodata />
        )}
      </AnimatedContent>
    </div>
  )
}

export default MyHackathon
