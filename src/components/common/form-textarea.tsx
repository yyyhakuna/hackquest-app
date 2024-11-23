'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@hackquest/ui/shared/form'
import { Textarea } from '@hackquest/ui/shared/textarea'
import type * as React from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'

export interface FormTextareaProps<
  TFieldValues extends FieldValues = FieldValues,
> extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'slot' | 'maxLength'
  > {
  /**
   * @description
   * The control object from react-hook-form
   */
  control: Control<TFieldValues>
  /**
   * @description
   * The name of the field in the form
   */
  name: FieldPath<TFieldValues>
  /**
   * @description
   * The label of the textarea
   */
  label?: React.ReactNode
  /**
   * @description
   * The props of the label
   */
  labelProps?: React.ComponentPropsWithoutRef<typeof FormLabel>

  /**
   * @description
   * The tooltip of the textarea
   */
  tooltip?: React.ReactNode
  /**
   * @description
   * The maximum number of characters allowed in the textarea
   * @default false
   */
  maxLength?: number | false
  /**
   * @description
   * Whether to show the required symbol
   * @default false
   */
  requiredSymbol?: boolean
}

export function FormTextarea<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  tooltip,
  labelProps,
  maxLength = false,
  requiredSymbol = false,
  ...props
}: FormTextareaProps<TFieldValues>) {
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
            {maxLength && (
              <span className="ml-auto text-secondary-neutral text-xs leading-[150%]">
                {field.value?.length ?? 0} / {maxLength}
              </span>
            )}
          </div>
          <FormControl>
            <Textarea {...props} {...field} {...(maxLength && { maxLength })} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
