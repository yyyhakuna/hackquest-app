'use client'
import { AnimatedContent } from '@/components/common/animated-content'
import ClientOnly from '@/components/common/client-only'
import {
  type CoLearning,
  useListCoLearningQuery,
} from '@/graphql/generated/hooks'
import { FeedbackIcon } from '@hackquest/ui/shared/feedback-icon'
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from '@hackquest/ui/shared/tabs'
import { useParams, } from 'next/navigation'
import * as React from 'react'
import { LuSave } from 'react-icons/lu'
import Back from '../../../component/back'
import { ColearningProvider } from './component/common/creation-provider'
import { type TabsValue, creationTabs } from './constant'

export default function Page() {
  const [selectedTab, setSelectedTab] = React.useState<TabsValue>(
    creationTabs[0]?.value,
  )
  const [continueButtonStatus, setContinueButtonStatus] = React.useState(0)
  const coLearningId = useParams().id as string

  const { data: coLearning } = useListCoLearningQuery(
    {
      where: {
        id: {
          equals: coLearningId,
        },
      },
    },
    {
      staleTime: 0,
    },
  )

  const data = coLearning?.listCoLearning?.data![0] as CoLearning

  const contextValue = React.useMemo(
    () => ({
      selectedTab,
      setSelectedTab,
      data,
      continueButtonStatus,
      setContinueButtonStatus,
    }),
    [selectedTab, data, continueButtonStatus],
  )

  const Component =
    creationTabs.find(tab => tab.value === selectedTab)?.component || null

  return (
    <ClientOnly>
      <div className="fixed top-0 right-0 left-0 h-screen w-screen overflow-auto bg-neutral-100">
        <div className=" flex h-16 items-center gap-8 p-8">
          <Back />
          <button className="flex items-center gap-2">
            <LuSave /> Save
          </button>
        </div>
        <ColearningProvider value={contextValue}>
          <div className="m-auto w-2/3 space-y-8 rounded-3xl bg-neutral-white p-8">
            <h2 className="title-1 text-center">HackQuest Colearning Camp</h2>
            <Tabs
              variant="default"
              value={selectedTab}
              onValueChange={value => setSelectedTab(value as TabsValue)}
            >
              <TabsList>
                {creationTabs.map(tab => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="gap-2"
                  >
                    <span>{tab.label}</span>
                    <FeedbackIcon
                      className="shrink-0"
                      size="small"
                      disabled={!data?.progress?.includes(tab.value)}
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
              <React.Suspense>{Component}</React.Suspense>
            </AnimatedContent>
          </div>
        </ColearningProvider>
      </div>
    </ClientOnly>
  )
}
