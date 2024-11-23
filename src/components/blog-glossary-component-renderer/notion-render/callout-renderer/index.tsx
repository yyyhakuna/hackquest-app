'use client'

import { useGlobalRendererContext } from '@/hooks/use-component-renderer'
import { cn } from '@hackquest/ui/lib/utils'
import { type FC, useState } from 'react'
import { childRenderCallback } from '../../component-renderer'
import { type CustomComponent, PageType } from '../../type'
import { HEADING_TYPES } from '../header-renderer'
import TextRenderer from '../text-renderer'
import type { NotionComponent } from '../type'

interface CalloutRendererProps {
  prevComponent: NotionComponent | CustomComponent | null
  nextComponent: NotionComponent | CustomComponent | null
  position: number
  component: NotionComponent
  parent: any
}

const CalloutRenderer: FC<CalloutRendererProps> = props => {
  const { component, parent, nextComponent, prevComponent } = props
  const [visible, _setVisible] = useState(true)

  const { pageType, isMobile } = useGlobalRendererContext()

  const getMobileClassName = () => {
    switch (pageType) {
      case PageType.PGC:
        return cn(
          'my-[5px] body-s',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
      case PageType.UGC:
        return cn(
          'my-2 body-m',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
      case PageType.MINI:
        return cn(
          'my-2 body-m',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
      case PageType.DOCUMENTATION:
        return cn(
          'my-1 body-xs',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
      case PageType.DOCUMENTATION_FULL:
        return cn(
          'my-2 body-s',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
      default:
        return `body-m my-[14px]`
    }
  }

  const getWebClassName = () => {
    switch (pageType) {
      case PageType.PGC:
        return cn(
          'my-2 body-s',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
      case PageType.UGC:
        return cn(
          'my-2 body-l',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
      case PageType.MINI:
        return cn(
          'my-2 body-l',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
      case PageType.DOCUMENTATION:
        return cn(
          'my-2 body-xs',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
      case PageType.DOCUMENTATION_FULL:
        return cn(
          'my-2 body-s',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
      default:
        return 'body-m my-[18px]'
    }
  }

  if (!visible) return null

  return (
    <div
      datatype={component.type}
      className={cn(
        'body-s rounded-[5px] border border-[#FF624D] border-solid bg-[#FFF7F5] p-[15px] text-neutral-400',
        isMobile ? getMobileClassName() : getWebClassName(),
        nextComponent === null ? 'mb-0' : '',
        prevComponent === null ? 'mt-0' : '',
      )}
    >
      <div className="flex items-center justify-between gap-[15px]">
        <div className="text-[20px]">{component.content.icon?.emoji}</div>
        <div className="flex-1">
          <div
            className={cn(
              component.children?.length
                ? isMobile
                  ? 'mb-[5px]'
                  : 'mb-2'
                : '',
            )}
          >
            <TextRenderer richTextArr={component.content.rich_text} />
          </div>
          {component.children?.map(childRenderCallback(component))}
        </div>
      </div>
    </div>
  )
}

export default CalloutRenderer
