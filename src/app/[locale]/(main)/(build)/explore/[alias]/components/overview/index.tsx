import type { HackathonExtend } from '@/graphql/generated/hooks'
import type React from 'react'
import Another from './another'
import BaseInfo from './base-info'
import Description from './description'
import Faqs from './faqs'
import Judge from './judge'
import Resource from './resource'
import ThemeSource from './theme-resource'

interface OverviewProp {
  hackathon: HackathonExtend
}

const Overview: React.FC<OverviewProp> = ({ hackathon }) => {
  return (
    <div className="flex flex-1 flex-col gap-12">
      <BaseInfo hackathon={hackathon} />
      <Judge hackathon={hackathon} />
      <Description hackathon={hackathon} />
      <Faqs hackathon={hackathon} />
      <Resource hackathon={hackathon} />
      <Another hackathon={hackathon} />
      <ThemeSource hackathon={hackathon} type="resource" title="Source" />
      <ThemeSource hackathon={hackathon} type="theme" title="Theme" />
    </div>
  )
}

export default Overview
