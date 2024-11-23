'use client'
import Learn from '@/components/learn'
import type React from 'react'

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface LearnPageProp {}

const LearnPage: React.FC<LearnPageProp> = () => {
  return <Learn />
}

export default LearnPage
