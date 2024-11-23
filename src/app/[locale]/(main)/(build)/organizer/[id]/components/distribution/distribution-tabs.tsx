'use client'
import useQueryToUrl from '@/hooks/use-query-to-url'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@hackquest/ui/shared/select'
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from '@hackquest/ui/shared/tabs'
import { useTranslations } from 'next-intl'

const DistributionTabs = () => {
  const _t = useTranslations('HackathonOrganizer.manage')

  const { searchParam, onChange } = useQueryToUrl({
    key: 'type',
    defaultValue: 'Page View',
    isScroll: true,
  })
  const tabList = ['Page View', 'Registration', 'Submission', 'Winners']
  return (
    <Tabs
      defaultValue={searchParam ?? tabList[0]}
      className=" flex justify-between"
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
      <Select>
        <SelectTrigger className="headline-s w-[126px] gap-2 border-none bg-neutral-100 px-6 py-2 text-primary-neutral">
          <SelectValue placeholder={'1 week'} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="week">one week</SelectItem>
        </SelectContent>
      </Select>
    </Tabs>
  )
}

export default DistributionTabs
