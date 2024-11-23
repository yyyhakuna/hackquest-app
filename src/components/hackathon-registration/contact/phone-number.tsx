import { FormInput } from '@/components/common/form-input'
import type * as React from 'react'
import type { Control, FieldValues } from 'react-hook-form'
import * as z from 'zod'
import type { ApplicationField, ApplicationSchema } from '../type'

export function PhoneNumber({
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

export const phoneNumberField: ApplicationSchema<
  React.ComponentProps<typeof PhoneNumber>
> = {
  type: 'PhoneNumber',
  component: PhoneNumber,
  getValidator: field => {
    const validator = z
      .string()
      .min(field.optional ? 0 : 6)
      .max(20)

    return {
      phoneNumber: field.optional ? validator.optional() : validator,
    }
  },
}
