'use client'

import { cn } from '@hackquest/ui/lib/utils'
import {
  CheckboxCards,
  CheckboxCardsItem,
} from '@hackquest/ui/shared/checkbox-cards'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@hackquest/ui/shared/form'
import type * as React from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'

export interface FormCheckboxCardsProps<
  TFieldValues extends FieldValues = FieldValues,
> extends React.InputHTMLAttributes<HTMLDivElement> {
  /**
   * @description
   * The control object from react-hook-form
   *
   * @example
   * const form = useForm()
   */
  control: Control<TFieldValues>
  /**
   * @description
   * The name of the field in the form
   */
  name: FieldPath<TFieldValues>
  /**
   * @description
   * The label of the field
   */
  label?: string
  /**
   * @description
   * The label props
   */
  labelProps?: React.ComponentProps<typeof FormLabel>
  /**
   * @description
   * The options to display in the checkbox cards
   */
  options?: Readonly<
    {
      label: string
      value: string
      disabled?: boolean
    }[]
  >
  /**
   * @description
   * Whether to display a required symbol
   */
  requiredSymbol?: boolean
  /**
   * @description
   * The props of the checkbox cards
   */
  checkboxCardsProps?: React.ComponentProps<typeof CheckboxCards>
  /**
   * @description
   * The props of the checkbox cards item
   */
  checkboxCardsItemProps?: Omit<
    React.ComponentProps<typeof CheckboxCardsItem>,
    'value' | 'disabled'
  >
  /**
   * @description
   * The tooltip of the field
   */
  tooltip?: React.ReactNode
}

export function FormCheckboxCards<
  TFieldValues extends FieldValues = FieldValues,
>({
  control,
  name,
  label,
  labelProps,
  options = [],
  requiredSymbol = false,
  checkboxCardsProps,
  checkboxCardsItemProps,
  tooltip,
  className,
  ...props
}: FormCheckboxCardsProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('w-full text-left', className)} {...props}>
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
            <CheckboxCards
              {...checkboxCardsProps}
              value={field.value}
              onValueChange={value => {
                field.onChange(value)
                checkboxCardsProps?.onValueChange?.(value)
              }}
            >
              {options.map(option => (
                <FormControl key={option.value}>
                  <CheckboxCardsItem
                    {...checkboxCardsItemProps}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </CheckboxCardsItem>
                </FormControl>
              ))}
            </CheckboxCards>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
