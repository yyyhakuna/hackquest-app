import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@hackquest/ui/shared/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@hackquest/ui/shared/select'
import type * as React from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'

export interface FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  /**
   * @description
   * The control object from react-hook-form
   *
   * @example
   * const form = useForm()
   * <FormSelect control={form.control} />
   */
  control: Control<TFieldValues>
  /**
   * @description
   * The name of the field in the form
   */
  name: FieldPath<TFieldValues>
  /**
   * @description
   * The label of the select
   */
  label?: React.ReactNode
  /**
   * @description
   * The props of the label
   */
  labelProps?: React.ComponentPropsWithoutRef<typeof FormLabel>
  /**
   * @description
   * The tooltip of the select
   */
  tooltip?: React.ReactNode
  /**
   * @description
   * Whether to show the required symbol
   * @default false
   */
  requiredSymbol?: boolean
  /**
   * @description
   * The options of the select
   *
   * @example
   * <FormSelect options={[{ label: 'Option 1', value: 'option1' }, { label: 'Option 2', value: 'option2' }]} />
   */
  options: Readonly<
    {
      label: string
      value: string
      disabled?: boolean
    }[]
  >

  selectProps?: React.ComponentPropsWithoutRef<typeof Select>
  selectContentProps?: React.ComponentPropsWithoutRef<typeof SelectContent>
  selectItemProps?: Omit<
    React.ComponentPropsWithoutRef<typeof SelectItem>,
    'value' | 'disabled'
  >
  selectTriggerProps?: React.ComponentPropsWithoutRef<typeof SelectTrigger>
  selectValueProps?: React.ComponentPropsWithoutRef<typeof SelectValue>
}

export function FormSelect<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  labelProps,
  requiredSymbol = false,
  tooltip,
  options,
  selectProps,
  selectContentProps,
  selectItemProps,
  selectTriggerProps,
  selectValueProps,
}: FormSelectProps<TFieldValues>) {
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
          <Select
            {...selectProps}
            // hack: change this defaultValue to value
            // the value of select remain the same even after form.reset(), but value in object changes.
            value={field.value}
            onValueChange={value => {
              field.onChange(value)
              selectProps?.onValueChange?.(value)
            }}
          >
            <FormControl>
              <SelectTrigger {...selectTriggerProps}>
                <SelectValue
                  placeholder={selectValueProps?.placeholder || 'Please select'}
                  {...selectValueProps}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent {...selectContentProps}>
              {options.map(option => (
                <SelectItem
                  {...selectItemProps}
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
