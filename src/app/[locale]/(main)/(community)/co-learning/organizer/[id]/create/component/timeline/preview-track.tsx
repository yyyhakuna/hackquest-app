import {
  type CoLearningEvent,
  useUpdateCoLearningMutation,
} from '@/graphql/generated/hooks'
import dayjs from '@/lib/dayjs'
import { Button } from '@hackquest/ui/shared/button'
import { Separator } from '@hackquest/ui/shared/separator'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { FiEdit } from 'react-icons/fi'
import { LuTrash } from 'react-icons/lu'
import { LuVideo } from 'react-icons/lu'
import { useColearningContext } from '../common/creation-provider'
import { useTimelineContext } from './timeline-context'

const PreviewTrack = ({ event }: { event: CoLearningEvent }) => {
  const context = useTimelineContext()
  const coLearningId = useParams().id as string
  const onEdit = () => {
    context.setEditing([...context.editing, event.id])
  }
  const { mutateAsync } = useUpdateCoLearningMutation()
  const onDelete = () => {
    toast.promise(
      mutateAsync({
        id: coLearningId,
        data: {
          events: {
            delete: [
              {
                id: event.id,
              },
            ],
          },
        },
      }),
      {
        loading: 'Loading',
        success: 'Delete success',
        error: 'Delete error',
      },
    )
  }
  const { data } = useColearningContext()
  const day = dayjs(event.startTime).format('MMM DD')
  const startHour = dayjs(event.startTime).format('h:mm A')
  const endHour = dayjs(event.endTime).format('h:mm A')
  const eventNum = `event${data?.events!.findIndex(e => e.id === event.id) + 1}`

  return (
    <div className="rounded-lg border border-neutral-300 bg-neutral-100 p-4">
      <div className="space-y-4">
        <div className="flex justify-between ">
          <span>{eventNum}</span>
          <div className="flex items-center gap-4">
            <button onClick={onEdit}>
              <FiEdit className="size-6" />
            </button>
            <button onClick={onDelete}>
              <LuTrash className="size-6" />
            </button>
          </div>
        </div>
        <div className="flex h-[178px] shrink-0 gap-4 rounded-lg border border-neutral-200 bg-neutral-white p-4">
          <div className="w-[60px] shrink-0 py-3 ">{day}</div>
          <Separator orientation="vertical" className="" />
          <div className="flex w-full justify-between py-3">
            <div className="flex shrink-0 flex-col gap-2">
              <span className="headline-m text-primary-neutral">
                {event.title}
              </span>
              <span className="body-s text-primary-neutral">
                {startHour} - {endHour}
              </span>
              <Button size="small" className="w-[114px]">
                Join Meeting <LuVideo className="h-4 w-4" />
              </Button>
            </div>

            <div
              className="max-w-[340px] truncate [&_p:first-child]:h-[120px]"
              dangerouslySetInnerHTML={{
                __html: event?.description ?? '',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewTrack
