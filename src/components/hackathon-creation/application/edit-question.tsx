import { FormEditor } from '@/components/common/form-editor'
import { FormInput } from '@/components/common/form-input'
import { useUpdateHackathon } from '@/hooks/hackathon/mutation'
import { useHackathonId, useHackathonQuery } from '@/hooks/hackathon/query'
import { Button } from '@hackquest/ui/shared/button'
import { Form } from '@hackquest/ui/shared/form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
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
  const hackathonId = useHackathonId()
  const context = useApplicationContext()

  const submitRef = React.useRef<HTMLInputElement>(null)

  const { data: hackathon } = useHackathonQuery()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: initialValues?.property?.label ?? '',
      placeholder: initialValues?.property?.placeholder ?? '',
    },
  })

  const update = useUpdateHackathon({
    onSuccess: () => {
      toast.success('Hackathon section updated')
      reset()
    },
  })

  function reset() {
    onCancel()
    form.reset()
  }

  function onValid(data: FormValues) {
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

    const submitApplication = Object.entries(newApplication).reduce<
      Record<string, any[]>
    >((acc, [key, items]) => {
      if (Array.isArray(items)) {
        acc[key] = items.filter(item => item.selected)
      }
      return acc
    }, {})

    const submission = structuredClone(hackathon?.info?.submission)

    const newSubmission = Array.isArray(submission)
      ? submission
      : Object.values(submission ?? {}).flat()

    const filteredSubmission = newSubmission.filter(
      item => item.id !== newField.id,
    )
    const submitSubmission = [...filteredSubmission, newField]

    if (type === 'SubmissionQuestion') {
      update.mutate({
        updateHackathonId: hackathonId,
        data: {
          info: {
            upsert: {
              create: {
                submission: submitSubmission,
              },
              update: {
                submission: submitSubmission,
              },
            },
          },
        },
      })
    } else {
      update
        .mutateAsync({
          updateHackathonId: hackathonId,
          data: {
            info: {
              upsert: {
                create: {
                  application: submitApplication,
                },
                update: {
                  application: submitApplication,
                },
              },
            },
          },
        })
        .then(() => {
          context.setApplication(newApplication)
        })
    }
  }

  return (
    <section className="mt-3 rounded-xl border border-neutral-300 bg-neutral-50 p-4">
      <div className="flex items-center justify-between">
        <h3 className="headline-s">Q&A</h3>
        <div className="flex items-center gap-3">
          <Button
            size="small"
            loading={update.isPending}
            onClick={() => submitRef.current?.click()}
          >
            Confirm
          </Button>
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
          <FormEditor
            name="placeholder"
            control={form.control}
            label="Description"
            placeholder="Description"
          />
          <input ref={submitRef} type="submit" className="hidden" />
        </form>
      </Form>
    </section>
  )
}
