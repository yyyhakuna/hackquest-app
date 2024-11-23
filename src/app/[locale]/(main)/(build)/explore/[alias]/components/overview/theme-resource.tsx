import HackathonRender from '@/components/hackathon/hackathon-render'
import type { HackathonExtend } from '@/graphql/generated/hooks'
import type { HackathonThemeResource } from '@/service/hackathon/type'
import type React from 'react'

interface ThemeResourceProp {
  hackathon: HackathonExtend
  title: string
  type: HackathonThemeResource
}

const ThemeResource: React.FC<ThemeResourceProp> = ({ hackathon, title, type }) => {
  if (!hackathon.info?.sections?.[type]?.length) return null
  return (
    <div>
      <p className="title-3 text-neutral-800">{title}</p>
      <div className="body-m mt-8 text-neutral-800">
        <HackathonRender content={hackathon.info?.sections?.[type]} />
      </div>
    </div>
  )
}

export default ThemeResource
