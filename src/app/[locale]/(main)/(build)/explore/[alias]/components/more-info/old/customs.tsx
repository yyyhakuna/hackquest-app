import type { HackathonExtend } from '@/graphql/generated/hooks'
import { HackathonCustomType, type HackathonInfoSectionCustomType } from '@/service/hackathon/type'
import type React from 'react'
import CustomText from './custom-text'
import Partners from './partners'
import Sponsors from './sponsors'

interface CustomsProp {
  hackathon: HackathonExtend
}

const Customs: React.FC<CustomsProp> = ({ hackathon }) => {
  const renderCustom = (custom: HackathonInfoSectionCustomType) => {
    switch (custom.type) {
      case HackathonCustomType.CUSTOM_TEXT:
        return <CustomText custom={custom} />
      case HackathonCustomType.CUSTOM_IMAGE_NAME:
        return <Partners isCustom={true} custom={custom} />
      case HackathonCustomType.CUSTOM_IMAGE_TITLE:
        return <Sponsors isCustom={true} custom={custom} />
      default:
        return null
    }
  }
  if (!hackathon.info?.sections?.customs?.length) return null
  return hackathon.info?.sections?.customs?.map((custom: HackathonInfoSectionCustomType) => (
    <div key={custom.id}>{renderCustom(custom)}</div>
  ))
}

export default Customs
