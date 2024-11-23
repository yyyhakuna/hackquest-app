import { useGlobalRendererContext } from '@/hooks/use-component-renderer'
import { getYoutubeId } from '@/lib/utils'
import { cn } from '@hackquest/ui/lib/utils'
import type { FC } from 'react'
import YouTube from 'react-youtube'
import { type CustomComponent, PageType } from '../../type'
import { HEADING_TYPES } from '../header-renderer'
import type { NotionComponent } from '../type'

interface VideoRendererProps {
  prevComponent: NotionComponent | CustomComponent | null
  nextComponent: NotionComponent | CustomComponent | null
  position: number
  component: NotionComponent
  parent: any
}

const VideoRenderer: FC<VideoRendererProps> = props => {
  const { component, nextComponent, prevComponent } = props
  const { pageType, isMobile } = useGlobalRendererContext()
  const videoUrl =
    component.content.file?.url || component.content.external?.url

  const getClassName = () => {
    switch (pageType) {
      case PageType.PGC:
        return cn(
          'my-2 body-s',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
      case PageType.UGC:
        return cn(
          'mt-2 mb-1 body-l',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
      case PageType.MINI:
        return cn(
          'mt-2 mb-1 body-l',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
      default:
        return 'body-m mt-[1.125rem] mb-1'
    }
  }

  const isYoutubeUrl =
    videoUrl.includes('youtube') || videoUrl.includes('youtu.be')

  const renderVideo = () => {
    if (isYoutubeUrl) {
      return (
        <YouTube
          videoId={getYoutubeId(videoUrl)}
          loading="lazy"
          iframeClassName="w-full"
        />
      )
    } else {
      return (
        // biome-ignore lint/a11y/useMediaCaption: <explanation>
        <video controls className={`w-full`}>
          <source src={videoUrl} />
        </video>
      )
    }
  }

  return (
    <div
      datatype={component.type}
      className={cn(
        'inline-block w-full',
        getClassName(),
        nextComponent === null ? 'mb-0' : '',
        prevComponent === null ? 'mt-0' : '',
      )}
    >
      {renderVideo()}
    </div>
  )
}

export default VideoRenderer
