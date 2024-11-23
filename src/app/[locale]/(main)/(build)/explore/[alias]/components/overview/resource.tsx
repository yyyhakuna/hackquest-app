import type { HackathonExtend } from '@/graphql/generated/hooks'
import type React from 'react'

interface ResourceProp {
  hackathon: HackathonExtend
}

const Resource: React.FC<ResourceProp> = ({ hackathon }) => {
  const resource = hackathon?.info?.sections?.textInfo?.resource || []
  if (!resource.length) return null
  return (
    <div className="headline-m text-neutral-800">
      <p className="title-3 text-neutral-800">Resource</p>
      <div className="mt-4 flex flex-col gap-4">
        {resource.map((v: any, i: number) => (
          <div key={i}>
            <div
              className={`prose mt-2 text-neutral-500`}
              dangerouslySetInnerHTML={{ __html: v.description }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Resource
