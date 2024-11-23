'use client'
import type React from 'react'
import { useState } from 'react'
import HexagonProgressBar from './HexagonProgressBar'

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface TestProp {}

const Test: React.FC<TestProp> = () => {
  const [progress, setProgress] = useState(50) // 初始进度

  return (
    <div className="App">
      <HexagonProgressBar progress={progress} />
      <input
        type="range"
        value={progress}
        min="0"
        max="100"
        onChange={e => setProgress(Number(e.target.value))}
      />
    </div>
  )
}

export default Test
