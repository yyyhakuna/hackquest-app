'use client'

import { AnimatedContent } from '@/components/common/animated-content'
import type { HackathonExtend } from '@/graphql/generated/hooks'
import { HackathonDetailProvider } from '@/providers/hackathon/hackathon-detail-provider'
import { useSearchParams } from 'next/navigation'
import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { infoTabs as tabs } from '../constants/data'
import { InfoType } from '../constants/type'
import Header from './header'
import InfoTabs from './info-tabs'
import MoreInfo from './more-info'
import Overview from './overview'
import PrizeJudges from './prize-judges'
import ProjectGallery from './project-gallery'
import Schedule from './schedule'
import Timeline from './timeline'
import { useHackathonQuery } from './utils/query'

interface HackathonDetailProp {
  hackathon: HackathonExtend
}

const HackathonDetail: React.FC<HackathonDetailProp> = ({
  hackathon: hackathonServe,
}) => {
  const { data: hackathonClient } = useHackathonQuery()
  const hackathon = (hackathonClient || hackathonServe) as HackathonExtend
  const query = useSearchParams()
  const tab = query.get('tab') as InfoType
  const infoTabs = tabs
  const tabTop = useRef(0)
  const [selectedTab, setSelectedTab] = useState<InfoType>(
    tab || (infoTabs[0]?.value as InfoType),
  )

  const tabRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const [isSticky, setIsSticky] = useState(false)
  const renderClassName = useCallback(
    (tab: InfoType) => {
      return tab === selectedTab ? '' : 'hidden'
    },
    [selectedTab],
  )

  const onScroll = () => {
    const boxScrollTop = boxRef.current?.scrollTop || 0
    setIsSticky(boxScrollTop >= tabTop.current)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // const tabTop = tabRef.current?.offsetTop || 0
    boxRef.current?.scrollTo({
      top: 0,
    })
  }, [selectedTab])

  useEffect(() => {
    tabTop.current = tabRef.current?.offsetTop || 0
  }, [])

  return (
    <HackathonDetailProvider value={{ selectedTab, setSelectedTab }}>
      <div className="absolute top-0 left-0 h-full w-full">
        <div
          className="scroll-wrap-y relative h-full"
          ref={boxRef}
          onScroll={onScroll}
        >
          <Header hackathon={hackathon} />
          <div
            className="sticky top-0 z-[2] border-neutral-200 border-b-[1px] bg-neutral-white sm:border-t-[1px]"
            ref={tabRef}
          >
            <InfoTabs
              curTab={selectedTab}
              changeCurTab={setSelectedTab}
              isSticky={isSticky}
              hackathon={hackathon}
            />
          </div>

          <AnimatedContent
            value={selectedTab ? selectedTab : 'empty'}
            className="w-full px-6 pt-6 pb-20 sm:container sm:pt-8 sm:pb-[7.5rem]"
          >
            <div className={`${renderClassName(InfoType.OVERVIEW)}`}>
              <div className="gap-8 sm:flex sm:flex-row-reverse">
                <div className="mb-6 w-full sm:relative sm:mb-0 sm:w-[280px] sm:flex-shrink-0">
                  <div className="">
                    <Timeline hackathon={hackathon} />
                  </div>
                </div>
                <Overview hackathon={hackathon} />
              </div>
            </div>
            <div className={`${renderClassName(InfoType.PRIZE_JUDGE)}`}>
              <PrizeJudges hackathon={hackathon} />
            </div>
            <div className={`${renderClassName(InfoType.SCHEDULE)}`}>
              <Schedule hackathon={hackathon} />
            </div>
            <div className={`${renderClassName(InfoType.MORE_INFO)}`}>
              <MoreInfo hackathon={hackathon} />
            </div>
            <div className={`${renderClassName(InfoType.PROJECT_GALLERY)}`}>
              <ProjectGallery hackathon={hackathon} />
            </div>
          </AnimatedContent>
        </div>
      </div>
    </HackathonDetailProvider>
  )
}

export default HackathonDetail
