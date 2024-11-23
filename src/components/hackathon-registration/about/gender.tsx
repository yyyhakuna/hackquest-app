import { FormRadioCards } from '@/components/common/form-radio-cards'
import type * as React from 'react'
import type { Control, FieldValues } from 'react-hook-form'
import * as z from 'zod'
import type { ApplicationField, ApplicationSchema } from '../type'

const genderOptions = ['Man', 'Woman', 'Others'] as const

export function Gender({
  control,
  field,
}: {
  control: Control<FieldValues>
  field: ApplicationField
}) {
  return (
    <FormRadioCards
      control={control}
      name="gender"
      label="Gender"
      requiredSymbol={!field.optional}
      options={genderOptions.map(gender => ({
        label: gender,
        value: gender,
      }))}
    />
  )
}

export const genderField: ApplicationSchema<
  React.ComponentProps<typeof Gender>
> = {
  type: 'Gender',
  component: Gender,
  getValidator: field => {
    const validator = z.string().min(field.optional ? 0 : 1)
    return {
      gender: field.optional ? validator.optional() : validator,
    }
  },
}
