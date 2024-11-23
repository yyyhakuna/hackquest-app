import type { HackathonExtend } from '@/graphql/generated/hooks'
import type React from 'react'

interface AnotherProp {
  hackathon: HackathonExtend
}

const Another: React.FC<AnotherProp> = ({ hackathon }) => {
  const another = hackathon?.info?.sections?.textInfo?.another || []
  if (!another.length) return null
  return (
    <div className="headline-m text-neutral-800">
      <p className="title-3 text-neutral-800">Another</p>
      <div className="mt-4 flex flex-col gap-4">
        {another.map((v: any, i: number) => (
          <div key={i}>
            <div className="">{v.title}</div>
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

export default Another
