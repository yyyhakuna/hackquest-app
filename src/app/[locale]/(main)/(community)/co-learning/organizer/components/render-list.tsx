'use client'
import { useSearchParams } from 'next/navigation'
import DraftList from './draft-list'
import OngoingPastList from './ongoing-past-list'

const RenderList = () => {
  const tab = useSearchParams().get('tab')
  const renderList = () => {
    switch (tab) {
      case 'In Progress':
        return <DraftList />
      default:
        return <OngoingPastList />
    }
  }
  return <div>{renderList()}</div>
}

export default RenderList
