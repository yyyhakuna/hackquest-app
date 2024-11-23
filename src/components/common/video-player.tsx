'use client'

import { cn } from '@hackquest/ui/lib/utils'
import type * as React from 'react'
import ReactPlayer from 'react-player/lazy'
import ClientOnly from './client-only'

export type VideoPlayerProps = React.ComponentProps<typeof ReactPlayer> & {
  className?: string
}

export function VideoPlayer({
  url,
  controls = true,
  className,
  ...props
}: VideoPlayerProps) {
  return (
    <div
      className={cn(
        'aspect-video w-full overflow-hidden rounded-xl',
        className,
      )}
    >
      <ClientOnly>
        <ReactPlayer
          url={url}
          controls={controls}
          {...props}
          width="100%"
          height="100%"
        />
      </ClientOnly>
    </div>
  )
}
