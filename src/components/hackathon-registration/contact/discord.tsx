import { Label } from '@hackquest/ui/shared/label'
import type * as React from 'react'
import {
  type Control,
  type FieldError,
  type FieldValues,
  useFormContext,
} from 'react-hook-form'
import { LuInfo, LuLink2 } from 'react-icons/lu'
import * as z from 'zod'
import type { ApplicationField, ApplicationSchema } from '../type'

export function Discord({
  control,
  field,
}: {
  control: Control<FieldValues>
  field: ApplicationField
}) {
  const form = useFormContext<FieldValues>()

  const error = form.formState.errors.discord as FieldError

  return (
    <section className="space-y-1">
      <Label className="body-s flex items-center text-neutral-600">
        Discord
        {!field.optional && <span className="text-destructive-600">*</span>}
      </Label>
      <button className="headline-s flex h-10 w-full items-center justify-center gap-2 rounded-md border border-neutral-300 bg-neutral-50 px-4 py-3 text-secondary-neutral transition-colors duration-300 enabled:hover:bg-neutral-100">
        <LuLink2 className="size-4" />
        <span>Link Discord</span>
      </button>
      {error && (
        <p
          role="alert"
          className="inline-flex items-center text-destructive-600 text-xs"
        >
          <LuInfo className="mr-1.5 size-4" />
          <span>{error.message}</span>
        </p>
      )}
    </section>
  )
}

export const discordField: ApplicationSchema<
  React.ComponentProps<typeof Discord>
> = {
  type: 'Discord',
  component: Discord,
  getValidator: field => {
    const validator = z.string().min(field.optional ? 0 : 1)
    return {
      discord: field.optional ? validator.optional() : validator,
    }
  },
}
