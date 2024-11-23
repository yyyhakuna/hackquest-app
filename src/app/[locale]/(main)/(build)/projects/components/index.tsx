'use client'
import { Suspense } from 'react'
import AllProject from './all-projects'
import ArchiveHeader from './archive-header'
import { Highlight } from './highlight'
function Archive() {
  return (
    <div className="w-full px-6 sm:container">
      <ArchiveHeader />
      <Suspense>
        <Highlight />
      </Suspense>
      <AllProject />
    </div>
  )
}

export default Archive
