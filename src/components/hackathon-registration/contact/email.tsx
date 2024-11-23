import { FormInput } from '@/components/common/form-input'
import type * as React from 'react'
import type { Control, FieldValues } from 'react-hook-form'
import * as z from 'zod'
import type { ApplicationField, ApplicationSchema } from '../type'

export function Email({
  control,
  field,
}: {
  control: Control<FieldValues>
  field: ApplicationField
}) {
  return (
    <FormInput
      control={control}
      name={field.property.name}
      label={field.property.label}
      placeholder={field.property.placeholder}
      requiredSymbol={!field.optional}
    />
  )
}

export const emailField: ApplicationSchema<React.ComponentProps<typeof Email>> =
  {
    type: 'Email',
    component: Email,
    getValidator: field => {
      const validator = z.string().email()
      return {
        email: field.optional ? validator.optional() : validator,
      }
    },
  }
