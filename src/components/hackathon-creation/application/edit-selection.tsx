import { FormEditor } from '@/components/common/form-editor'
import { FormInput } from '@/components/common/form-input'
import { useUpdateHackathon } from '@/hooks/hackathon/mutation'
import { useHackathonId, useHackathonQuery } from '@/hooks/hackathon/query'
import { Button } from '@hackquest/ui/shared/button'
import { Form } from '@hackquest/ui/shared/form'
import { Label } from '@hackquest/ui/shared/label'
import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { LuInfo, LuPlus } from 'react-icons/lu'
import * as z from 'zod'
import { CustomFieldInput } from '../common/custom-field-input'

const formSchema = z.object({
  label: z.string().min(1),
  placeholder: z.string().optional().or(z.literal('')),
  options: z.array(z.object({ value: z.string().min(1) })).min(1),
})

type FormValues = z.infer<typeof formSchema>

export function EditSelection({
  type,
  initialValues,
  onCancel,
}: {
  type: string
  initialValues: any | null
  onCancel: () => void
}) {
  const hackathonId = useHackathonId()
  const submitRef = React.useRef<HTMLInputElement>(null)

  const { data: hackathon } = useHackathonQuery()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: initialValues?.property?.label ?? '',
      placeholder: initialValues?.property?.placeholder ?? '',
      options:
        initialValues !== null
          ? initialValues?.property?.options?.map((option: any) => ({
              value: option,
            }))
          : [{ value: '' }, { value: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'options',
  })

  const update = useUpdateHackathon({
    onSuccess: () => {
      toast.success('Hackathon section updated')
      onCancel()
      form.reset()
    },
  })

  function onValid(data: FormValues) {
    const newField = {
      id: initialValues?.id ?? crypto.randomUUID(),
      type: 'radio',
      optional: true,
      selected: true,
      property: {
        ...data,
        multiple: false,
        options: data.options.map(option => option.value),
      },
    }

    const submission = structuredClone(hackathon?.info?.submission)

    const newSubmission = Array.isArray(submission)
      ? submission
      : Object.values(submission ?? {}).flat()

    const filteredSubmission = newSubmission.filter(
      item => item.id !== newField.id,
    )
    const submitSubmission = [...filteredSubmission, newField]

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
  }

  return (
    <section className="mt-3 rounded-xl border border-neutral-300 bg-neutral-50 p-4">
      <div className="flex items-center justify-between">
        <h3 className="headline-s">Selection</h3>
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
            onClick={() => {
              onCancel()
              form.reset()
            }}
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
          />
          <FormEditor
            name="placeholder"
            control={form.control}
            label="Description"
            placeholder="Description"
          />
          <div className="space-y-1">
            <Label className="body-s text-neutral-600">Options*</Label>
            <div className="grid grid-cols-2 gap-3">
              {fields.map((field, index) => (
                <CustomFieldInput
                  key={field.id}
                  name={`options.${index}.value`}
                  register={form.register}
                  index={index}
                  remove={remove}
                  placeholder={`Option ${index + 1} starts here...`}
                  error={form.formState.errors.options?.[index]?.value?.message}
                />
              ))}
              <div
                role="button"
                className="body-s inline-flex h-10 items-center gap-2.5 rounded-md border border-neutral-300 p-2 outline-none"
                onClick={() => append({ value: '' })}
              >
                <LuPlus className="size-4" />
                <span>Add one option</span>
              </div>
            </div>
            {form.formState.errors.options?.root?.message && (
              <p className="inline-flex items-center text-destructive-600 text-xs">
                <LuInfo className="mr-1.5 size-4" />
                <span>{form.formState.errors.options?.root?.message}</span>
              </p>
            )}
          </div>
          <input ref={submitRef} type="submit" className="hidden" />
        </form>
      </Form>
    </section>
  )
}
