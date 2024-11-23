'use client'
import Progress from '@/components/duck-pet/progress'
import type React from 'react'
import Duck from './duck'
import Level from './level'

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface DuckInfoProp {}

const DuckInfo: React.FC<DuckInfoProp> = () => {
  return (
    <div className="flex h-full">
      <div className="max-sm:hidden">
        <Progress />
      </div>
      <div className="flex flex-1">
        <div className="flex-1 max-sm:hidden">
          <Duck />
        </div>
        <Level />
      </div>
    </div>
  )
}

export default DuckInfo
