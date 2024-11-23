'use client'
import useQueryToUrl from '@/hooks/use-query-to-url'
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from '@hackquest/ui/shared/tabs'
import { useTranslations } from 'next-intl'

const ManageTabs = () => {
  const t = useTranslations('HackathonOrganizer.manage')

  const { searchParam, onChange } = useQueryToUrl({
    key: 'tab',
    defaultValue: 'Overview',
    isScroll: true,
    isClear: true,
  })
  const tabList = [
    t('overview'),
    t('application'),
    t('submission'),
    t('judging'),
    t('announcement'),
    t('distribution'),
  ]
  return (
    <div>
      <div>
        <Tabs
          defaultValue={searchParam ?? tabList[0]}
          variant="fill"
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
      </div>
    </div>
  )
}

export default ManageTabs
