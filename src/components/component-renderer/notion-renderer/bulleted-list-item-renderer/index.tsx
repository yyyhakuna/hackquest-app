
import { usePageType } from '@/store/learn'
import { cn } from '@hackquest/ui/lib/utils'
import type React from 'react'
import { childRenderCallback } from '../..'
import {
  type ComponentRendererProp,
  NotionComponentType,
} from '../../constants/type'
import TextRenderer from '../text-renderer'

type BulletedListItemRendererProp = ComponentRendererProp

const BulletedListItemRenderer: React.FC<BulletedListItemRendererProp> = ({
  component,
  nextComponent,
  prevComponent,
}) => {
  const pageType = usePageType()
  const getClassName = () => {
    switch (pageType) {
      default:
        return cn(
          `body-l`,
          prevComponent?.type !== NotionComponentType.BULLETED_LIST_ITEM
            ? 'mt-4'
            : '',
          nextComponent?.type !== NotionComponentType.BULLETED_LIST_ITEM
            ? 'mb-4'
            : '',
        )
    }
  }
  return (
    <div
      datatype={component.type}
      className={cn(
        'inline-block w-full text-neutral-800',
        getClassName(),
        nextComponent === null ? 'mb-0' : '',
        prevComponent === null ? 'mt-0' : '',
      )}
    >
      <div className={cn('flex')}>
        <span className="pr-2">●</span>
        <span>
          <TextRenderer richTextArr={component.content.rich_text} />
        </span>
      </div>
      <div className="my-2 ml-4">
        {component.children?.map(childRenderCallback(component))}
      </div>
    </div>
  )
}

export default BulletedListItemRenderer
