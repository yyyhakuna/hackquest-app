import { useGlobalRendererContext } from '@/hooks/use-component-renderer'
import { cn } from '@hackquest/ui/lib/utils'
import type { FC } from 'react'
import { childRenderCallback } from '../../component-renderer'
import { type CustomComponent, PageType } from '../../type'
import TextRenderer from '../text-renderer'
import type { NotionComponent } from '../type'

interface QuoteRendererProps {
  prevComponent: NotionComponent | CustomComponent | null
  nextComponent: NotionComponent | CustomComponent | null
  position: number
  component: NotionComponent
  parent: NotionComponent | CustomComponent
  isFullscreen?: boolean
}

const QuoteRenderer: FC<QuoteRendererProps> = props => {
  const { component, nextComponent, prevComponent } = props
  const { pageType, isMobile } = useGlobalRendererContext()

  const getMobileClassName = () => {
    switch (pageType) {
      // case PageType.PGC:
      //   return `border-neutral-rich-gray text-neutral-rich-gray caption-14pt pl-[5px] border-l-[5px] my-[5px]`
      // case PageType.UGC:
      //   return `border-neutral-rich-gray text-neutral-rich-gray caption-16pt pl-[5px] border-l-[5px] my-[5px]`
      // case PageType.MINI:
      //   return `border-neutral-rich-gray text-neutral-rich-gray caption-14pt pl-[5px] border-l-[5px] my-[5px]`
      default:
        return cn(
          'border-neutral-200 pl-[10px] text-neutral-200 body-m border-l-[3px] my-[14px]',
        )
    }
  }

  const getWebClassName = () => {
    switch (pageType) {
      // case PageType.PGC:
      //   return `border-neutral-rich-gray text-neutral-rich-gray caption-14pt pl-[5px] border-l-[3px] my-2`
      // case PageType.UGC:
      //   return `border-neutral-rich-gray text-neutral-rich-gray caption-18pt pl-[5px] border-l-[3px] my-2`
      // case PageType.MINI:
      //   return `border-neutral-rich-gray text-neutral-rich-gray caption-14pt pl-[5px] border-l-[3px] my-2`
      case PageType.GLOSSARY:
      case PageType.BLOG:
        return cn(
          `border-neutral-500 pl-[10px] text-neutral-500  body-m border-l-[5px] my-[1.125rem]`,
        )
    }
  }

  return (
    <>
      <div
        datatype={component.type}
        className={cn(
          '',
          isMobile ? getMobileClassName() : getWebClassName(),
          nextComponent === null ? 'mb-0' : '',
          prevComponent === null ? 'mt-0' : '',
        )}
      >
        {<TextRenderer richTextArr={component.content.rich_text} />}
        {component.children?.map(childRenderCallback(component))}
      </div>
    </>
  )
}

export default QuoteRenderer
