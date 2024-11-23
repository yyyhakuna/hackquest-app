import { FormCheckboxCards } from '@/components/common/form-checkbox-cards'
import { FormEditor } from '@/components/common/form-editor'
import { FormInput } from '@/components/common/form-input'
import { FormRadioCards } from '@/components/common/form-radio-cards'
import type { HackathonMode } from '@/graphql/generated/graphql'
import { useListEcosystemsQuery } from '@/graphql/generated/hooks'
import { useUpdateHackathon } from '@/hooks/hackathon/mutation'
import { useHackathonId, useHackathonQuery } from '@/hooks/hackathon/query'
import { useHackathonCreationContext } from '@/providers/hackathon/hackathon-creation-provider'
import { Form } from '@hackquest/ui/shared/form'
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

const baseSchema = z.discriminatedUnion('mode', [
  z.object({
    mode: z.literal('ONLINE'),
  }),
  z.object({
    mode: z.literal('HYBRID'),
    allowSubmission: z.string().min(1),
    address: z.string().min(1),
  }),
])

const formSchema = z
  .object({
    name: z.string().min(1),
    host: z.string().min(1),
    intro: z.string().min(1),
    ecosystem: z.array(z.string().min(1)).nonempty(),
    levelTag: z.string().optional(),
    description: z.string().min(1),
    conduct: z.string().url().optional(),
  })
  .and(baseSchema)

type FormValues = z.infer<typeof formSchema>

export function Info() {
  const hackathonId = useHackathonId()
  const { data: hackathon } = useHackathonQuery()

  const { data: ecosystems } = useListEcosystemsQuery(
    {},
    {
      staleTime: Number.POSITIVE_INFINITY,
      select: data =>
        data.listEcosystems?.data?.map(item => ({
          value: item.type as string,
          label: item.type as string,
        })),
    },
  )
  const context = useHackathonCreationContext()

  const info = hackathon?.info

  const update = useUpdateHackathon({
    onSuccess: () => {
      toast.success('Hackathon updated')
      context.setSelectedTab('links')
    },
  })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: hackathon?.name,
      host: info?.host ?? '',
      intro: info?.intro ?? '',
      ecosystem: info?.ecosystem ?? [],
      levelTag: info?.levelTag ?? '',
      description: info?.description ?? '',
      conduct: info?.conduct ?? undefined,
      mode: info?.mode ?? undefined,
      allowSubmission:
        info?.allowSubmission !== undefined
          ? info.allowSubmission.toString()
          : undefined,
      address: info?.address ?? '',
    },
  })

  const hackathonMode = useWatch({
    control: form.control,
    name: 'mode',
  })

  function onValid(data: FormValues) {
    update.mutate({
      updateHackathonId: hackathonId,
      data: {
        progress: 'info',
        name: { set: data.name },
        info: {
          upsert: {
            create: {
              host: data.host,
              intro: data.intro,
              ecosystem: { set: data.ecosystem },
              levelTag: data.levelTag,
              description: data.description,
              conduct: data.conduct ?? null,
              mode: data.mode as HackathonMode,
              allowSubmission:
                data.mode === 'HYBRID' ? data.allowSubmission === 'true' : true,
              address: data.mode === 'HYBRID' ? data.address : null,
            },
            update: {
              host: {
                set: data.host,
              },
              intro: {
                set: data.intro,
              },
              ecosystem: {
                set: data.ecosystem,
              },
              levelTag: {
                set: data.levelTag,
              },
              description: data.description,
              conduct: {
                set: data.conduct ?? null,
              },
              mode: {
                set: data.mode as HackathonMode,
              },
              allowSubmission: {
                set:
                  data.mode === 'HYBRID'
                    ? data.allowSubmission === 'true'
                    : true,
              },
              address: {
                set: data.mode === 'HYBRID' ? data.address : null,
              },
            },
          },
        },
      },
    })
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onValid)}
      >
        <FormInput
          control={form.control}
          name="name"
          label="Hackathon Name"
          placeholder="Hackathon Name"
          requiredSymbol
          maxLength={80}
        />
        <FormInput
          control={form.control}
          name="host"
          label="Organization Name"
          placeholder="e.g. Harvard University / Meta Platforms, Inc."
          requiredSymbol
          maxLength={80}
        />
        <FormInput
          control={form.control}
          name="intro"
          label="One Line Intro"
          placeholder="e.g. Biggest hackathon in Shanghai"
          requiredSymbol
          maxLength={120}
        />
        <FormCheckboxCards
          control={form.control}
          name="ecosystem"
          label="Ecosystem"
          requiredSymbol
          checkboxCardsProps={{ className: 'grid grid-cols-3' }}
          options={ecosystems}
        />
        <FormRadioCards
          control={form.control}
          name="levelTag"
          label="Builder Level Tag"
          options={[
            { value: 'general', label: 'General' },
            { value: 'newbie', label: 'For Newbie' },
            { value: 'senior', label: 'For Senior' },
          ]}
        />
        <FormEditor
          control={form.control}
          name="description"
          label="Description"
          output="html"
          requiredSymbol
          placeholder="Write a brief description for your hackathon"
          error={Boolean(form.formState.errors.description)}
        />
        <FormInput
          control={form.control}
          name="conduct"
          label="Code of Conduct (start with https:// or http://)"
          placeholder="Enter a URL"
        />
        <FormRadioCards
          control={form.control}
          name="mode"
          label="Hackathon Mode (Select one)"
          requiredSymbol
          tooltip={<HackathonModeTooltip />}
          options={[
            { value: 'HYBRID', label: 'Hybrid / Offline' },
            { value: 'ONLINE', label: 'Online' },
          ]}
        />
        {hackathonMode === 'HYBRID' && (
          <React.Fragment>
            <FormRadioCards
              control={form.control}
              name="allowSubmission"
              label="Do users need to get approval from the organizer after application? (Select one)"
              requiredSymbol
              tooltip={<AllowSubmissionTooltip />}
              options={[
                {
                  value: 'false',
                  label: 'Yes, they need approval from organizer',
                },
                {
                  value: 'true',
                  label: 'No, they don’t need approval from organizer',
                },
              ]}
            />
            <FormInput
              control={form.control}
              name="address"
              label="Venue"
              placeholder="Enter Venue Name"
              requiredSymbol
              maxLength={120}
            />
          </React.Fragment>
        )}
        <SectionButton loading={update.isPending} />
      </form>
    </Form>
  )
}

function HackathonModeTooltip() {
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
          <p>Online: Your hackathon will be held totally online.</p>
          <p className="mt-2">
            Hybrid / Offline: Your hackathon will be held totally offline or
            combined with online and offline.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function AllowSubmissionTooltip() {
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
            Hybrid / Offline hackathon may have a limitation of the number of
            participants based on the physical location. You can have a better
            way to manage participants if users need approval from the
            organizers.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
