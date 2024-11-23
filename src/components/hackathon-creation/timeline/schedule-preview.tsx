import { Link } from '@/app/navigation'
import { DeleteAlertDialog } from '@/components/common/delete-alert-dialog'
import type { HackathonSchedule } from '@/graphql/generated/graphql'
import { useDeleteHackathonScheduleMutation } from '@/graphql/generated/hooks'
import { useToggle } from '@/hooks/utils/use-toggle'
import dayjs from '@/lib/dayjs'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiEdit } from 'react-icons/fi'
import { LuTrash } from 'react-icons/lu'

export function SchedulePreview({
  schedule,
  onEdit,
}: {
  schedule: HackathonSchedule
  onEdit: () => void
}) {
  const [open, onOpenChange] = useToggle(false)
  const formContext = useFormContext()

  const _timezone = formContext.watch('timeZone')

  const remove = useDeleteHackathonScheduleMutation({
    meta: {
      invalidates: [['FindUniqueHackathon']],
    },
    onSuccess: () => {
      toast.success('Timeline schedule deleted')
      onOpenChange(false)
    },
  })

  return (
    <div className="space-y-4 rounded-xl border border-neutral-300 bg-neutral-50 p-4">
      <div className="flex items-center justify-between">
        <h3 className="headline-l">{schedule.eventName}</h3>
        <div className="flex items-center gap-4">
          <button type="button" className="outline-none" onClick={onEdit}>
            <FiEdit className="size-5" />
          </button>
          <button
            type="button"
            className="outline-none"
            onClick={() => onOpenChange(true)}
          >
            <LuTrash className="size-5" />
          </button>
        </div>
      </div>
      <p className="body-s">
        {dayjs(schedule.openTime).format('MMM D, YYYY HH:mm')} -{' '}
        {dayjs(schedule.closeTime).format('MMM D, YYYY HH:mm')}
      </p>
      {schedule.eventURL && (
        <div className="body-s space-y-1">
          <p className="text-neutral-400">Event URL</p>
          <Link
            target="_blank"
            rel="noreferrer"
            href={schedule.eventURL}
            className="line-clamp-1"
          >
            {encodeURI(schedule.eventURL)}
          </Link>
        </div>
      )}
      {schedule.description && (
        <div className="body-s space-y-1">
          <p className="text-neutral-400">Description</p>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: schedule.description }}
          />
        </div>
      )}
      <DeleteAlertDialog
        open={open}
        onOpenChange={onOpenChange}
        title="Delete Timeline Schedule"
        loading={remove.isPending}
        description="Are you sure you want to delete this timeline schedule? This action cannot be undone."
        onConfirm={() => remove.mutate({ scheduleId: schedule.id })}
      />
    </div>
  )
}
