import { FormInput } from '@/components/common/form-input'
import type * as React from 'react'
import type { Control, FieldValues } from 'react-hook-form'
import * as z from 'zod'
import type { ApplicationField, ApplicationSchema } from '../type'

export function University({
  control,
  field,
}: {
  control: Control<FieldValues>
  field: ApplicationField
}) {
  return (
    <FormInput
      control={control}
      name={field.property.name ?? 'university'}
      label={field.property.label}
      placeholder={field.property.placeholder}
      requiredSymbol={!field.optional}
    />
  )
}

export const universityField: ApplicationSchema<
  React.ComponentProps<typeof University>
> = {
  type: 'University',
  component: University,
  getValidator: field => {
    const validator = z.string().min(field.optional ? 0 : 1)
    return {
      university: field.optional ? validator.optional() : validator,
    }
  },
}
