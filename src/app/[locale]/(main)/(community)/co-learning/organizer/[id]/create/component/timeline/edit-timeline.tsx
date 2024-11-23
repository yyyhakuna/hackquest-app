import { FormDatePicker } from '@/components/common/form-date-picker'
import { FormEditor } from '@/components/common/form-editor'
import { FormInput } from '@/components/common/form-input'
import {
  type CoLearningEvent,
  useUpdateCoLearningMutation,
} from '@/graphql/generated/hooks'
import dayjs from '@/lib/dayjs'
import { Button } from '@hackquest/ui/shared/button'
import { Form } from '@hackquest/ui/shared/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { useForm, } from 'react-hook-form'
import toast from 'react-hot-toast'
import { LuArrowRight } from 'react-icons/lu'
import * as z from 'zod'
import { useColearningContext } from '../common/creation-provider'
import { useTimelineContext } from './timeline-context'

const formSchema = z.object({
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  title: z.string().min(1),
  url: z.string().min(1),
  description: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function EditTimeline({ event }: { event?: CoLearningEvent }) {
  const context = useTimelineContext()
  const { data } = useColearningContext()
  const coLearningId = useParams().id as string
  function onCancel() {
    if (event) {
      context.setEditing(context.editing?.filter(iniId => event!.id !== iniId))
    } else context.setCreating(prev => prev - 1)
  }

  const { mutateAsync } = useUpdateCoLearningMutation()
  const createOrUpdateParam = (
    startTime: string,
    endTime: string,
    title: string,
    url: string,
    description: string,
  ) => {
    if (event) {
      return {
        id: coLearningId,
        data: {
          events: {
            update: [
              {
                data: {
                  title: { set: title },
                  url: { set: url },
                  description: { set: description },
                  endTime: { set: endTime },
                  startTime: { set: startTime },
                },
                where: {
                  id: event.id,
                },
              },
            ],
          },
        },
      }
    } else {
      return {
        id: coLearningId,
        data: {
          events: {
            create: [
              {
                title,
                description,
                url,
                startTime,
                endTime,
              },
            ],
          },
        },
      }
    }
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: event?.url ?? '',
      description: event?.description ?? '',
      startTime: dayjs(event?.startTime).format('YYYY-MM-DDTHH:mm') ?? '',
      endTime: dayjs(event?.endTime).format('YYYY-MM-DDTHH:mm') ?? '',
      title: event?.title ?? '',
    },
  })

  async function onValid(data: FormValues) {
    await toast.promise(
      mutateAsync(
        createOrUpdateParam(
          data?.startTime ?? '',
          data?.endTime ?? '',
          data.title,
          data.url,
          data.description ?? '',
        ),
      ),
      {
        loading: 'Loading',
        success: 'Update success',
        error: 'Failed to update',
      },
    )
    onCancel()
  }
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const addEventNum = useMemo(() => context.creating, [])
  const eventLable = `event${event ? (data?.events?.findIndex(e => e.id === event.id) ?? 0) + 1 : (data?.events?.length ?? 0) + addEventNum}`

  return (
    <Form {...form}>
      <div className="space-y-4 rounded-xl border border-neutral-300 bg-neutral-100 p-4">
        <div className="flex items-center justify-between">
          <h3 className="headline-l">{eventLable}</h3>
          <div className="flex items-center gap-2">
            <Button
              size="small"
              variant="outline"
              color="neutral"
              //   loading={fullPending}
              onClick={onCancel}
            >
              cancel
            </Button>
          </div>
        </div>
        <div className="flex w-full gap-4">
          <FormDatePicker
            control={form.control}
            name="startTime"
            label="start time"
            requiredSymbol={false}
            className="bg-white"
          />
          <FormDatePicker
            control={form.control}
            name="endTime"
            label="end time"
            requiredSymbol={false}
            className="bg-white"
          />
        </div>
        <FormInput
          control={form.control}
          name="title"
          placeholder={eventLable + ' Title'}
          className="bg-white"
          requiredSymbol
          label={eventLable + ' Title'}
          maxLength={80}
        />
        <FormInput
          control={form.control}
          name="url"
          className="bg-white"
          placeholder="Join Community Action URL"
          label="Learning URL"
        />
        <FormEditor
          control={form.control}
          name="description"
          requiredSymbol
          label="Description"
          className="bg-white"
          output="html"
          placeholder="Write a brief description for your hackathon"
          error={Boolean(form.formState.errors.description)}
        />
        <Button className="w-full" onClick={form.handleSubmit(onValid)}>
          Confirm <LuArrowRight />
        </Button>
      </div>
    </Form>
  )
}
