'use client'

import { cn } from '@hackquest/ui/lib/utils'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@hackquest/ui/shared/form'
import { RadioCards, RadioCardsItem } from '@hackquest/ui/shared/radio-cards'
import type * as React from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'

export interface FormRadioCardsProps<
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
   * The options to display in the radio cards
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
   * The label of the radio cards
   *
   * @example
   * <FormRadioCards label="Select an option" />
   */
  label?: string
  /**
   * @description
   * The props of the label
   */
  labelProps?: React.ComponentPropsWithoutRef<typeof FormLabel>
  /**
   * @description
   * Whether to show the required symbol
   * @default false
   */
  requiredSymbol?: boolean
  /**
   * @description
   * The props of the radio cards
   */
  radioCardsProps?: React.ComponentProps<typeof RadioCards>
  /**
   * @description
   * The props of the radio cards item
   */
  radioCardsItemProps?: Omit<
    React.ComponentProps<typeof RadioCardsItem>,
    'value' | 'disabled'
  >
  /**
   * @description
   * The tooltip of the field
   */
  tooltip?: React.ReactNode
}

export function FormRadioCards<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  options = [],
  label,
  labelProps,
  requiredSymbol = false,
  radioCardsProps,
  radioCardsItemProps,
  tooltip,
  className,
  ...props
}: FormRadioCardsProps<TFieldValues>) {
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
            <RadioCards
              {...radioCardsProps}
              value={field.value}
              onValueChange={value => {
                field.onChange(value)
                radioCardsProps?.onValueChange?.(value)
              }}
            >
              {options.map(option => (
                <FormControl key={option.value}>
                  <RadioCardsItem
                    {...radioCardsItemProps}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </RadioCardsItem>
                </FormControl>
              ))}
            </RadioCards>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
