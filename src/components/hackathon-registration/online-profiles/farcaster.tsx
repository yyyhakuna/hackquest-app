import { FormInput } from '@/components/common/form-input'
import type * as React from 'react'
import type { Control, FieldValues } from 'react-hook-form'
import * as z from 'zod'
import type { ApplicationField, ApplicationSchema } from '../type'

export function Farcaster({
  control,
  field,
}: {
  control: Control<FieldValues>
  field: ApplicationField
}) {
  return (
    <FormInput
      control={control}
      name={field.property.name ?? 'whatsApp'}
      label={field.property.label}
      placeholder={field.property.placeholder}
      requiredSymbol={!field.optional}
    />
  )
}

export const farcasterField: ApplicationSchema<
  React.ComponentProps<typeof Farcaster>
> = {
  type: 'Farcaster',
  component: Farcaster,
  getValidator: field => {
    const validator = z.string().min(field.optional ? 0 : 1)
    return {
      farcaster: field.optional ? validator.optional() : validator,
    }
  },
}
