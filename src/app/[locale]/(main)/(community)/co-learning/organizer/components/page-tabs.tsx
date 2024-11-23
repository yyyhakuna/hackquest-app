'use client'
import useQueryToUrl from '@/hooks/use-query-to-url'
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from '@hackquest/ui/shared/tabs'
import { useTranslations } from 'next-intl'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}
export function PageTabs() {
  const t = useTranslations('HackathonOrganizer')
  const { searchParam, onChange } = useQueryToUrl({
    key: 'tab',
    defaultValue: 'Ongoing Hackathon',
    isScroll: true,
  })

  const tabList = [t('ongoingHackathon'), 'In Progress', t('pastHackathons')]

  return (
    <div>
      <Tabs
        defaultValue={searchParam ?? tabList[0]}
        className=""
        onValueChange={onChange}
      >
        <TabsList>
          {tabList.map((value, _index) => (
            <TabsTrigger value={value} key={value}>
              {value}
            </TabsTrigger>
          ))}
          <TabsIndicator />
        </TabsList>
        <div className="mt-6 h-[1px] bg-gray-200" />
      </Tabs>
    </div>
  )
}
