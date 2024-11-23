import MenuLink from '@/constants/menu-link'
import { alternates } from '@/constants/metadata'
import type { Metadata } from 'next'
import type React from 'react'
import Beginner from './components/beginner'
import Daily from './components/daily'
import MileStone from './components/mile-stone'
import TimeLimiting from './components/time-limiting'
import Top from './components/top'

type MissionCenterPageProp = {
  params: {
    locale: string
  }
}

export async function generateMetadata({
  params,
}: MissionCenterPageProp): Promise<Metadata> {
  const { locale } = params
  const metadata: Metadata = {
    title: 'HackQuest Mission',
    alternates: alternates(locale, `${MenuLink.MISSION_CENTER}`),
  }

  return metadata
}

const MissionCenterPage: React.FC<MissionCenterPageProp> = () => {
  return (
    <div className="flex flex-col gap-6 px-6 sm:container">
      <Top />
      <TimeLimiting />
      <Daily />
      <Beginner />
      <MileStone />
    </div>
  )
}

export default MissionCenterPage
