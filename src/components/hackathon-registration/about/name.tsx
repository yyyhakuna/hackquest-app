import { FormInput } from '@/components/common/form-input'
import type * as React from 'react'
import type { Control, FieldValues } from 'react-hook-form'
import * as z from 'zod'
import type { ApplicationField, ApplicationSchema } from '../type'

export function Name({
  control,
  field,
}: {
  control: Control<FieldValues>
  field: ApplicationField
}) {
  return (
    <section className="grid grid-cols-2 gap-3">
      <FormInput
        control={control}
        name="firstName"
        label="First Name"
        placeholder="Enter your first name"
        requiredSymbol={!field.optional}
      />
      <FormInput
        control={control}
        name="lastName"
        label="Last Name"
        placeholder="Enter your last name"
        requiredSymbol={!field.optional}
      />
    </section>
  )
}

export const nameField: ApplicationSchema<React.ComponentProps<typeof Name>> = {
  type: 'First and Last Name',
  component: Name,
  getValidator: field => {
    const validator = z
      .string()
      .min(field.optional ? 0 : 1)
      .max(30)
    return {
      firstName: field.optional ? validator.optional() : validator,
      lastName: field.optional ? validator.optional() : validator,
    }
  },
}
