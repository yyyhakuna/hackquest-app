import { usePageType } from '@/store/learn'
import { cn } from '@hackquest/ui/lib/utils'
import type React from 'react'
import { useMemo } from 'react'
import { childRenderCallback } from '../..'
import { HEADING_TYPES } from '../../constants/data'
import {
  type ComponentRendererProp,
  NotionComponentType,
} from '../../constants/type'
import TextRenderer from '../text-renderer'

type NumberListItemRendererProp = ComponentRendererProp

const NumberListItemRenderer: React.FC<NumberListItemRendererProp> = ({
  component,
  parent,
  nextComponent,
  prevComponent,
  position = 0,
}) => {
  const children = parent?.isRoot ? parent.content : parent.children
  const pageType = usePageType()
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
  const getClassName = () => {
    switch (pageType) {
      default:
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
    }
  }
  return (
    <div
      datatype={component.type}
      className={cn(
        'inline-block w-full text-neutral-black',
        getClassName(),
        nextComponent === null ? 'mb-0' : '',
        prevComponent === null ? 'mt-0' : '',
      )}
    >
      <div className={cn('flex items-center')}>
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
