import { FormInput } from '@/components/common/form-input'
import type * as React from 'react'
import type { Control, FieldValues } from 'react-hook-form'
import * as z from 'zod'
import type { ApplicationField, ApplicationSchema } from '../type'

export function Location({
  control,
  field,
}: {
  control: Control<FieldValues>
  field: ApplicationField
}) {
  return (
    <FormInput
      control={control}
      name={field.property.name ?? 'location'}
      label={field.property.label}
      placeholder={field.property.placeholder}
      requiredSymbol={!field.optional}
    />
  )
}

export const locationField: ApplicationSchema<
  React.ComponentProps<typeof Location>
> = {
  type: 'ApplicationLocation',
  component: Location,
  getValidator: field => {
    const validator = z.string().min(field.optional ? 0 : 1)
    return {
      location: field.optional ? validator.optional() : validator,
    }
  },
}
