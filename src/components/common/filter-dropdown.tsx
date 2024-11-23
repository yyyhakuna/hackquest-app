'use client'

import { useControllableState } from '@hackquest/ui/lib/use-controllable-state'
import { cn } from '@hackquest/ui/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@hackquest/ui/shared/dropdown-menu'
import * as React from 'react'
import { LuCheck, LuChevronDown } from 'react-icons/lu'

export interface FilterDropdownProps {
  label?: React.ReactNode
  options?: ReadonlyArray<{
    label: React.ReactNode
    value: string
  }>
  defaultValue?: string
  value?: string
  onValueChange?: (value: string | null) => void
  dropdownTriggerProps?: React.ComponentProps<typeof DropdownMenuTrigger>
  dropdownContentProps?: React.ComponentProps<typeof DropdownMenuContent>
  icon?: React.ReactNode
}

export function FilterDropdown({
  label,
  options,
  defaultValue,
  value: valueProp,
  onValueChange,
  dropdownContentProps,
  dropdownTriggerProps,
  icon,
}: FilterDropdownProps) {
  const [value, setValue] = useControllableState<string | null>({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  })

  const currentLabel = options?.find(option => option.value === value)?.label

  const onChange = React.useCallback(
    (newValue: string) => {
      if (newValue === value) {
        setValue(null)
      } else {
        setValue(newValue)
      }
    },
    [setValue, value],
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'inline-flex items-center justify-between gap-2 rounded-lg border border-transparent bg-neutral-100 p-3 outline-none transition-colors duration-300 aria-expanded:border-neutral-300 aria-expanded:bg-neutral-200',
            dropdownTriggerProps?.className,
          )}
        >
          <span className="font-bold text-sm">{currentLabel ?? label}</span>
          {icon ?? <LuChevronDown className="size-4" />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={dropdownContentProps?.align ?? 'start'}
        className={cn(
          'w-[11.25rem] min-w-[11.25rem] rounded-lg p-0',
          dropdownContentProps?.className,
        )}
        {...dropdownContentProps}
      >
        {options?.map(option => (
          <DropdownMenuItem
            key={option.value}
            className="flex items-center justify-between rounded px-3 py-2 font-bold text-primary-neutral text-sm"
            onClick={() => onChange(option.value)}
          >
            {option.label}
            {value === option.value && <LuCheck className="size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
