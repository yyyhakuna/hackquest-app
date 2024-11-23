import { AnimatedContent } from '@/components/common/animated-content'
import { FormEditor } from '@/components/common/form-editor'
import { FormInput } from '@/components/common/form-input'
import { FormRadioCards } from '@/components/common/form-radio-cards'
import { FormSelect } from '@/components/common/form-select'
import type { HackathonRewards } from '@/graphql/generated/graphql'
import {
  useCreateHackathonRewordMutation,
  useUpdateHackathonRewardMutation,
} from '@/graphql/generated/hooks'
import { useHackathonId } from '@/hooks/hackathon/query'
import { stringifyNumber } from '@/lib/stringify'
import { separationNumber } from '@/lib/utils'
import { Button } from '@hackquest/ui/shared/button'
import { Form } from '@hackquest/ui/shared/form'
import { Label } from '@hackquest/ui/shared/label'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@hackquest/ui/shared/tooltip'
import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import {
  type FieldErrors,
  useFieldArray,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form'
import toast from 'react-hot-toast'
import { LuInfo, LuPlus } from 'react-icons/lu'
import * as z from 'zod'
import { CustomFieldInput } from '../common/custom-field-input'

const rewardSchema = z.object({
  id: z.string().uuid(),
  value: z.string().min(1),
})

const baseSchema = z.discriminatedUnion('mode', [
  z.object({
    mode: z.literal('RANK'),
    rewards: z.array(rewardSchema).min(1),
  }),
  z.object({
    mode: z.literal('OTHERS'),
    totalRewards: z.string().min(1),
    rule: z.string().min(1),
  }),
])

const formSchema = z
  .object({
    name: z.string().min(1).max(80),
    currency: z.string(),
  })
  .and(baseSchema)

type FormValues = z.infer<typeof formSchema>

const currencies = [
  'USDT',
  'USDC',
  'USD',
  'RMB',
  'INR',
  'SGD',
  'MYR',
  'EURO',
  'ETH',
  'SOL',
  'DAI',
] as const

export function EditReward({
  rewards: rewardsList,
  initialValues,
  onCancel,
}: {
  rewards: Omit<HackathonRewards, 'hackathon'>[]
  initialValues: Omit<HackathonRewards, 'hackathon'> | null
  onCancel: () => void
}) {
  const hackathonId = useHackathonId()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues?.name ?? '',
      mode: (initialValues?.mode as any) ?? 'RANK',
      currency: initialValues?.currency ?? '',
      totalRewards: '',
      rule: '',
      rewards: [
        { id: crypto.randomUUID(), value: '' },
        { id: crypto.randomUUID(), value: '' },
      ],
      ...(initialValues?.mode === 'RANK' && {
        rewards: initialValues?.rewards?.map((reward: any) => ({
          id: reward.id,
          value: reward.value.toString(),
        })),
      }),
      ...(initialValues?.mode === 'OTHERS' && {
        totalRewards: initialValues?.totalRewards?.toString(),
        rule: initialValues?.rule,
      }),
    },
  })

  const create = useCreateHackathonRewordMutation({
    meta: {
      invalidates: [['FindUniqueHackathon']],
    },
    onSuccess: () => {
      toast.success('Reward created')
      refresh()
    },
    onError: (error: string) => {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error(error)
    },
  })

  const update = useUpdateHackathonRewardMutation({
    meta: {
      invalidates: [['FindUniqueHackathon']],
    },
    onSuccess: () => {
      toast.success('Reward updated')
      refresh()
    },
    onError: (error: string) => {
      toast.error(error)
    },
  })

  function refresh() {
    onCancel()
    form.reset()
  }

  const rewards = useWatch({
    control: form.control,
    name: 'rewards',
  })

  const totalRewards = rewards?.reduce((acc, curr) => {
    return acc + z.coerce.number().parse(curr.value)
  }, 0)

  const selectedMode = useWatch({
    control: form.control,
    name: 'mode',
  })

  function onValid(data: FormValues) {
    if (initialValues !== null) {
      update.mutate({
        rewardId: z.coerce.string().parse(initialValues.id),
        data: {
          name: { set: data.name },
          mode: { set: data.mode },
          currency: { set: data.currency },
          totalRewards: {
            set:
              data.mode === 'RANK'
                ? totalRewards
                : z.coerce.number().parse(data.totalRewards),
          },
          ...(data.mode === 'RANK' && {
            rewards: data.rewards.map((reward, index) => ({
              id: reward.id,
              value: z.coerce.number().parse(reward.value),
              label: `${stringifyNumber(index + 1)} Place`,
            })),
          }),
          ...(data.mode === 'OTHERS' && {
            rule: data.rule,
          }),
        },
      })
    } else {
      const lastOrder = rewardsList?.[rewardsList.length - 1]?.order || 0
      create.mutate({
        hackathonId,
        data: {
          name: data.name,
          mode: data.mode,
          currency: data.currency,
          order: lastOrder + 1,
          totalRewards:
            data.mode === 'RANK'
              ? totalRewards
              : z.coerce.number().parse(data.totalRewards),
          ...(data.mode === 'RANK' && {
            rewards: data.rewards.map((reward, index) => ({
              id: reward.id,
              value: z.coerce.number().parse(reward.value),
              label: `${stringifyNumber(index + 1)} Place`,
            })),
          }),
          ...(data.mode === 'OTHERS' && {
            rule: data.rule,
          }),
        },
      })
    }
  }

  const fullPending = create.isPending || update.isPending

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValid)}
        className="space-y-4 rounded-xl border border-neutral-300 bg-neutral-50 p-4"
      >
        <div className="flex items-center justify-end gap-3">
          <Button type="submit" size="small" loading={fullPending}>
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
        <FormInput
          control={form.control}
          name="name"
          label="Prize Track Name"
          maxLength={80}
          requiredSymbol
        />
        <FormRadioCards
          control={form.control}
          name="mode"
          label="Distribution Method (Select one)"
          requiredSymbol
          tooltip={<DistributionMethodTooltip />}
          options={[
            { label: 'By Ranking', value: 'RANK' },
            { label: 'By Others', value: 'OTHERS' },
          ]}
        />
        <FormSelect
          control={form.control}
          name="currency"
          label="Reward Currency"
          requiredSymbol
          options={currencies.map(currency => ({
            label: currency,
            value: currency,
          }))}
        />
        <AnimatedContent value={selectedMode} className="flex-1 space-y-4">
          {selectedMode === 'RANK' ? (
            <RankingForm totalRewards={totalRewards} />
          ) : (
            <OthersForm />
          )}
        </AnimatedContent>
      </form>
    </Form>
  )
}

function RankingForm({ totalRewards }: { totalRewards?: number }) {
  const form = useFormContext<FormValues>()

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'rewards',
  })

  const currency = useWatch<FormValues, 'currency'>({
    control: form.control,
    name: 'currency',
  })

  const fullErrors: FieldErrors<Extract<FormValues, { mode: 'RANK' }>> &
    FieldErrors<Extract<FormValues, { mode: 'OTHERS' }>> = form.formState.errors

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label className="body-s text-neutral-600">
          Ranking & Rewards<span className="text-destructive-600">*</span>
        </Label>
        <div className="grid grid-cols-2 gap-3">
          {fields.map((field, index) => (
            <CustomFieldInput
              key={field.id}
              name={`rewards.${index}.value`}
              register={form.register}
              index={index}
              remove={remove}
              type="number"
              placeholder="e.g. 5000"
              error={fullErrors.rewards?.[index]?.value?.message}
            />
          ))}
          {/* biome-ignore lint/a11y/useFocusableInteractive: <explanation> */}
          <div
            // biome-ignore lint/a11y/useSemanticElements: <explanation>
            role="button"
            className="body-s inline-flex h-10 items-center gap-2.5 rounded-md border border-neutral-300 p-2 outline-none"
            onClick={() => append({ id: crypto.randomUUID(), value: '' })}
          >
            <LuPlus className="size-4" />
            Add a ranking
          </div>
        </div>
        {fullErrors.rewards?.root?.message && (
          <p
            role="alert"
            className="inline-flex items-center text-destructive-600 text-xs"
          >
            <LuInfo className="mr-1.5 size-4" />
            <span>{fullErrors.rewards?.root?.message}</span>
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label className="body-s text-neutral-600">Total Rewards</Label>
        <p className="headline-s">
          {totalRewards ? `${separationNumber(totalRewards)} ${currency}` : '-'}
        </p>
      </div>
    </div>
  )
}

function OthersForm() {
  const form = useFormContext<FormValues>()

  const fullErrors: FieldErrors<Extract<FormValues, { mode: 'RANK' }>> &
    FieldErrors<Extract<FormValues, { mode: 'OTHERS' }>> = form.formState.errors

  return (
    <React.Fragment>
      <FormInput
        control={form.control}
        name="totalRewards"
        label="Total Rewards"
        type="number"
        requiredSymbol
      />
      <FormEditor
        control={form.control}
        name="rule"
        label="Distribution Rule"
        placeholder="Please describe how the rewards will be distributed"
        error={Boolean(fullErrors.rule)}
        requiredSymbol
      />
    </React.Fragment>
  )
}

function DistributionMethodTooltip() {
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
            If the reward will be distributed by ranking, organizers can set the
            rewards for each ranking here; If it will be distributed by other
            ways, organizers need to describe the rule here and more details
            need to be provided at the end of hackathon voting stage.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
