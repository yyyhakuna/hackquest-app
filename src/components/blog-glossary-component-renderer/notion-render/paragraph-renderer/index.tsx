import { useGlobalRendererContext } from '@/hooks/use-component-renderer'
import { cn } from '@hackquest/ui/lib/utils'
import type { FC } from 'react'
import { childRenderCallback } from '../../component-renderer'
import { type CustomComponent, PageType } from '../../type'
import { HEADING_TYPES } from '../header-renderer'
import TextRenderer from '../text-renderer'
import type { NotionComponent } from '../type'

interface ParagraphRendererProps {
  prevComponent: NotionComponent | CustomComponent | null
  nextComponent: NotionComponent | CustomComponent | null
  component: NotionComponent
  isRenderChildren?: boolean
  parent: any
}

const ParagraphRenderer: FC<ParagraphRendererProps> = props => {
  const {
    component,
    isRenderChildren = true,
    nextComponent,
    prevComponent,
  } = props

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
          'my-[5px] body-m',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
      case PageType.MINI:
        return cn(
          'my-[5px] body-m',
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

  return (
    <p
      className={cn(
        'inline-block w-full text-neutral-800',
        isMobile ? getMobileClassName() : getWebClassName(),
        nextComponent === null ? 'mb-0' : '',
        prevComponent === null ? 'mt-0' : '',
      )}
      datatype={component.type}
    >
      <TextRenderer richTextArr={component.content.rich_text} />
      {!!component.children?.length && (
        <div className="my-2 ml-5">
          {component.children?.map(childRenderCallback(component))}
        </div>
      )}
    </p>
  )
}

export default ParagraphRenderer
