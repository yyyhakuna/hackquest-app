import { usePageType } from '@/store/learn'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { cn } from '@hackquest/ui/lib/utils'
import type React from 'react'
import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { childRenderCallback } from '../..'
import { HEADING_TYPES } from '../../constants/data'
import {
  type ComponentRendererProp,
  NotionComponentType,
} from '../../constants/type'
import TextRenderer from '../text-renderer'

type ToggleRendererProp = ComponentRendererProp

const ToggleRenderer: React.FC<ToggleRendererProp> = ({
  component,
  isRenderChildren = true,
  prevComponent,
  nextComponent,
}) => {
  const [parent] = useAutoAnimate()
  const pageType = usePageType()
  const [showChild, setShowChild] = useState(true)
  const getClassName = () => {
    switch (pageType) {
      default:
        return cn(
          'py-2',
          prevComponent?.type !== NotionComponentType.TOGGLE
            ? 'border-t mt-2'
            : '',
          nextComponent?.type !== NotionComponentType.TOGGLE ? 'mb-2' : '',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
    }
  }
  return (
    <div
      className={cn(
        'inline-block w-full overflow-hidden border-neutral-200 border-b',
        getClassName(),
        nextComponent === null ? 'mb-0' : '',
        prevComponent === null ? 'mt-0' : '',
      )}
      datatype={component.type}
      ref={parent}
    >
      <div
        className={cn(
          'flex cursor-pointer items-center justify-between px-[.5rem]',
        )}
        onClick={() => setShowChild(!showChild)}
      >
        <div className={'body-m'}>
          <TextRenderer richTextArr={component.content.rich_text} />
        </div>
        <FiChevronDown
          className={`size-4 transition-all ${showChild ? 'rotate-180' : ''}`}
        />
      </div>
      {isRenderChildren && showChild && !!component.children?.length && (
        <div className="mt-2 ml-4">
          {component.children?.map(childRenderCallback(component))}
        </div>
      )}
    </div>
  )
}

export default ToggleRenderer
