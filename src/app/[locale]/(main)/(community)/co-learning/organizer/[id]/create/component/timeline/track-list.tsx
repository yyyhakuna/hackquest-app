'use client'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Button } from '@hackquest/ui/shared/button'
import { LuArrowRight } from 'react-icons/lu'
import { useColearningContext } from '../common/creation-provider'
import { EditTimeline } from './edit-timeline'
import PreviewTrack from './preview-track'
import { useTimelineContext } from './timeline-context'

export function TrackList() {
  const { data } = useColearningContext()

  const context = useTimelineContext()

  const [parent] = useAutoAnimate()

  function onCreate() {
    context.setCreating(prev => prev + 1)
  }

  return (
    <div className="mt-8 space-y-4" ref={parent}>
      {Array(context.creating)
        .fill(0)
        .map((_v, i) => (
          <EditTimeline key={i} />
        ))}
      {data?.events?.map(event =>
        context.editing?.includes(event.id) ? (
          <EditTimeline key={event.id} event={event} />
        ) : (
          <PreviewTrack key={event.id} event={event} />
        ),
      )}

      <Button className=" w-full" onClick={onCreate}>
        Add Event <LuArrowRight />
      </Button>
    </div>
  )
}
