'use client'

import { EcosystemCard } from '@/components/ecosystem/ecosystem-card'
import { GlobalSearchKey } from '@/components/global-search-select/utils'
import type {
  Blog,
  CourseV2,
  EcosystemInfo,
  Glossary,
  HackathonExtend,
  ProjectExtend,
} from '@/graphql/generated/hooks'
import type { EventsType } from '@/service/events/type'
import type { Job } from '@/service/jobs/types'
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from '@hackquest/ui/shared/tabs'
import type React from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import HackathonCard from '../../../(build)/builder-home/components/hackathon-card'
import { ProjectCard } from '../../../(build)/explore/[alias]/components/project-gallery/project-card'
import EventsCard from '../../../(community)/events/components/events-card'
import { CourseCard } from '../../../(learn)/practices/components/course-grid'
import BlogCard from '../../../(resource)/blog/components/blog-card'
import GlossaryCard from '../../../(resource)/glossary/components/glossary-card'
import { JobCard } from '../../../(resource)/jobs/components/job-card'

interface OffsetTopsType {
  key: GlobalSearchKey
  offsetTop: number
}
interface SearchProp {
  list: any[]
  keyword: string
}

const Search: React.FC<SearchProp> = ({ list, keyword }) => {
  const [tab, setTab] = useState(list[0].key)
  const tabs = useMemo(() => {
    return list.map(v => ({
      value: v.key,
      label: v.key.replace(/^./, (str: string) => str.toUpperCase()),
    }))
  }, [list])
  const boxRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const scrollTimeOut = useRef<NodeJS.Timeout | null>(null)
  const [isSticky, setIsSticky] = useState(false)
  const [offsetTops, setOffsetTops] = useState<OffsetTopsType[]>([])
  const isOnScroll = useRef(false)
  const renderCard = (key: GlobalSearchKey, info: any) => {
    switch (key) {
      case GlobalSearchKey.ECOSYSTEM:
        return <EcosystemCard ecosystem={info as EcosystemInfo} />
      case GlobalSearchKey.COURSE:
        return <CourseCard course={info as Omit<CourseV2, '_count'>} />
      case GlobalSearchKey.HACKATHON:
        return <HackathonCard hackathon={info as HackathonExtend} />
      case GlobalSearchKey.BLOG:
        return <BlogCard blog={info as Blog} />
      case GlobalSearchKey.GLOSSARY:
        return <GlossaryCard glossary={info as Glossary} />
      case GlobalSearchKey.EVENT:
        return <EventsCard events={info as EventsType} />
      case GlobalSearchKey.PROJECT:
        return <ProjectCard project={info as ProjectExtend} isSearch={true} />
      case GlobalSearchKey.JOB:
        return <JobCard job={info as Job} />
      default:
        return null
    }
  }

  const tabClick = (val: string) => {
    setTab(val)
    const index = tabs.findIndex(v => v.value === val)
    boxRef.current?.scrollTo({
      top: offsetTops[index]?.offsetTop,
    })
    isOnScroll.current = true
    setTimeout(() => {
      isOnScroll.current = false
    }, 100)
  }

  const onScroll = () => {
    const boxScrollTop = boxRef.current?.scrollTop || 0
    setIsSticky(boxScrollTop > 0)
    if (scrollTimeOut.current || isOnScroll.current) return
    scrollTimeOut.current = setTimeout(() => {
      scrollTimeOut.current = null
      for (let i = 0; i < offsetTops.length; i++) {
        if (
          boxScrollTop >=
          (offsetTops?.[offsetTops.length - 1]?.offsetTop as unknown as number)
        ) {
          setTab(offsetTops[offsetTops.length - 1]?.key)
          break
        } else if (
          boxScrollTop >= (offsetTops[i]?.offsetTop as unknown as number) &&
          boxScrollTop < (offsetTops[i + 1]?.offsetTop as unknown as number)
        ) {
          setTab(offsetTops[i]?.key)
          break
        }
      }
    }, 50)
  }

  const getOffsetTops = () => {
    const newOffsetTops = []
    const childNodes = listRef.current?.childNodes || []
    for (let i = 0; i < childNodes?.length; i++) {
      const offsetTop = (childNodes[i] as HTMLDivElement).offsetTop || 0
      newOffsetTops.push({
        key: list[i].key,
        offsetTop: offsetTop - 180,
      })
    }
    setOffsetTops(newOffsetTops)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getOffsetTops()
  }, [])

  return (
    <div className="absolute top-0 left-0 h-full w-full">
      <div
        className="scroll-wrap-y relative h-full pb-20 sm:pb-[7.5rem]"
        onScroll={onScroll}
        ref={boxRef}
      >
        <div
          className={`sticky top-0 left-0 z-[10] w-full bg-neutral-white pt-6 pb-5 sm:pt-8 ${isSticky ? 'shadow-[0_0px_4px_0_rgba(0,0,0,0.25)]' : ''}`}
        >
          <div className="flex flex-col gap-8 px-6 sm:container">
            <p className="title-1 text-neutral-800">
              All results for “{keyword}”
            </p>
            <Tabs value={tab} onValueChange={tabClick}>
              <TabsList className="headline-s flex justify-start gap-4">
                {tabs.map(v => (
                  <TabsTrigger
                    key={v.value}
                    value={v.value}
                    className="flex w-fit gap-[0.5rem] text-neutral-800"
                  >
                    {v.label}
                  </TabsTrigger>
                ))}
                <TabsIndicator />
              </TabsList>
            </Tabs>
          </div>
        </div>
        <div className="flex flex-col gap-8 px-6 sm:container" ref={listRef}>
          {list.map((v, i) => (
            <div className="flex flex-col gap-4" key={i}>
              <p className="title-3 text-neutral-800">{v.key}</p>
              <div className="flex flex-wrap gap-4">
                {v.data.map((p: any) => (
                  <div
                    key={p.id}
                    className={`w-full ${!~[GlobalSearchKey.HACKATHON, GlobalSearchKey.JOB].indexOf(v.key) && 'sm:w-[calc((100%-2rem)/3)]'}`}
                  >
                    {renderCard(v.key, p)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Search
