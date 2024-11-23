import { copyText } from '@/lib/utils'
import { Button } from '@hackquest/ui/shared/button'
import { useTranslations } from 'next-intl'
import type React from 'react'
import toast from 'react-hot-toast'
import { FiShare } from 'react-icons/fi'
export interface SectionType {
  label: string
  offsetTop: number
}

interface DetailSectionsProp {
  sections: SectionType[]
  curSectionIndex: number
  changeSection: (section: SectionType) => void
  type: 'blog' | 'glossary'
}

const DetailSections: React.FC<DetailSectionsProp> = ({
  sections,
  curSectionIndex,
  changeSection,
  type,
}) => {
  const t = useTranslations()
  return (
    <div className="headline-m flex w-full flex-col gap-6 text-neutral-800">
      <Button
        variant="outline"
        color="neutral"
        className="headline-s flex w-fit items-center gap-2 "
        onClick={() => {
          toast.success('Copy Successfully!')
          copyText(window.location.href)
        }}
      >
        {`${t('Common.share')} ${t(type === 'blog' ? 'Blog.pageTitle' : 'Glossary.pageTitle')}`}{' '}
        <FiShare />
      </Button>
      <div className="flex flex-col gap-2">
        {sections.map((v, i) => (
          <div
            key={i}
            onClick={() => changeSection(v)}
            data-select={curSectionIndex === i}
            className={`cursor-pointer truncate whitespace-nowrap rounded-[.75rem] p-2 hover:bg-neutral-100 data-[select="true"]:bg-neutral-100`}
            title={v.label}
          >
            {v.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DetailSections
