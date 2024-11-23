import { Input, InputSlot } from '@hackquest/ui/shared/input'
import type * as React from 'react'
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { LuX } from 'react-icons/lu'

export interface CustomFieldInputProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>
  register: UseFormRegister<T>
  valueAsNumber?: boolean
  required?: boolean
  error?: string
  index?: number
  remove?: (index: number) => void
}

export function CustomFieldInput<T extends FieldValues>({
  name,
  register,
  error = '',
  required = false,
  valueAsNumber = false,
  index = 0,
  remove,
  ...props
}: CustomFieldInputProps<T>) {
  return (
    <Input
      {...register(name, { required, valueAsNumber })}
      {...props}
      className="gap-2"
      aria-invalid={!!error}
    >
      <InputSlot>
        <span className="body-s inline-flex size-5 shrink-0 items-center justify-center rounded border border-neutral-300">
          {index + 1}
        </span>
      </InputSlot>
      <InputSlot side="right" role="button" onClick={() => remove?.(index)}>
        <LuX className="size-4" />
      </InputSlot>
    </Input>
  )
}
