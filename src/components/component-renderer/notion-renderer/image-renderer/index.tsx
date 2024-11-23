import { usePageType } from '@/store/learn'
import { cn } from '@hackquest/ui/lib/utils'
import type React from 'react'
import { HEADING_TYPES } from '../../constants/data'
import type { ComponentRendererProp } from '../../constants/type'

type ImageRendererProp = ComponentRendererProp

const ImageRenderer: React.FC<ImageRendererProp> = ({
  component,
  nextComponent,
  prevComponent,
}) => {
  const content = component.content
  const pageType = usePageType()
  const getClassName = () => {
    switch (pageType) {
      default:
        return cn(
          'body-s my-2',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
    }
  }
  return (
    <div
      className={cn(
        'relative flex w-full justify-center',
        getClassName(),
        nextComponent === null ? 'mb-0' : '',
        prevComponent === null ? 'mt-0' : '',
      )}
      datatype={component.type}
    >
      {content.external && (
        <img
          src={content.external.url || ''}
          alt="img"
          className={cn(`w-full`)}
        />
      )}
      {content.file && (
        <img src={content.file.url || ''} alt="img" className={`w-full`} />
      )}
    </div>
  )
}

export default ImageRenderer
