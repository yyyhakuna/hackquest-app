'use client'
import useQueryToUrl from '@/hooks/use-query-to-url'
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from '@hackquest/ui/shared/tabs'
import { useTranslations } from 'next-intl'
import type React from 'react'

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  isVoting: boolean
  tabList: string[]
}
const JudingTabs: React.FC<TabsProps> = ({ className, isVoting, tabList }) => {
  const t = useTranslations('HackathonOrganizer.manage')
  const { searchParam, onChange } = useQueryToUrl({
    key: 'track',
    defaultValue: tabList[0],
    isScroll: true,
  })

  return (
    <div className='mt-8 mb-6 space-y-6'>
      <Tabs
        defaultValue={searchParam ?? tabList[0]}
        className=""
        onValueChange={t => {
          onChange(t)
        }}
      >
        <TabsList>
          {tabList.map((value, _index) => (
            <TabsTrigger value={value} key={value}>
              {value}
            </TabsTrigger>
          ))}
          <TabsIndicator />
        </TabsList>
      </Tabs>
      {!isVoting && (
        <div className="body-s flex h-[46px] w-full items-center justify-center rounded-lg bg-neutral-100 text-primary-neutral">
          {t('votingNotStarted')}
        </div>
      )}
    </div>
  )
}

export default JudingTabs
