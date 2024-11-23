import { useGlobalRendererContext } from '@/hooks/use-component-renderer'
import { cn } from '@hackquest/ui/lib/utils'
import { type FC, useMemo } from 'react'
import { childRenderCallback } from '../../component-renderer'
import { type CustomComponent, PageType } from '../../type'
import { HEADING_TYPES } from '../header-renderer'
import TextRenderer from '../text-renderer'
import { type NotionComponent, NotionComponentType } from '../type'

interface NumberListItemRendererProps {
  prevComponent: NotionComponent | CustomComponent | null
  nextComponent: NotionComponent | CustomComponent | null
  component: NotionComponent | CustomComponent
  parent: any
  position?: number
}

const NumberListItemRenderer: FC<NumberListItemRendererProps> = props => {
  const {
    component,
    parent,
    nextComponent,
    prevComponent,
    position = 0,
  } = props
  const children = parent?.isRoot ? parent.content : parent.children
  const { pageType, isMobile } = useGlobalRendererContext()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const index = useMemo(() => {
    if (children) {
      const currentIndex = children?.findIndex(
        (child: any) => child.id === component.id,
      )
      let firstIndex = 0
      for (let i = currentIndex; i >= 0; i--) {
        if (children[i].type !== NotionComponentType.NUMBERED_LIST_ITEM) {
          break
        }
        firstIndex = i
      }
      return currentIndex - firstIndex
    }
    return position || 0
  }, [children, component])

  const getMobileClassName = () => {
    switch (pageType) {
      case PageType.PGC:
        return cn(
          'body-s',
          prevComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM
            ? 'mt-[5px]'
            : '',
          nextComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM
            ? 'mb-[5px]'
            : '',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
      case PageType.UGC:
        return cn(
          'body-m',
          prevComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM
            ? 'mt-[5px]'
            : '',
          nextComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM
            ? 'mb-[5px]'
            : '',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
      default:
        return cn(
          `body-m`,
          prevComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM
            ? 'mt-[14px]'
            : '',
          nextComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM
            ? 'mb-[14px]'
            : '',
        )
    }
  }

  const getWebClassName = () => {
    switch (pageType) {
      case PageType.PGC:
        return cn(
          'body-s',
          prevComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM
            ? 'mt-2'
            : '',
          nextComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM
            ? 'mb-2'
            : '',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
      case PageType.UGC:
        return cn(
          'body-l',
          prevComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM
            ? 'mt-2'
            : '',
          nextComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM
            ? 'mb-2'
            : '',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
      case PageType.DOCUMENTATION:
        return cn(
          'body-xs',
          prevComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM
            ? 'mt-1'
            : '',
          nextComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM
            ? 'mb-1'
            : '',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
      case PageType.DOCUMENTATION_FULL:
        return cn(
          'body-s',
          prevComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM
            ? 'mt-1'
            : '',
          nextComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM
            ? 'mb-1'
            : '',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
      default:
        return cn(
          `body-m`,
          prevComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM
            ? 'mt-[18px]'
            : '',
          nextComponent?.type !== NotionComponentType.NUMBERED_LIST_ITEM
            ? 'mb-[18px]'
            : '',
        )
    }
  }

  return (
    <div
      datatype={component.type}
      className={cn(
        'inline-block w-full text-neutral-800',
        isMobile ? getMobileClassName() : getWebClassName(),
        nextComponent === null ? 'mb-0' : '',
        prevComponent === null ? 'mt-0' : '',
      )}
    >
      <div
        className={cn('flex', pageType !== PageType.UGC ? 'items-center' : '')}
      >
        <span className="inline-flex h-full w-fit pr-2">{index + 1}.</span>
        <span>
          <TextRenderer richTextArr={component.content.rich_text} />
        </span>
      </div>
      <div className="my-2 ml-5">
        {component.children?.map(childRenderCallback(component))}
      </div>
    </div>
  )
}

export default NumberListItemRenderer
