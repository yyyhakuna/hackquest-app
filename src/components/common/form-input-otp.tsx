'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@hackquest/ui/shared/form'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@hackquest/ui/shared/input-otp'
import type * as React from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'

export interface FormInputOTPProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  /**
   * @description
   * The control object from react-hook-form
   */
  control: Control<TFieldValues>
  /**
   * @description
   * The name of the field
   */
  name: FieldPath<TFieldValues>
  /**
   * @description
   * The label of the field
   */
  label?: React.ReactNode
  /**
   * @description
   * The props for the label
   */
  labelProps?: React.ComponentPropsWithoutRef<typeof FormLabel>
  /**
   * @description
   * The maximum length of the OTP
   *
   * @default 6
   */
  maxLength?: number
  /**
   * @description
   * Whether the OTP input is disabled
   */
  disabled?: boolean
  /**
   * @description
   * The props for the OTP input group
   */
  inputOTPGroupProps?: React.ComponentPropsWithoutRef<typeof InputOTPGroup>
  /**
   * @description
   * The props for the OTP input slot
   */
  inputOTPSlotProps?: React.ComponentPropsWithoutRef<typeof InputOTPSlot>
  /**
   * @description
   * Whether the OTP input is in error state
   */
  error?: boolean
}

export function FormInputOTP<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  labelProps,
  maxLength = 6,
  disabled,
  error,
  inputOTPGroupProps,
  inputOTPSlotProps,
  ...props
}: FormInputOTPProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full text-left">
          {label && <FormLabel {...labelProps}>{label}</FormLabel>}
          <FormControl>
            <InputOTP
              {...props}
              {...field}
              error={error}
              maxLength={maxLength}
              disabled={disabled}
            >
              <InputOTPGroup {...inputOTPGroupProps}>
                {Array.from({ length: maxLength }).map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    {...inputOTPSlotProps}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
