'use client'
import useQueryToUrl from '@/hooks/use-query-to-url'
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from '@hackquest/ui/shared/tabs'
export function CoLearningTabs() {
  const tabList = ['All', 'Ongoing', 'Upcoming', 'Past']
  const { searchParam, onChange } = useQueryToUrl({
    key: 'tab',
    defaultValue: 'All',
    isScroll: true,
  })

  return (
    <div>
      <Tabs
        defaultValue={searchParam ?? tabList[0]}
        className="w-1/2"
        onValueChange={onChange}
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
