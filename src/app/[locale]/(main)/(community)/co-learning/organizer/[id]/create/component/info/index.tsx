import { FormCheckboxCards } from '@/components/common/form-checkbox-cards'
import { FormEditor } from '@/components/common/form-editor'
import { FormInput } from '@/components/common/form-input'
import { FormRadioCards } from '@/components/common/form-radio-cards'
import {
  type ComunityType,
  type EcosystemValue,
  useListEcosystemsQuery,
  useUpdateCoLearningMutation,
} from '@/graphql/generated/hooks'
import { Form } from '@hackquest/ui/shared/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'
import { communityTypes } from '../../constant'
import ContinueButton from '../common/continue-button'
import { useColearningContext } from '../common/creation-provider'

const formSchema = z.object({
  name: z.string().min(1),
  intro: z.string().min(1),
  reward: z.string().min(1),
  ecosystem: z.array(z.string().min(1)).nonempty(),
  description: z.string().min(1),
  communityType: z.string().optional(),
  communityUrl: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function Info() {
  const { setSelectedTab, data } = useColearningContext()

  const id = useParams().id as string
  const { data: ecosystems } = useListEcosystemsQuery(
    {},
    {
      staleTime: Number.POSITIVE_INFINITY,
      select: data =>
        data.listEcosystems?.data?.map(item => ({
          value: item.type?.toUpperCase() as string,
          label: item.type as string,
        })),
    },
  )
  const { mutateAsync, isPending } = useUpdateCoLearningMutation()
  const iniEcosystem = data?.ecosystem?.map(item => item.toUpperCase()) ?? []

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? '',
      intro: data?.intro ?? '',
      reward: data?.reward ?? '',
      description: data?.description ?? '',
      communityType: data?.communityType?.toUpperCase() ?? '',
      communityUrl: data?.communityUrl ?? '',
      ecosystem: iniEcosystem ?? [],
    },
  })

  const getNewProgress = () => {
    if (data.progress?.includes('info')) return data.progress
    return [...(data?.progress ?? []), 'info']
  }

  async function onValid(data: FormValues) {
    await toast.promise(
      mutateAsync({
        id,
        data: {
          name: {
            set: data.name,
          },
          progress: {
            set: getNewProgress(),
          },
          reward: data.reward,
          communityType: {
            set: data.communityType as ComunityType,
          },
          communityUrl: {
            set: data.communityUrl,
          },
          intro: {
            set: data.intro,
          },
          description: {
            set: data.description,
          },
          ecosystem: {
            set: data.ecosystem as EcosystemValue[],
          },
        },
      }),
      {
        loading: 'Loading',
        success: 'Update success',
        error: 'Failed to upload',
      },
    )
    setSelectedTab('timeline')
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
          label="Colearning Name"
          placeholder="Hackathon Name"
          requiredSymbol
        />
        <FormInput
          control={form.control}
          name="intro"
          label="One Line Intro"
          placeholder="e.g. Biggest hackathon in Shanghai"
          requiredSymbol
          maxLength={120}
        />
        <FormInput
          control={form.control}
          name="reward"
          label="Reward"
          placeholder="e.g. usdt"
          requiredSymbol
        />
        <FormCheckboxCards
          control={form.control}
          name="ecosystem"
          label="Ecosystem"
          requiredSymbol
          checkboxCardsProps={{ className: 'grid grid-cols-3' }}
          options={ecosystems}
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
        <FormRadioCards
          control={form.control}
          name="communityType"
          label="Community Type"
          options={communityTypes}
        />
        <FormInput
          control={form.control}
          name="communityUrl"
          label="Comunity URL"
          placeholder="Join Community"
          maxLength={100}
        />
        <ContinueButton loading={isPending} />
      </form>
    </Form>
  )
}
