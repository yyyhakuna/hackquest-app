import { usePageType } from '@/store/learn'
import { cn } from '@hackquest/ui/lib/utils'
import type React from 'react'
import { HEADING_TYPES } from '../../constants/data'
import type { ComponentRendererProp } from '../../constants/type'

type DividerRendererProp = ComponentRendererProp

const DividerRenderer: React.FC<DividerRendererProp> = ({
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
        'body-s rounded-[5px] py-[4px] text-neutral-800',
        getClassName(),
        nextComponent === null ? 'mb-0' : '',
        prevComponent === null ? 'mt-0' : '',
      )}
    >
      <hr className="border-neutral-500" />
    </div>
  )
}

export default DividerRenderer
