'use client'
import { NotionComponentType } from '@/components/blog-glossary-component-renderer/notion-render/type'
import type { Blog, Glossary } from '@/graphql/generated/hooks'
import { onAllMediaLoaded } from '@/lib/utils'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import DetailHeader from './detail-header'
import DetailLinks from './detail-links'
import DetailNotionContent from './detail-notion-content'
import DetailSections, { type SectionType } from './detail-sections'

type DetailProp = {
  type: 'blog' | 'glossary'
  info: Blog & Glossary
}

const Detail: React.FC<DetailProp> = ({ type, info }) => {
  const boxRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [curSectionIndex, setCurSectionIndex] = useState(0)
  const [sections, setSections] = useState<SectionType[]>([])
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)
  const isOnScroll = useRef(false)
  const onScroll = () => {
    const boxScrollTop = boxRef.current?.scrollTop || 0
    if (isOnScroll.current || scrollTimeout.current) return
    scrollTimeout.current = setTimeout(() => {
      scrollTimeout.current = null
      for (let i = 0; i < sections.length; i++) {
        for (let i = 0; i < sections.length; i++) {
          if (
            boxScrollTop >=
            (sections?.[sections.length - 1]?.offsetTop as unknown as number)
          ) {
            setCurSectionIndex(sections.length - 1)
            break
          } else if (
            boxScrollTop >= (sections[i]?.offsetTop as unknown as number) &&
            boxScrollTop < (sections[i + 1]?.offsetTop as unknown as number)
          ) {
            setCurSectionIndex(i)
            break
          }
        }
      }
    }, 50)
  }

  const changeSection = (section: SectionType) => {
    boxRef.current?.scrollTo({
      top: section.offsetTop,
    })
    setCurSectionIndex(
      sections.findIndex(v => v.offsetTop === section.offsetTop),
    )
    isOnScroll.current = true
    setTimeout(() => {
      isOnScroll.current = false
    }, 100)
  }
  const getHeadlineDom = () => {
    if (contentRef.current) {
      const childNodes = contentRef.current?.childNodes
      const headerHeight = headerRef.current?.clientHeight || 0
      const newSections: SectionType[] = []
      childNodes.forEach(node => {
        if (node instanceof HTMLElement) {
          const datatype = node.getAttribute('datatype')
          if (datatype === NotionComponentType.H2) {
            const offsetTop = node.offsetTop || 0
            newSections.push({
              label: node.innerText,
              offsetTop: offsetTop + headerHeight,
            })
          }
        }
      })
      setSections(newSections)
    }
  }
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    onAllMediaLoaded(contentRef.current as HTMLDivElement, () => {
      setTimeout(() => {
        getHeadlineDom()
      }, 1000)
    })
  }, [info])
  return (
    <div className="absolute top-0 left-0 h-full w-full">
      <div
        className="h-full w-full overflow-y-auto pt-6 pb-20 sm:pt-8 sm:pb-[7.5rem]"
        ref={boxRef}
        onScroll={onScroll}
      >
        <div ref={headerRef}>
          <DetailHeader info={info} type={type} />
        </div>
        <div className="relative px-6 pb-20 sm:container">
          <div className="relative flex gap-8">
            <div className="flex-1 flex-shrink-0 pb-[2.5rem]" ref={contentRef}>
              <DetailNotionContent info={info} />
            </div>
            <div className="relative hidden w-[12.5rem] flex-shrink-0 sm:block">
              <div className="sticky top-0 left-0">
                <DetailSections
                  type={type}
                  sections={sections}
                  curSectionIndex={curSectionIndex}
                  changeSection={changeSection}
                />
              </div>
            </div>
          </div>
          <DetailLinks />
        </div>
      </div>
    </div>
  )
}

export default Detail
