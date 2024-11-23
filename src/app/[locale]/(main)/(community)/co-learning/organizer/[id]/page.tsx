import { Suspense } from 'react'
import Index from './component'

const page = () => {
  return (
    <Suspense>
      <Index />
    </Suspense>
  )
}

export default page
