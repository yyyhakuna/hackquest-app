import { type ReactNode, Suspense } from 'react'
import Page from './components/index'

function CoLearningPage({ children }: { children: ReactNode }) {
  return (
    <Suspense>
      <Page />
    </Suspense>
  )
}

export default CoLearningPage
