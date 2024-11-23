import { usePageType } from '@/store/learn'
import { cn } from '@hackquest/ui/lib/utils'
import type React from 'react'
import { childRenderCallback } from '../..'
import { HEADING_TYPES } from '../../constants/data'
import type { ComponentRendererProp } from '../../constants/type'
import TextRenderer from '../text-renderer'

type ParagraphRendererProp = ComponentRendererProp

const ParagraphRenderer: React.FC<ParagraphRendererProp> = ({
  component,
  nextComponent,
  prevComponent,
}) => {
  const pageType = usePageType()
  const getClassName = () => {
    switch (pageType) {
      default:
        return cn(
          'my-2 body-m',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
    }
  }
  return (
    <div
      className={cn(
        'inline-block w-full text-neutral-800',
        getClassName(),
        nextComponent === null ? 'mb-0' : '',
        prevComponent === null ? 'mt-0' : '',
      )}
      datatype={component.type}
    >
      <TextRenderer richTextArr={component.content.rich_text} />
      {!!component.children?.length && (
        <div className="my-2 ml-4">
          {component.children?.map(childRenderCallback(component))}
        </div>
      )}
    </div>
  )
}

export default ParagraphRenderer
