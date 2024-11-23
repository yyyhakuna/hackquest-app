import { FormEditor } from '@/components/common/form-editor'
import { FormInput } from '@/components/common/form-input'
import { Form } from '@hackquest/ui/shared/form'
import { zodResolver } from '@hookform/resolvers/zod'
import type React from 'react'
import { type FieldErrors, useForm } from 'react-hook-form'
import { z } from 'zod'
import EditHeaderButton from '../common/edit-header-button'
import type {
  HackathonTextInfoContentType,
  HackathonTextInfoValueType,
} from '../constants/type'

export const typeForm = {
  faqs: {
    form: z.object({
      id: z.string().uuid(),
      question: z.string().min(1).max(80),
      answer: z.string().min(1),
    }),
  },
  resource: {
    form: z.object({
      id: z.string().uuid(),
      description: z.string().min(1),
    }),
  },
  another: {
    form: z.object({
      id: z.string().uuid(),
      title: z.string().min(1).max(80),
      description: z.string().min(1),
    }),
  },
}
interface TextEditProp {
  type: HackathonTextInfoValueType
  initValue: HackathonTextInfoContentType
  onSubmit: (val: HackathonTextInfoContentType) => void
  onCancel: VoidFunction
  loading: boolean
}

const TextEdit: React.FC<TextEditProp> = ({
  type,
  initValue,
  onSubmit,
  onCancel,
  loading,
}) => {
  const formSchema = typeForm[type].form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initValue,
  })

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 rounded-xl border border-neutral-300 bg-neutral-50 p-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <EditHeaderButton onCancel={onCancel} confirmLoading={loading} />
        {type === 'faqs' && (
          <>
            <FormInput
              control={form.control}
              name="question"
              label="Question"
              placeholder="Use several words to describe the selections you want users to choose"
              requiredSymbol
              maxLength={80}
            />
            <FormEditor
              control={form.control}
              name="answer"
              label="Answer"
              output="html"
              requiredSymbol
              placeholder="Use several words to describe the selections you want users to choose"
              error={Boolean(
                (form.formState.errors as FieldErrors<{ answer: string }>)
                  .answer,
              )}
            />
          </>
        )}

        {type === 'resource' && (
          <FormEditor
              control={form.control}
              name="description"
              label="Description"
              output="html"
              requiredSymbol
              placeholder="Use several words to describe the selections you want users to choose"
              error={Boolean(
                (form.formState.errors as FieldErrors<{ description: string }>)
                  .description,
              )}
            />
        )}

        {type === 'another' && (
          <>
            <FormInput
              control={form.control}
              name="title"
              label="Title"
              placeholder="Unnamed Section"
              requiredSymbol
              maxLength={80}
            />
            <FormEditor
              control={form.control}
              name="description"
              label="Description"
              output="html"
              requiredSymbol
              placeholder="Use several words to describe the selections you want users to choose"
              error={Boolean(
                (form.formState.errors as FieldErrors<{ description: string }>)
                  .description,
              )}
            />
          </>
        )}
      </form>
    </Form>
  )
}

export default TextEdit
