import { EditableTag } from '@/components/common/editable-tag'
import { FormInput } from '@/components/common/form-input'
import { FormTextarea } from '@/components/common/form-textarea'
import { Label } from '@hackquest/ui/shared/label'
import * as React from 'react'
import { type FieldValues, useFormContext } from 'react-hook-form'

export function ProfileForm() {
  const form = useFormContext<FieldValues>()

  return (
    <React.Fragment>
      <FormInput
        control={form.control}
        name="nickname"
        label="Name"
        placeholder="Enter your name"
      />
      <FormInput
        control={form.control}
        name="location"
        label="Location"
        placeholder="Enter your location"
      />
      <FormTextarea
        control={form.control}
        name="bio"
        label="Bio"
        placeholder="Share a short bio about yourself"
        rows={3}
        maxLength={160}
      />
      <section className="space-y-1">
        <Label className="body-s text-neutral-600">Skills</Label>
        <EditableTag
          value={form.watch('techStack')}
          onValueChange={value => {
            form.setValue('techStack', value)
          }}
        />
      </section>
    </React.Fragment>
  )
}
