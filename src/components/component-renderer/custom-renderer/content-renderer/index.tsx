import {
  ContentType,
  useContentContext,
} from '@/components/learn/constants/type'
import { useCourseLesson } from '@/store/learn'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { cn } from '@hackquest/ui/lib/utils'
import type React from 'react'
import { useMemo, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { childRenderCallback } from '../..'
import type { CustomComponent } from '../../constants/type'
import TextRenderer from '../../notion-renderer/text-renderer'

interface ContentRendererProp {
  component: CustomComponent
  parent: CustomComponent
}

const ContentRenderer: React.FC<ContentRendererProp> = ({ component }) => {
  const lesson = useCourseLesson()
  const { contentType } = useContentContext()
  const multiple = useMemo(() => {
    if ([ContentType.LESSON].includes(contentType)) {
      return lesson.content.left.length > 1
    } else {
      return lesson.content.length > 1
    }
  }, [contentType, lesson])
  const [showAll, setShowAll] = useState(true)
  const [parent] = useAutoAnimate()
  return (
    <div
      className={cn(
        'rounded-[.625rem] p-6 sm:p-8',
        multiple && 'border border-neutral-200 p-4',
      )}
      datatype="content"
      ref={parent}
    >
      <div
        className={`flex items-center justify-between ${multiple ? 'cursor-pointer' : ''}`}
        onClick={() => {
          if (!multiple) return
          setShowAll(!showAll)
        }}
      >
        <span className="title-5">
          {component.title && component.title.toLowerCase() !== 'content' ? (
            component.title
          ) : (
            <TextRenderer richTextArr={component.content.rich_text} />
          )}
        </span>
        {multiple && (
          <FiChevronDown
            className={`size-4 cursor-pointer transition-all ${showAll ? 'rotate-180' : ''}`}
          />
        )}
      </div>
      {showAll && (
        <div className={cn('mt-4')}>
          {component?.children?.map(childRenderCallback(component))}
        </div>
      )}
    </div>
  )
}

export default ContentRenderer
