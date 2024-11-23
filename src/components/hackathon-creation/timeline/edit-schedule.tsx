import { FormDatePicker } from '@/components/common/form-date-picker'
import { FormEditor } from '@/components/common/form-editor'
import { FormInput } from '@/components/common/form-input'
import type {
  HackathonSchedule,
  HackathonScheduleType,
} from '@/graphql/generated/graphql'
import {
  useCreateHackathonScheduleMutation,
  useUpdateHackathonScheduleMutation,
} from '@/graphql/generated/hooks'
import { useHackathonId } from '@/hooks/hackathon/query'
import { Button } from '@hackquest/ui/shared/button'
import { Form } from '@hackquest/ui/shared/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'
import { dateToUTC, getScheduleTitle, timelineDateFormat } from './utils'

const formSchema = z
  .object({
    eventName: z.string().min(1),
    openTime: z.string().min(1),
    closeTime: z.string().min(1),
    eventURL: z.string().url().or(z.literal('')),
    description: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // open time must be before close time
    if (
      data.openTime &&
      data.closeTime &&
      new Date(data.openTime) > new Date(data.closeTime)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Close time must be after open time',
        path: ['closeTime'],
      })
    }
  })

type FormValues = z.infer<typeof formSchema>

export function EditSchedule({
  type,
  initialValues,
  onCancel,
}: {
  type: HackathonScheduleType
  initialValues: HackathonSchedule | null
  onCancel: () => void
}) {
  const hackathonId = useHackathonId()
  const formContext = useFormContext()

  const timezone = formContext.watch('timeZone')

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: initialValues?.eventName ?? '',
      openTime: initialValues?.openTime
        ? timelineDateFormat(initialValues?.openTime)
        : '',
      closeTime: initialValues?.closeTime
        ? timelineDateFormat(initialValues?.closeTime)
        : '',
      eventURL: initialValues?.eventURL ?? '',
      description: initialValues?.description ?? '',
    },
  })

  const create = useCreateHackathonScheduleMutation({
    meta: {
      invalidates: [['FindUniqueHackathon']],
    },
    onSuccess: () => {
      toast.success('Schedule created')
      refresh()
    },
    onError: (error: string) => {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error(error)
    },
  })

  const update = useUpdateHackathonScheduleMutation({
    meta: {
      invalidates: [['FindUniqueHackathon']],
    },
    onSuccess: () => {
      toast.success('Schedule updated')
      refresh()
    },
    onError: (error: string) => {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error(error)
    },
  })

  function refresh() {
    onCancel()
    form.reset()
  }

  function onValid(data: FormValues) {
    if (initialValues !== null) {
      update.mutate({
        scheduleId: initialValues.id,
        data: {
          eventName: { set: data.eventName },
          openTime: { set: dateToUTC(data.openTime, timezone) },
          closeTime: { set: dateToUTC(data.closeTime, timezone) },
          eventURL: { set: data.eventURL },
          description: { set: data.description },
          type,
        },
      })
    } else {
      create.mutate({
        hackathonId,
        data: {
          ...data,
          type,
          openTime: dateToUTC(data.openTime, timezone),
          closeTime: dateToUTC(data.closeTime, timezone),
        },
      })
    }
  }

  const fullPending = create.isPending || update.isPending

  return (
    <Form {...form}>
      <div className="space-y-4 rounded-xl border border-neutral-300 bg-neutral-50 p-4">
        <div className="flex items-center justify-between">
          <h3 className="headline-l">
            Schedule After {getScheduleTitle(type)}
          </h3>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              size="small"
              loading={fullPending}
              onClick={form.handleSubmit(onValid)}
            >
              Confirm
            </Button>
            <Button
              variant="outline"
              color="neutral"
              size="small"
              onClick={() => {
                onCancel()
                form.reset()
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
        <FormInput
          control={form.control}
          name="eventName"
          label="Event Name"
          requiredSymbol
          maxLength={80}
        />
        <div className="flex justify-between gap-6">
          <FormDatePicker
            control={form.control}
            name="openTime"
            label={`Event Open After ${getScheduleTitle(type)}`}
            requiredSymbol
          />
          <FormDatePicker
            control={form.control}
            name="closeTime"
            label={`Event Close After ${getScheduleTitle(type)}`}
            requiredSymbol
          />
        </div>
        <FormInput
          control={form.control}
          name="eventURL"
          placeholder="Enter the event address"
          label="Event URL (start with https:// or http://)"
        />
        <FormEditor
          control={form.control}
          name="description"
          label="Description"
          output="html"
          placeholder="Enter the event description"
          error={Boolean(form.formState.errors.description)}
        />
      </div>
    </Form>
  )
}
