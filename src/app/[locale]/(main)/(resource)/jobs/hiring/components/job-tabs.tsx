'use client'
import { Tabs, TabsIndicator, TabsList, TabsTrigger } from '@hackquest/ui/shared/tabs'
import { useTranslations } from 'next-intl'
export function JobTabs() {
  const t = useTranslations('Jobs.hiring')
  const tabList = [t('allJobs'), t('open'), t('closed')]

  return (
    <div>
      <Tabs
        defaultValue="All Jobs"
        className="w-1/2"
        onValueChange={_v => {
        }}
      >
        <TabsList>
          {tabList.map(v => (
            <TabsTrigger key={v} value={v}>
              {v}
            </TabsTrigger>
          ))}
          <TabsIndicator />
        </TabsList>
      </Tabs>
      <div className="mt-2 h-[1px] bg-gray-200" />
    </div>
  )
}
