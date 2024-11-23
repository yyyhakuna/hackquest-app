import { AnimatedContent } from '@/components/common/animated-content'
import { FormCombobox } from '@/components/common/form-combobox'
import { FormRadioCards } from '@/components/common/form-radio-cards'
import { HackathonScheduleType } from '@/graphql/generated/graphql'
import { useUpdateHackathon } from '@/hooks/hackathon/mutation'
import {
  useHackathonId,
  useHackathonQuery,
  useTimezone,
} from '@/hooks/hackathon/query'
import { useSetState } from '@/hooks/use-set-state'
import { useHackathonCreationContext } from '@/providers/hackathon/hackathon-creation-provider'
import timezones from '@/public/data/timezone.json'
import { Form } from '@hackquest/ui/shared/form'
import * as TimelinePrimitive from '@hackquest/ui/shared/timeline'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@hackquest/ui/shared/tooltip'
import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { useForm, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import { LuInfo } from 'react-icons/lu'
import * as z from 'zod'
import SectionButton from '../common/section-button'
import { type Ids, ScheduleProvider, defaultIds } from './schedule-context'
import { ScheduleSection } from './schedule-section'
import { dateToUTC, timelineDateFormat } from './utils'

const baseSchema = z.discriminatedUnion('openReviewSame', [
  z.object({
    openReviewSame: z.literal('true'),
  }),
  z.object({
    openReviewSame: z.literal('false'),
    registrationClose: z.string().min(1),
    submissionOpen: z.string().min(1),
  }),
])

const formSchema = z
  .object({
    timeZone: z.string().min(1),
    registrationOpen: z.string().min(1),
    submissionClose: z.string().min(1),
    rewardTime: z.string().min(1),
  })
  .and(baseSchema)
  .superRefine((data, ctx) => {
    if (data.openReviewSame === 'true') {
      // 1. registrationOpen must be before submissionClose
      // 2. submissionClose must be before rewardTime
      if (
        data.registrationOpen &&
        data.submissionClose &&
        new Date(data.registrationOpen) > new Date(data.submissionClose)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Submission open must be after registration open',
          path: ['submissionOpen'],
        })
      }
      if (
        data.submissionClose &&
        data.rewardTime &&
        new Date(data.submissionClose) > new Date(data.rewardTime)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Reward time must be after submission close',
          path: ['rewardTime'],
        })
      }
    } else {
      // 1. registrationOpen must be before registrationClose
      // 2. submissionOpen must be before submissionClose
      // 3. submissionClose must be before rewardTime
      // 4. registrationOpen must be before submissionOpen
      // 5. registrationClose must be before submissionClose
      if (
        data.registrationOpen &&
        data.registrationClose &&
        new Date(data.registrationOpen) > new Date(data.registrationClose)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Registration close must be after registration open',
          path: ['registrationClose'],
        })
      }

      if (
        data.submissionOpen &&
        data.submissionClose &&
        new Date(data.submissionOpen) > new Date(data.submissionClose)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Submission close must be after submission open',
          path: ['submissionClose'],
        })
      }

      if (
        data.submissionClose &&
        data.rewardTime &&
        new Date(data.submissionClose) > new Date(data.rewardTime)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Reward time must be after submission close',
          path: ['rewardTime'],
        })
      }

      if (
        data.registrationOpen &&
        data.submissionOpen &&
        new Date(data.registrationOpen) > new Date(data.submissionOpen)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Submission open must be after registration open',
          path: ['submissionOpen'],
        })
      }

      if (
        data.registrationClose &&
        data.submissionClose &&
        new Date(data.registrationClose) > new Date(data.submissionClose)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Submission close must be after registration close',
          path: ['registrationClose'],
        })
      }
    }
  })

export type FormValues = z.infer<typeof formSchema>

export function Timeline() {
  const hackathonId = useHackathonId()
  const { data: hackathon } = useHackathonQuery()

  const timeline = hackathon?.timeline

  const { data: userTimezone, isLoading: timezoneLoading } = useTimezone({
    enabled: !timeline?.timeZone,
  })
  const context = useHackathonCreationContext()

  const [ids, setIds] = useSetState<Ids>(defaultIds)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      timeZone: timeline?.timeZone ?? '',
      openReviewSame:
        (timeline?.openReviewSame?.toString() as 'true' | 'false') ?? 'false',
      registrationOpen: timeline?.registrationOpen
        ? timelineDateFormat(timeline.registrationOpen)
        : '',
      registrationClose: timeline?.registrationClose
        ? timelineDateFormat(timeline.registrationClose)
        : '',
      submissionOpen: timeline?.submissionOpen
        ? timelineDateFormat(timeline.submissionOpen)
        : '',
      submissionClose: timeline?.submissionClose
        ? timelineDateFormat(timeline.submissionClose)
        : '',
      rewardTime: timeline?.rewardTime
        ? timelineDateFormat(timeline.rewardTime)
        : '',
    },
  })

  const formTimezone = form.watch('timeZone')

  const update = useUpdateHackathon({
    onSuccess: () => {
      toast.success('Hackathon timeline updated')
      context.setSelectedTab('application')
    },
  })

  const selectedMode = useWatch({
    control: form.control,
    name: 'openReviewSame',
  })

  function onValid(data: FormValues) {
    const openReviewSame = data.openReviewSame === 'true'
    update.mutate({
      updateHackathonId: hackathonId,
      data: {
        progress: 'timeline',
        timeline: {
          upsert: {
            create: {
              timeZone: data.timeZone,
              openReviewSame,
              registrationOpen: dateToUTC(data.registrationOpen, data.timeZone),
              registrationClose: openReviewSame
                ? dateToUTC(data.submissionClose, data.timeZone)
                : dateToUTC(data.registrationClose, data.timeZone),
              submissionOpen: openReviewSame
                ? dateToUTC(data.registrationOpen, data.timeZone)
                : dateToUTC(data.submissionOpen, data.timeZone),
              submissionClose: dateToUTC(data.submissionClose, data.timeZone),
              rewardTime: dateToUTC(data.rewardTime, data.timeZone),
            },
            update: {
              timeZone: { set: data.timeZone },
              openReviewSame: { set: openReviewSame },
              registrationOpen: {
                set: dateToUTC(data.registrationOpen, data.timeZone),
              },
              registrationClose: {
                set: openReviewSame
                  ? dateToUTC(data.submissionClose, data.timeZone)
                  : dateToUTC(data.registrationClose, data.timeZone),
              },
              submissionOpen: {
                set: openReviewSame
                  ? dateToUTC(data.registrationOpen, data.timeZone)
                  : dateToUTC(data.submissionOpen, data.timeZone),
              },
              submissionClose: {
                set: dateToUTC(data.submissionClose, data.timeZone),
              },
              rewardTime: {
                set: dateToUTC(data.rewardTime, data.timeZone),
              },
            },
          },
        },
      },
    })
  }

  const contextValue = React.useMemo(() => ({ ids, setIds }), [ids, setIds])

  const timezoneOptions = React.useMemo(() => {
    return timezones.map(timezone => ({
      value: timezone,
      label: timezone,
    }))
  }, [])

  React.useEffect(() => {
    if (userTimezone && !formTimezone) {
      form.setValue('timeZone', userTimezone)
    }
  }, [userTimezone, formTimezone, form.setValue])

  return (
    <ScheduleProvider value={contextValue}>
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onValid)}
        >
          <FormCombobox
            control={form.control}
            name="timeZone"
            label="Timezone"
            loading={timezoneLoading}
            requiredSymbol
            placeholder="Select timezone"
            options={timezoneOptions}
          />
          <FormRadioCards
            control={form.control}
            name="openReviewSame"
            label="Do the registration and submission periods start and end simultaneously?"
            requiredSymbol
            tooltip={<TimelineTooltip />}
            radioCardsProps={{
              onValueChange: () => {
                form.clearErrors()
                setIds(defaultIds)
              },
            }}
            options={[
              {
                label: 'No, their open and close time is different',
                value: 'false',
              },
              {
                label: 'Yes, their open and close time is the same',
                value: 'true',
              },
            ]}
          />
          <AnimatedContent value={selectedMode} className="flex-1 space-y-4">
            {selectedMode === 'true' ? (
              <TimelinePrimitive.Root>
                <ScheduleSection
                  type={HackathonScheduleType.RegisterOpen}
                  isSameTime
                  name="registrationOpen"
                  label="Registration Open"
                />
                <ScheduleSection
                  type={HackathonScheduleType.SubmissionClose}
                  isSameTime
                  name="submissionClose"
                  label="Submission Close"
                />
                <ScheduleSection
                  type={HackathonScheduleType.Judging}
                  isSameTime
                  name="rewardTime"
                  label="Judging Ends"
                  last
                />
              </TimelinePrimitive.Root>
            ) : (
              <TimelinePrimitive.Root>
                <ScheduleSection
                  type={HackathonScheduleType.RegisterOpen}
                  isSameTime={false}
                  name="registrationOpen"
                  label="Registration Open"
                  closeName="registrationClose"
                  closeLabel="Registration Close"
                />
                <ScheduleSection
                  type={HackathonScheduleType.SubmissionClose}
                  isSameTime={false}
                  name="submissionOpen"
                  label="Submission Open"
                  closeName="submissionClose"
                  closeLabel="Submission Close"
                />
                <ScheduleSection
                  type={HackathonScheduleType.Judging}
                  isSameTime={false}
                  name="rewardTime"
                  label="Judging Ends"
                  last
                />
              </TimelinePrimitive.Root>
            )}
          </AnimatedContent>
          <SectionButton loading={update.isPending} />
        </form>
      </Form>
    </ScheduleProvider>
  )
}

function TimelineTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="outline-none">
            <LuInfo className="size-4 fill-primary" />
          </button>
        </TooltipTrigger>
        <TooltipContent
          align="start"
          className="body-s w-80 rounded-xl border border-neutral-300 bg-neutral-white p-6 text-primary-neutral"
        >
          <p>
            For online hackathons, the registration and submission usually start
            and end at the same time; for hybrid/offline hackathons,
            registration period usually ends before the start of submission, so
            that organizers can manage and control the number of applicants on
            site.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
