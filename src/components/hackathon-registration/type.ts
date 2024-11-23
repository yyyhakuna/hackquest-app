import applications from '@/public/data/applications.json'
import type * as React from 'react'
import type * as z from 'zod'

const about = applications.About
const onlineProfiles = applications.OnlineProfiles
const contact = applications.Contact

type CustomFormType = 'input' | 'radio'

export interface BaseFormField<T extends CustomFormType> {
  id: string
  type: T
  optional?: boolean
  property: {
    label: string
    placeholder?: string
  }
}

export interface FormInputField extends BaseFormField<'input'> {}

export interface FormRadioField extends BaseFormField<'radio'> {
  property: {
    label: string
    placeholder?: string
    options: ReadonlyArray<{
      label: string
      value: string
    }>
  }
}

export type ApplicationField = (typeof about)[number] &
  (typeof onlineProfiles)[number] &
  (typeof contact)[number] & {
    id: string
    type: string
    optional?: boolean
    property: {
      label: string
      placeholder?: string
      maxCharacters?: number
      options?: string[]
    }
  }

export type ApplicationSchema<T = unknown> = Pick<ApplicationField, 'type'> & {
  component: React.FC<T>
  getValidator: (field: ApplicationField) => Record<string, z.ZodType>
}
