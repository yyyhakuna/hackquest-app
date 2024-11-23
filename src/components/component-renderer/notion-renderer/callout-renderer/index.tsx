import { usePageType } from '@/store/learn'
import { cn } from '@hackquest/ui/lib/utils'
import type React from 'react'
import { childRenderCallback } from '../..'
import { HEADING_TYPES } from '../../constants/data'
import type { ComponentRendererProp } from '../../constants/type'
import TextRenderer from '../text-renderer'

type CalloutRendererProp = ComponentRendererProp

const CalloutRenderer: React.FC<CalloutRendererProp> = ({
  component,
  nextComponent,
  prevComponent,
}) => {
  const pageType = usePageType()
  const getClassName = () => {
    switch (pageType) {
      default:
        return cn(
          'my-2 body-s',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
    }
  }
  return (
    <div
      datatype={component.type}
      className={cn(
        'body-s rounded-[5px] bg-tag-blue p-[15px] text-neutral-800',
        getClassName(),
        nextComponent === null ? 'mb-0' : '',
        prevComponent === null ? 'mt-0' : '',
      )}
    >
      <div className="flex items-center justify-between gap-[15px]">
        <div className="text-[20px]">{component.content.icon?.emoji}</div>
        <div className="flex-1">
          <div className={cn(component.children?.length ? 'mb-2' : '')}>
            <TextRenderer richTextArr={component.content.rich_text} />
          </div>
          {component.children?.map(childRenderCallback(component))}
        </div>
      </div>
    </div>
  )
}

export default CalloutRenderer
