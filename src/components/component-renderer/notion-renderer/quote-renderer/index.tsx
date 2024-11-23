import { usePageType } from '@/store/learn'
import { cn } from '@hackquest/ui/lib/utils'
import type React from 'react'
import { childRenderCallback } from '../..'
import type { ComponentRendererProp } from '../../constants/type'
import TextRenderer from '../text-renderer'

type QuoteRendererProp = ComponentRendererProp

const QuoteRenderer: React.FC<QuoteRendererProp> = ({
  component,
  nextComponent,
  prevComponent,
}) => {
  const pageType = usePageType()
  const getClassName = () => {
    switch (pageType) {
      default:
        return `border-neutral-500 text-neutral-500 caption-14pt pl-1 border-l-[3px] my-2`
    }
  }
  return (
    <div
      datatype={component.type}
      className={cn(
        '',
        getClassName(),
        nextComponent === null ? 'mb-0' : '',
        prevComponent === null ? 'mt-0' : '',
      )}
    >
      {<TextRenderer richTextArr={component.content.rich_text} />}
      {component.children?.map(childRenderCallback(component))}
    </div>
  )
}

export default QuoteRenderer
