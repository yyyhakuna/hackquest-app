import { usePageType } from '@/store/learn'
import { cn } from '@hackquest/ui/lib/utils'
import type React from 'react'
import { childRenderCallback } from '../..'
import {
  type ComponentRendererProp,
  NotionComponentType,
} from '../../constants/type'
import TextRenderer from '../text-renderer'

type HeaderRendererProp = ComponentRendererProp

const HeaderRenderer: React.FC<HeaderRendererProp> = ({
  component,
  isRenderChildren = true,
  nextComponent,
  prevComponent,
}) => {
  const pageType = usePageType()
  const type = component.type
  const HeadingTag = ('h' + type.slice(-1)) as keyof JSX.IntrinsicElements
  const getClassName = () => {
    switch (pageType) {
      default:
        return cn(
          'my-4',
          type === NotionComponentType.H1 ? 'title-2' : '',
          type === NotionComponentType.H2 ? 'title-3' : '',
          type === NotionComponentType.H3 ? 'title-4' : '',
          type === NotionComponentType.H4 ? 'title-5' : '',
        )
    }
  }
  return (
    <div
      className={cn(
        nextComponent === null ? 'mb-0' : '',
        prevComponent === null ? 'mt-0' : '',
      )}
      datatype={type}
    >
      <HeadingTag className={cn(`flex items-center justify-between`)}>
        <div
          className={cn(
            'inline-block h-auto w-full text-neutral-800',
            getClassName(),
            nextComponent === null ? 'mb-0' : '',
            prevComponent === null ? 'mt-0' : '',
          )}
        >
          <span>
            <TextRenderer richTextArr={component.content.rich_text} />
          </span>
        </div>
      </HeadingTag>
      {isRenderChildren && !!component.children?.length && (
        <div className="my-2 ml-5">
          {isRenderChildren &&
            component.children?.map(childRenderCallback(component))}
        </div>
      )}
    </div>
  )
}

export default HeaderRenderer
