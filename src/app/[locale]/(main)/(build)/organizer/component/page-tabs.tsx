'use client'
import useQueryToUrl from '@/hooks/use-query-to-url'
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from '@hackquest/ui/shared/tabs'
import { useTranslations } from 'next-intl'
import DraftList from './draft-list'
import OngoingList from './ongoing-list'
import PastHackathons from './past-hackathons'
import ReviewHackathons from './review-hackathon'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}
export function PageTabs() {
  const t = useTranslations('HackathonOrganizer')
  const { searchParam, onChange } = useQueryToUrl({
    key: 'tab',
    defaultValue: 'Ongoing Hackathon',
    isScroll: true,
  })
  // const num = useState()
  const renderList = () => {
    if (searchParam === 'In Progress') {
      return <DraftList />
    } else if (searchParam === 'Past Hackathon') {
      return <PastHackathons />
    } else if (searchParam === 'Review') {
      return <ReviewHackathons />
    } else {
      return <OngoingList />
    }
  }

  const tabList = [
    t('ongoingHackathon'),
    'In Progress',
    t('pastHackathons'),
    'Review',
  ]

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
        <div className="mt-4 h-[1px] bg-gray-200" />
        {renderList()}
      </Tabs>
    </div>
  )
}
