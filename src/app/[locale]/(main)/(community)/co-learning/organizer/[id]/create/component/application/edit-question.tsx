import { FormInput } from '@/components/common/form-input'
import { useUpdateCoLearningMutation } from '@/graphql/generated/hooks'
import { Button } from '@hackquest/ui/shared/button'
import { Form } from '@hackquest/ui/shared/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { LuArrowRight } from 'react-icons/lu'
import * as z from 'zod'
import { useApplicationContext } from './application-context'

const formSchema = z.object({
  label: z.string().min(1),
  placeholder: z.string().optional().or(z.literal('')),
})

type FormValues = z.infer<typeof formSchema>

export function EditQuestion({
  type,
  initialValues,
  onCancel,
}: {
  type: string
  initialValues: any | null
  onCancel: () => void
}) {
  const context = useApplicationContext()
  const id = useParams().id as string

  const submitRef = React.useRef<HTMLInputElement>(null)

  const { mutateAsync, isPending, isSuccess } = useUpdateCoLearningMutation()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: initialValues?.property?.label ?? '',
      placeholder: initialValues?.property?.placeholder ?? '',
    },
  })

  function reset() {
    onCancel()
    form.reset()
  }

  async function onValid(data: FormValues) {
    const newField = {
      id: initialValues?.id ?? crypto.randomUUID(),
      type: 'input',
      optional: true,
      selected: true,
      property: {
        ...data,
        maxCharacters: 300,
      },
    }

    const application = structuredClone(context.application)

    const newApplication = Object.entries(application).reduce<
      Record<string, any[]>
    >((acc, [key, items]) => {
      if (Array.isArray(items)) {
        if (key === type) {
          const exist = items.find(item => item.id === newField.id)
          if (exist) {
            acc[key] = items.map(item =>
              item.id === newField.id ? newField : item,
            )
          } else {
            acc[key] = [...items, newField]
          }
        } else {
          acc[key] = items
        }
      }
      return acc
    }, {})

    toast
      .promise(
        mutateAsync({
          id,
          data: {
            application: newApplication,
          },
        }),
        {
          loading: 'Loading',
          success: 'Update Success',
          error: 'Failed to Update',
        },
      )
      .then(() => {
        reset()
        context.setApplication(newApplication)
      })
  }

  return (
    <section className="mt-3 rounded-xl border border-neutral-300 bg-neutral-50 p-4">
      <div className="flex items-center justify-between">
        <h3 className="headline-s">Q&A</h3>
        <div className="flex items-center gap-3">
          <Button
            size="small"
            variant="outline"
            color="neutral"
            onClick={reset}
          >
            Cancel
          </Button>
        </div>
      </div>
      <Form {...form}>
        <form className="mt-4 space-y-4" onSubmit={form.handleSubmit(onValid)}>
          <FormInput
            name="label"
            control={form.control}
            label="Question"
            placeholder="Question"
            requiredSymbol
            maxLength={80}
          />
          <FormInput
            name="placeholder"
            control={form.control}
            label="Description"
            placeholder="Description"
            maxLength={300}
          />
          <Button
            className="w-full"
            onClick={form.handleSubmit(onValid)}
            disabled={isPending}
          >
            Confirm <LuArrowRight />
          </Button>
          <input ref={submitRef} type="submit" className="hidden" />
        </form>
      </Form>
    </section>
  )
}
