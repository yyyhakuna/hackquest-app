'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@hackquest/ui/shared/form'
import { Input, InputSlot } from '@hackquest/ui/shared/input'
import type * as React from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'

export interface FormInputProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'slot' | 'maxLength'
  > {
  /**
   * @description
   * The control object from react-hook-form
   *
   * @example
   * const form = useForm()
   * <FormInput control={form.control} name="email" />
   */
  control: Control<TFieldValues>
  /**
   * @description
   * The name of the field in the form
   */
  name: FieldPath<TFieldValues>
  /**
   * @description
   * The label of the input
   *
   * @example
   * <FormInput label="Email" />
   */
  label?: React.ReactNode
  /**
   * @description
   * The props of the label
   */
  labelProps?: React.ComponentPropsWithoutRef<typeof FormLabel>
  /**
   * @description
   * The tooltip of the input
   */
  tooltip?: React.ReactNode
  /**
   * @description
   * The slot of the input
   */
  slot?: React.ReactNode
  /**
   * @description
   * The props of the slot
   *
   * @example
   * <FormInput
   *  slot={<Icon />}
   *  slotProps={{
   *    side: 'right'
   *  }}
   * />
   */
  slotProps?: React.ComponentPropsWithoutRef<typeof InputSlot>
  /**
   * @description
   * The maximum number of characters allowed in the input
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

export function FormInput<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  tooltip,
  labelProps,
  requiredSymbol = false,
  slot,
  slotProps,
  maxLength = false,
  ...props
}: FormInputProps<TFieldValues>) {
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
            <Input {...props} {...field} {...(maxLength && { maxLength })}>
              {slot && <InputSlot {...slotProps}>{slot}</InputSlot>}
            </Input>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
