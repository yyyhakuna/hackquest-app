import { Suspense, useState } from 'react'
import SearchZone from '../search-zone'
import { ApplicationTable } from './application-table'
import ApplicationTabs from './tabs'
const Application = () => {
  const [searchWords, setSearchWords] = useState('')
  return (
    <div className="mt-8">
      <ApplicationTabs />
      <div className="w-full">
        <SearchZone
          className=" py-6"
          needWordSort={false}
          onInputChange={w => {
            setSearchWords(w)
          }}
        />
        <Suspense>
          <ApplicationTable searchWords={searchWords} />
        </Suspense>
      </div>
    </div>
  )
}

export default Application
