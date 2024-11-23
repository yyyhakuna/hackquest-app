import { useGlobalRendererContext } from '@/hooks/use-component-renderer'
import { cn } from '@hackquest/ui/lib/utils'
import type { FC } from 'react'
import { type CustomComponent, PageType } from '../../type'
import { HEADING_TYPES } from '../header-renderer'
import type { NotionComponent } from '../type'

interface ImageRendererProps {
  prevComponent: NotionComponent | CustomComponent | null
  nextComponent: NotionComponent | CustomComponent | null
  position: number
  component: NotionComponent
  parent: any
}

const ImageRenderer: FC<ImageRendererProps> = props => {
  const { component, nextComponent, prevComponent } = props
  const content = component.content
  const { pageType, isMobile } = useGlobalRendererContext()

  const getMobileClassName = () => {
    switch (pageType) {
      case PageType.PGC:
        return cn(
          'body-s my-[5px]',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
      case PageType.UGC:
        return cn(
          'body-m my-[5px]',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
      default:
        return `body-s mt-[14px] -mb-1`
    }
  }

  const getWebClassName = () => {
    switch (pageType) {
      case PageType.PGC:
        return cn(
          'body-s my-2',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
      case PageType.UGC:
        return cn(
          'body-l my-2',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
      case PageType.HACKATHON:
        return cn(
          'body-l my-2 [&>div]:w-[15rem]',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
      default:
        return 'body-l mt-[18px] mb-1'
    }
  }

  // return <img src={block.external.url} alt={``} />;
  return (
    <div
      className={cn(
        'flex w-full justify-center [&>div]:w-full',
        isMobile ? getMobileClassName() : getWebClassName(),
        nextComponent === null ? 'mb-0' : '',
        prevComponent === null ? 'mt-0' : '',
      )}
      datatype={component.type}
    >
      {content.external && (
        <img
          src={content.external.url}
          alt={content.file?.url}
          // width={400}
          className={cn(`w-full`)}
        />
      )}
      {content.file && (
        <img
          src={content.file.url}
          alt={content.file.url}
          // width={400}
          className={`w-full`}
        />
      )}
    </div>
  )
}

export default ImageRenderer
