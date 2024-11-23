'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@hackquest/ui/shared/form'
import { Input } from '@hackquest/ui/shared/input'
import type * as React from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'

export interface FormDatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
> extends React.ComponentProps<typeof Input> {
  /**
   * @description
   * React Hook Form control
   */
  control: Control<TFieldValues>
  /**
   * @description
   * React Hook Form field name
   */
  name: FieldPath<TFieldValues>
  /**
   * @description
   * The label of the date picker
   */
  label?: React.ReactNode
  /**
   * @description
   * The props for the label
   */
  labelProps?: React.ComponentProps<typeof FormLabel>
  /**
   * @description
   * Whether to show the required symbol
   */
  requiredSymbol?: boolean
  /**
   * @description
   * The props for the tooltip
   */
  tooltip?: React.ReactNode
}

export function FormDatePicker<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  requiredSymbol = true,
  labelProps,
  tooltip,
  type = 'datetime-local',
  ...props
}: FormDatePickerProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full text-left">
          <div className="flex items-center justify-start gap-2">
            {label && (
              <FormLabel {...labelProps}>
                {label}
                {requiredSymbol && (
                  <span className="text-destructive-600">*</span>
                )}
              </FormLabel>
            )}
            {tooltip}
          </div>
          <FormControl>
            <Input
              className="px-2 py-0"
              inputClassName="h-full"
              {...field}
              {...props}
              type={type}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
