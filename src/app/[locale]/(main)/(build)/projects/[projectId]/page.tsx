'use client'

import { AnimatedContent } from '@/components/common/animated-content'
import { useProjectQuery } from '@/hooks/project/query'
import { notFound } from 'next/navigation'
import * as React from 'react'
import BuilderAlsoViewed from './components/builder-also-viewed'
import { Hackathons } from './components/hackathons'
import { Header } from './components/header'
import { Overview } from './components/overview'
import { ProjectInfo } from './components/project-info'
import { ProjectTabs } from './components/project-tabs'
import { Team } from './components/team'

export default function Page() {
  const [selectedTab, setSelectedTab] = React.useState('overview')
  const { data } = useProjectQuery()

  if (!data) {
    notFound()
  }

  return (
    <div className="w-full space-y-6">
      <div className="sm:container max-sm:px-6">
        <Header />
        <ProjectInfo />
      </div>
      <ProjectTabs value={selectedTab} onValueChange={setSelectedTab} />
      <AnimatedContent value={selectedTab ? selectedTab : 'empty'}>
        {selectedTab === 'overview' && <Overview />}
        {selectedTab === 'hackathons' && (
          <Hackathons title="Submitted Hackahton" editable={false} />
        )}
        {selectedTab === 'team' && <Team />}
      </AnimatedContent>
      <div className="sm:container max-sm:px-6 sm:mt-8 sm:py-8">
        <BuilderAlsoViewed />
      </div>
    </div>
  )
}
