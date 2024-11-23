
import { Spinner } from '@hackquest/ui/shared/spinner'
import { Suspense, useState } from 'react'
import SearchZone from '../search-zone'
import { SubmissionTable } from './submission-table'

export function Submission() {
  const [searchWords, setSearchWords] = useState('')

  return (
    <div className="w-full">
      <SearchZone
        className="mt-8 mb-6"
        onInputChange={w => {
          setSearchWords(w)
        }}
      />
      <Suspense fallback={<Spinner className="m-auto mt-10" />}>
        <SubmissionTable searchWords={searchWords} />
      </Suspense>
    </div>
  )
}
