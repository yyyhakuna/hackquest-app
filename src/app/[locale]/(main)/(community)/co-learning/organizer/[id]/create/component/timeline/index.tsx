import { FormCombobox } from '@/components/common/form-combobox'
import { useUpdateCoLearningMutation } from '@/graphql/generated/hooks'
import dayjs from '@/lib/dayjs'
import timezones from '@/public/data/timezone.json'
import { Form } from '@hackquest/ui/shared/form'
import { Separator } from '@hackquest/ui/shared/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'
import ContinueButton from '../common/continue-button'
import { useColearningContext } from '../common/creation-provider'
import { TimelineProvider } from './timeline-context'
import { TrackList } from './track-list'

const formSchema = z.object({ timezone: z.string().min(1) })

export type FormValue = z.infer<typeof formSchema>

const Timeline = () => {
  const { setSelectedTab, data } = useColearningContext()
  const id = useParams().id as string
  const getNewProgress = () => {
    if (data.progress?.includes('timeline')) return data.progress
    return [...(data?.progress ?? []), 'timeline']
  }

  const startTime = data?.events
    ?.map(obj => dayjs(obj.startTime))
    .sort((a, b) => a.valueOf() - b.valueOf())[0]

  const endTime = data?.events
    ?.map(obj => dayjs(obj.endTime))
    .sort((a, b) => b.valueOf() - a.valueOf())[0]

  const getQuery = (timezone: string) => {
    if (data.timeline) {
      return {
        id,
        data: {
          progress: {
            set: getNewProgress(),
          },
          timeline: {
            update: {
              data: {
                timezone: { set: timezone },
                startTime: { set: startTime },
                endTime: { set: endTime },
              },
            },
          },
        },
      }
    } else {
      return {
        id,
        data: {
          progress: {
            set: getNewProgress(),
          },
          timeline: {
            create: { timezone, startTime, endTime },
          },
        },
      }
    }
  }
  const timezoneOptions = React.useMemo(() => {
    return timezones.map(timezone => ({
      value: timezone,
      label: timezone,
    }))
  }, [])
  const { mutateAsync } = useUpdateCoLearningMutation()

  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      timezone: data?.timeline?.timezone ?? '',
    },
  })

  const onContinue = async (d: FormValue) => {
    await toast.promise(mutateAsync(getQuery(d.timezone)), {
      loading: 'Loading',
      success: 'Update success',
      error: 'update Error',
    })
    setSelectedTab('application')
  }

  const [editing, setEditing] = useState<string[]>([])
  const [creating, setCreating] = useState<number>(0)
  return (
    <TimelineProvider value={{ creating, editing, setEditing, setCreating }}>
      <Form {...form}>
        <FormCombobox
          control={form.control}
          name="timezone"
          label="Timezone"
          // loading={timezoneLoading}
          requiredSymbol
          placeholder="Select timezone"
          options={timezoneOptions}
        />
        <TrackList />
        <Separator className="my-6" />

        <ContinueButton onContinue={form.handleSubmit(onContinue)} />
      </Form>
    </TimelineProvider>
  )
}

export default Timeline
