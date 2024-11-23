import type React from 'react'

interface SubTitleProp {
  title: string
}

const SubTitle: React.FC<SubTitleProp> = ({ title }) => {
  return <div className="title-3 mb-[16px] text-neutral-800">{title}</div>
}

export default SubTitle
