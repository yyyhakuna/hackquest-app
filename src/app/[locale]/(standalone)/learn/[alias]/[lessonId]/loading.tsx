import { Spinner } from '@hackquest/ui/shared/spinner'
import type React from 'react'

const Loading: React.FC = () => {
  return (
    <main className="flex h-full w-full items-center justify-center">
      <Spinner />
    </main>
  )
}

export default Loading
