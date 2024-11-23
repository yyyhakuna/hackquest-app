import { getYoutubeId } from '@/lib/utils'
import { usePageType } from '@/store/learn'
import { cn } from '@hackquest/ui/lib/utils'
import type React from 'react'
import YouTube from 'react-youtube'
import { HEADING_TYPES } from '../../constants/data'
import type { ComponentRendererProp } from '../../constants/type'

type VideoRendererProp = ComponentRendererProp

const VideoRenderer: React.FC<VideoRendererProp> = ({
  component,
  nextComponent,
  prevComponent,
}) => {
  const pageType = usePageType()
  const videoUrl =
    component.content.file?.url || component.content.external?.url
  const isYoutubeUrl =
    videoUrl.includes('youtube') || videoUrl.includes('youtu.be')
  const getClassName = () => {
    switch (pageType) {
      default:
        return cn(
          'my-2 body-s',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
    }
  }
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
