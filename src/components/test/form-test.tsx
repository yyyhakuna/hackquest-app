'use client'

import { FormEditor } from '@/components/common/form-editor'
import { FormInput } from '@/components/common/form-input'
import { FormSelect } from '@/components/common/form-select'
import { FormTextarea } from '@/components/common/form-textarea'
import { Button } from '@hackquest/ui/shared/button'
import { Form } from '@hackquest/ui/shared/form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { EditableTag } from '../common/editable-tag'

const formSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  role: z
    .string({
      required_error: 'Please select a role to display',
    })
    .min(1, { message: 'Role is required' }),
  content: z.string().min(1, { message: 'Content is required' }),
})

export function FormTest() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      description: '',
      role: '',
      content: '',
    },
  })

  function onSubmit(_data: z.infer<typeof formSchema>) {}

  const [tags, setTags] = React.useState(['test', 'test2'])

  return (
    <div className="w-full max-w-[500px]">
      <EditableTag
        value={tags}
        onValueChange={value => {
          setTags(value)
        }}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormInput control={form.control} name="username" label="Username" requiredSymbol maxLength={10} />
          <FormTextarea control={form.control} name="description" label="Description" requiredSymbol maxLength={320} />
          <FormSelect
            control={form.control}
            name="role"
            label="Role"
            requiredSymbol
            options={[
              { label: 'Admin', value: 'admin' },
              { label: 'User', value: 'user' },
            ]}
          />
          <FormEditor
            control={form.control}
            name="content"
            label="Content"
            output="html"
            requiredSymbol
            placeholder="Write your content here..."
            error={Boolean(form.formState.errors.content)}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
