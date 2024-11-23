import { FormTextarea } from '@/components/common/form-textarea'
import type * as React from 'react'
import type { Control, FieldValues } from 'react-hook-form'
import * as z from 'zod'
import type { ApplicationField, ApplicationSchema } from '../type'

export function Bio({
  control,
  field,
}: {
  control: Control<FieldValues>
  field: ApplicationField
}) {
  return (
    <FormTextarea
      control={control}
      name={field.property?.name ?? 'bio'}
      label={field.property.label}
      placeholder={field.property.placeholder}
      maxLength={field.property.maxField}
      requiredSymbol={!field.optional}
    />
  )
}

export const bioField: ApplicationSchema<React.ComponentProps<typeof Bio>> = {
  type: 'Bio',
  component: Bio,
  getValidator: field => {
    const validator = z
      .string()
      .min(field.optional ? 0 : 1)
      .max(360)
    return {
      bio: field.optional ? validator.optional() : validator,
    }
  },
}
