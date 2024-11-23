import { Suspense } from 'react'
import CoLearning from './component'

type PageProps = {
  searchParams: {
    page?: string
    tab?: string
  }
}

const Jobs = () => {
  return (
    <Suspense>
      <CoLearning />
    </Suspense>
  )
}

export default Jobs
