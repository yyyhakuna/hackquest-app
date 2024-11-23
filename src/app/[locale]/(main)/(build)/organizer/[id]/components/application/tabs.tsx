'use client'
import useQueryToUrl from '@/hooks/use-query-to-url'
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from '@hackquest/ui/shared/tabs'
import { useTranslations } from 'next-intl'

const ApplicationTabs = () => {
  const t = useTranslations('HackathonOrganizer.manage')

  const { searchParam, onChange } = useQueryToUrl({
    key: 'status',
    defaultValue: 'Pending Review',
    isScroll: true,
  })
  const tabList = [
    t('pendingReview'),
    t('approve'),
    t('decline'),
    t('waitlist'),
  ]
  return (
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
  )
}

export default ApplicationTabs
