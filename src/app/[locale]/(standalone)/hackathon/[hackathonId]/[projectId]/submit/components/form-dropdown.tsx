'use client'

import { Link } from '@/app/navigation'
import MenuLink from '@/constants/menu-link'
import { cn } from '@hackquest/ui/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@hackquest/ui/shared/dropdown-menu'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@hackquest/ui/shared/form'
import * as React from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { LuArrowRight, LuCheck, LuChevronDown, LuLoader } from 'react-icons/lu'

export interface FormDropdownProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label?: React.ReactNode
  loading?: boolean
  options?: ReadonlyArray<{
    value: string
    label: string
    disabled?: boolean
  }>
}

export function FormDropdown<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  loading,
  options = [],
}: FormDropdownProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full text-left">
          <FormLabel>
            {label}
            <span className="text-destructive-600">*</span>
          </FormLabel>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <FormControl>
                <button className="body-s group flex h-10 w-full items-center justify-between rounded-lg border border-neutral-300 p-2 outline-none transition-colors duration-300 aria-[invalid=true]:border-destructive-600">
                  <span className="truncate">
                    {field.value
                      ? options.find(option => option.value === field.value)
                          ?.label
                      : 'Please select'}
                  </span>
                  <LuChevronDown className="size-4 shrink-0 text-neutral-600 transition-transform duration-200 group-aria-expanded:rotate-180" />
                </button>
              </FormControl>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[var(--radix-popper-anchor-width)] rounded-lg border border-neutral-200 px-0 py-3 shadow-card">
              {loading ? (
                <div className="my-8 flex w-full items-center justify-center">
                  <LuLoader className="animate-spin" />
                </div>
              ) : (
                <React.Fragment>
                  {options.map(option => (
                    <DropdownMenuItem
                      key={option.value}
                      disabled={option.disabled}
                      className={cn(
                        'headline-s flex items-center justify-between rounded p-2',
                        {
                          'bg-neutral-100': option.value === field.value,
                        },
                      )}
                      onClick={() => {
                        field.onChange(option.value)
                      }}
                    >
                      <span>{option.label}</span>
                      {option.disabled && (
                        <span className="body-s rounded-full bg-neutral-100 px-4 font-normal text-primary-neutral">
                          Submitted
                        </span>
                      )}
                      {option.value === field.value && <LuCheck />}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem
                    asChild
                    className="headline-s flex items-center justify-between rounded p-2"
                  >
                    <Link href={`${MenuLink.BUILDER_HOME}`}>
                      <span>Create new project</span>
                      <LuArrowRight className="ml-1.5 size-4" />
                    </Link>
                  </DropdownMenuItem>
                </React.Fragment>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
