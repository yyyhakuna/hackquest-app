import { FormInput } from '@/components/common/form-input'
import type * as React from 'react'
import type { Control, FieldValues } from 'react-hook-form'
import * as z from 'zod'
import type { ApplicationField, ApplicationSchema } from '../type'

export function WhatsApp({
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

export const whatsAppField: ApplicationSchema<
  React.ComponentProps<typeof WhatsApp>
> = {
  type: 'WhatsApp',
  component: WhatsApp,
  getValidator: field => {
    const validator = z.string().min(field.optional ? 0 : 1)
    return {
      whatsApp: field.optional ? validator.optional() : validator,
    }
  },
}
