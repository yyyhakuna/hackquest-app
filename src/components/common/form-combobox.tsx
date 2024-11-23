'use client'

import { useToggle } from '@/hooks/utils/use-toggle'
import { cn } from '@hackquest/ui/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@hackquest/ui/shared/command'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@hackquest/ui/shared/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@hackquest/ui/shared/popover'
import type * as React from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { LuCheck, LuChevronDown } from 'react-icons/lu'

export interface FormComboboxProps<
  TFieldValues extends FieldValues = FieldValues,
> extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @description
   */
  control: Control<TFieldValues>
  /**
   * @description
   * React Hook Form field name
   */
  name: FieldPath<TFieldValues>
  /**
   * @description
   * The label of the combobox
   */
  label?: React.ReactNode
  /**
   * @description
   * The props for the label
   */
  labelProps?: React.ComponentProps<typeof FormLabel>
  /**
   * @description
   */
  requiredSymbol?: boolean
  /**
   * @description
   * The tooltip of the combobox
   */
  tooltip?: React.ReactNode
  /**
   * @description
   * The placeholder of the combobox
   */
  placeholder?: string
  /**
   * @description
   * The options of the combobox
   */
  options?: ReadonlyArray<{
    value: string
    label: string
  }>
  /**
   * @description
   * The loading state of the combobox
   */
  loading?: boolean
  disabled?: boolean
}

export function FormCombobox<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  labelProps,
  requiredSymbol,
  disabled = false,
  tooltip,
  placeholder = 'Select...',
  options = [],
  loading,
}: FormComboboxProps<TFieldValues>) {
  const [open, onOpenChange] = useToggle(false)

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
          <Popover open={open} onOpenChange={onOpenChange}>
            <PopoverTrigger asChild disabled={disabled}>
              <FormControl>
                <button
                  type="button"
                  role="combobox"
                  className={cn(
                    'body-s flex h-10 w-full items-center justify-between rounded-md border border-neutral-300 p-2 outline-none aria-[invalid=true]:border-destructive-600',
                    field.value ? 'text-primary-neutral' : 'text-neutral-400',
                  )}
                  aria-controls="combobox-list"
                  aria-expanded="false"
                >
                  <span>
                    {loading
                      ? 'Fetching your timezone...'
                      : field.value
                        ? options.find(option => option.value === field.value)
                            ?.label
                        : placeholder}
                  </span>
                  <LuChevronDown className="size-4 shrink-0" />
                </button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
              <Command>
                <CommandInput placeholder="Search..." className="h-9" />
                <CommandList className="scroll-wrap-y">
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {options.map(option => (
                      <CommandItem
                        value={option.label}
                        key={option.value}
                        onSelect={() => {
                          field.onChange(option.value)
                          onOpenChange(false)
                        }}
                      >
                        {option.label}
                        <LuCheck
                          className={cn(
                            'ml-auto size-4',
                            option.value === field.value
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
