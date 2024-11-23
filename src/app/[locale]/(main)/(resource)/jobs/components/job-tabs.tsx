'use client'
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from '@hackquest/ui/shared/tabs'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { LuActivity, LuCode, LuPenTool } from 'react-icons/lu'
export function JobTabs() {
  const [_tabList, setTabList] = useState(['All Jobs', 'Saved'])
  const t = useTranslations('Jobs')

  useEffect(() => {
    const isMobileDevice = typeof window === 'object' && window.innerWidth < 640
    const updatedTabList = isMobileDevice
      ? ['All Jobs', 'Saved']
      : ['All Jobs', 'Saved', 'Marketing', 'Design', 'Engineering']

    setTabList(updatedTabList)
  }, [])
  // useEffect(() => {
  //   if (!key || !tabList.includes(key)) {
  //     router.replace('/zh-cn/jobs?keyword=All+Jobs')
  //   }
  // }, [key, router])

  return (
    <div>
      <Tabs defaultValue="All Jobs" className="w-1/2" onValueChange={_v => {}}>
        <TabsList>
          <TabsTrigger value="All Jobs">{t('allJobs')}</TabsTrigger>
          <TabsTrigger value="Saved">{t('saved')}</TabsTrigger>
          <TabsTrigger value="Marketing" className="hidden gap-2 sm:flex">
            <LuActivity /> {t('marketing')}
          </TabsTrigger>
          <TabsTrigger value="Design" className="hidden gap-2 sm:flex">
            <LuPenTool /> {t('design')}
          </TabsTrigger>
          <TabsTrigger value="Engineering" className="hidden gap-2 sm:flex">
            <LuCode /> {t('engineering')}
          </TabsTrigger>
          <TabsIndicator />
        </TabsList>
      </Tabs>
      <div className="mt-2 h-[1px] bg-gray-200" />
    </div>
  )
}
