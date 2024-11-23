import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Button } from '@hackquest/ui/shared/button'
import type React from 'react'
import { useState } from 'react'
import { childRenderCallback } from '../..'
import type { CustomComponent } from '../../constants/type'

interface VideoRendererProp {
  component: CustomComponent
  parent: CustomComponent
}

const VideoRenderer: React.FC<VideoRendererProp> = ({ component }) => {
  const [showTranscript, setShowTranscript] = useState(false)
  const [parent] = useAutoAnimate()
  return (
    <div className="flex h-full w-full justify-center" ref={parent}>
      <div className="max-w-[64rem] flex-1">
        {component?.children?.map(childRenderCallback(component))}
        <div className="py-4">
          <Button
            variant={'outline'}
            color={'neutral'}
            onClick={() => setShowTranscript(!showTranscript)}
          >{`${showTranscript ? 'Hide' : 'Show'} transcript`}</Button>
        </div>
      </div>
    </div>
  )
}

export default VideoRenderer
