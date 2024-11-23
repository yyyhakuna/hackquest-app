'use client'

import { Link } from '@/app/navigation'
import { AnimatedContent } from '@/components/common/animated-content'
import {
  type CreationTabValue,
  type CreationType,
  creationBaseTabs,
  creationMoreTabs,
} from '@/components/hackathon-creation/constants/data'
import { HACKQUEST_TELEGRAM } from '@/constants/links'
import { useHackathonQuery } from '@/hooks/hackathon/query'
import { useSetState } from '@/hooks/use-set-state'
import {
  type CreationProgress,
  HackathonCreationProvider,
} from '@/providers/hackathon/hackathon-creation-provider'
import { FeedbackIcon } from '@hackquest/ui/shared/feedback-icon'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@hackquest/ui/shared/hover-card'
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from '@hackquest/ui/shared/tabs'
import Image from 'next/image'
import * as React from 'react'
import { AiFillWechat } from 'react-icons/ai'
import { FaTelegram } from 'react-icons/fa'

export default function Page() {
  const { data: hackathon } = useHackathonQuery()

  const [creationType, setCreationType] = React.useState<CreationType>('base')

  const [progress, setProgress] = useSetState<CreationProgress>()

  const creationTabs = React.useMemo(() => {
    return creationType === 'base' ? creationBaseTabs : creationMoreTabs
  }, [creationType])

  const [selectedTab, setSelectedTab] = React.useState<CreationTabValue>(
    creationTabs[0]?.value,
  )

  const contextValue = React.useMemo(
    () => ({
      creationType,
      setCreationType,
      selectedTab,
      setSelectedTab,
      progress,
      setProgress,
    }),
    [creationType, selectedTab, progress, setProgress],
  )

  React.useEffect(() => {
    if (hackathon?.progress) {
      hackathon.progress.forEach(progressKey => {
        setProgress({ [progressKey]: true })
      })
    }
  }, [hackathon?.progress, setProgress])

  const Component =
    creationTabs.find(tab => tab.value === selectedTab)?.component || null

  return (
    <HackathonCreationProvider value={contextValue}>
      <div className="space-y-8 rounded-3xl bg-neutral-white p-8">
        <div className="space-y-2">
          <h2 className="title-1 text-center">{hackathon?.name}</h2>
          <div className="body-s flex items-center justify-center text-neutral-black">
            <span>Need any help setting up?</span>
            <span className="ml-4">Contact Us</span>
            <Link
              href={HACKQUEST_TELEGRAM}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegram className="ml-2 size-5 text-social-telegram" />
            </Link>
            <HoverCard>
              <HoverCardTrigger asChild>
                <button className="outline-none">
                  <AiFillWechat className="ml-2 size-6 text-social-wechat" />
                </button>
              </HoverCardTrigger>
              <HoverCardContent align="center" className="w-fit">
                <Image
                  src="/images/hackathon/qrcode.png"
                  alt="qrcode"
                  width={120}
                  height={120}
                />
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
        <Tabs
          variant="default"
          value={selectedTab}
          onValueChange={value => setSelectedTab(value as CreationTabValue)}
        >
          <TabsList>
            {creationTabs.map(tab => (
              <TabsTrigger key={tab.value} value={tab.value} className="gap-2">
                <span>
                  {tab.label}{' '}
                  {creationType === 'more' && (
                    <span className="body-xs">(Optional)</span>
                  )}
                </span>
                <FeedbackIcon
                  className="shrink-0"
                  size="small"
                  disabled={!progress[tab.value]}
                  variant="success"
                />
              </TabsTrigger>
            ))}
            <TabsIndicator />
          </TabsList>
        </Tabs>
        <AnimatedContent
          value={selectedTab ? selectedTab : 'empty'}
          className="flex-1"
        >
          {Component}
        </AnimatedContent>
      </div>
    </HackathonCreationProvider>
  )
}
