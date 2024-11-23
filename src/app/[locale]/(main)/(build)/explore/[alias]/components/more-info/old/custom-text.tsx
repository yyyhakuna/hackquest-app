import type { HackathonInfoSectionCustomType } from '@/service/hackathon/type'
import type React from 'react'

interface CustomTextProp {
  custom: HackathonInfoSectionCustomType
}

const CustomText: React.FC<CustomTextProp> = ({ custom }) => {
  return (
    <div>
      <p className="title-3 text-neutral-800">{custom.title}</p>
      <div
        className="body-m whitespace-pre-line"
        dangerouslySetInnerHTML={{
          __html: custom.text.content,
        }}
      />
    </div>
  )
}

export default CustomText
