import { FormInput } from '@/components/common/form-input'
import { Form, FormControl, FormField } from '@hackquest/ui/shared/form'
import { Input } from '@hackquest/ui/shared/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

type Item = {
  label: string
  placeholder: string
  name: string
  required: boolean
}

const BaseInfo = ({ infos }: { infos: Record<string, any>[] }) => {
  console.log(infos)
  const data: Item[] = infos!.flatMap(obj => {
    if (obj?.selected) {
      if (obj.type === 'First and Last Name') {
        return {
          label: 'Name',
          placeholder: 'Enter your name',
          name: 'name',
          required: obj?.required,
        }
      }
      return {
        label: obj?.property?.label ?? obj?.type,
        placeholder: obj?.property?.placeholder ?? obj?.title,
        name: obj?.property?.name ?? obj?.type.toLowerCase(),
        required: obj?.required,
      }
    }
    return []
  })
  const schemaObject: Record<string, z.ZodString> = data.reduce(
    (prev, obj) => ({
      ...prev,
      [obj.name]: obj.required ? z.string().min(1) : z.string().optional(),
    }),
    {},
  )

  const formSchema = z.object(schemaObject)
  type FormValue = z.infer<typeof formSchema>

  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  return (
    <Form {...form}>
      <div className="space-y-6">
        <div className="title-5 text-primary-neutral">Personal Info</div>
        {data.map(obj => (
          <FormInput
            key={obj.name}
            control={form.control}
            name={obj.name as keyof FormValue}
            label={obj.label}
            placeholder={obj.placeholder}
            requiredSymbol={obj.required}
          />
        ))}
      </div>
    </Form>
  )
}

export default BaseInfo
