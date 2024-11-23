import { FormInput } from '@/components/common/form-input'
import type * as React from 'react'
import type { Control, FieldValues } from 'react-hook-form'
import * as z from 'zod'
import type { ApplicationField, ApplicationSchema } from '../type'

export function Facebook({
  control,
  field,
}: {
  control: Control<FieldValues>
  field: ApplicationField
}) {
  return (
    <FormInput
      control={control}
      name={field.property.name ?? 'facebook'}
      label={field.property.label}
      placeholder={field.property.placeholder}
      requiredSymbol={!field.optional}
    />
  )
}

export const facebookField: ApplicationSchema<
  React.ComponentProps<typeof Facebook>
> = {
  type: 'Facebook',
  component: Facebook,
  getValidator: field => {
    const validator = z.string().min(field.optional ? 0 : 1)
    return {
      facebook: field.optional ? validator.optional() : validator,
    }
  },
}
