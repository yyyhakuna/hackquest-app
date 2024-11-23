import HackathonRender from '@/components/hackathon/hackathon-render'
import { TEXT_EDITOR_TYPE } from '@/constants/enum'
import type { HackathonExtend } from '@/graphql/generated/hooks'
import type React from 'react'

interface DescriptionProp {
  hackathon: HackathonExtend
}

const Description: React.FC<DescriptionProp> = ({ hackathon }) => {
  const description = hackathon.info?.description
  const renderDescription = () => {
    if (typeof description === 'string') {
      return (
        <div
          className="prose text-neutral-800"
          dangerouslySetInnerHTML={{
            __html: hackathon.info?.description,
          }}
        />
      )
    }

    if (description?.type === TEXT_EDITOR_TYPE) {
      return (
        <div
          className="body-m text-neutral-800 "
          dangerouslySetInnerHTML={{
            __html: description?.content,
          }}
        />
      )
    }

    if (description?.length) {
      return <HackathonRender content={description} />
    }

    return null
  }
  return (
    <div>
      <p className="title-3 mb-6 text-neutral-800">Description</p>
      {renderDescription()}
    </div>
  )
}

export default Description
