import { usePageType } from '@/store/learn'
import { cn } from '@hackquest/ui/lib/utils'
import type React from 'react'
import { childRenderCallback } from '../..'
import { HEADING_TYPES } from '../../constants/data'
import type { ComponentRendererProp } from '../../constants/type'

type ColumnListRendererProp = ComponentRendererProp

const ColumnListRenderer: React.FC<ColumnListRendererProp> = ({
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
        'body-s flex justify-between gap-8 rounded-[5px] text-neutral-800',
        getClassName(),
        nextComponent === null ? 'mb-0' : '',
        prevComponent === null ? 'mt-0' : '',
      )}
    >
      {component.children?.map(child => {
        return (
          <div key={child.id} className={cn('w-full')}>
            {child.children?.map(childRenderCallback(child))}
          </div>
        )
      })}
    </div>
  )
}

export default ColumnListRenderer
