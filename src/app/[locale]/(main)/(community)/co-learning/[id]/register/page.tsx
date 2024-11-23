import React, { Suspense } from 'react'
import Register from './component'

const Page = () => {
  return (
    <div>
      <Suspense>
        <Register />
      </Suspense>
    </div>
  )
}

export default Page
