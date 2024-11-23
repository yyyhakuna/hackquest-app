'use client'
import { FormInput } from '@/components/common/form-input'
import { useListCoLearningQuery } from '@/graphql/generated/hooks'
import { Form } from '@hackquest/ui/shared/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { IoCloseOutline } from 'react-icons/io5'
import * as z from 'zod'
import BaseInfo from './base-info'
import Questions from './questions'
import { RegisterContextProvider } from './register-context'

type Item = {
  label: string
  placeholder: string
  name: string
  required: boolean
}
const Register = () => {
  const coLearningId = useParams().id as string
  const { data } = useSuspenseQuery({
    queryKey: useListCoLearningQuery.getKey({
      where: {
        id: {
          equals: coLearningId,
        },
      },
    }),
    queryFn: useListCoLearningQuery.fetcher({
      where: {
        id: {
          equals: coLearningId,
        },
      },
    }),
  })

  const coLearning = data.listCoLearning.data![0]
  const infos = (coLearning?.application?.Info ?? []) as Record<string, any>[]
  const infoData: Item[] = infos!.flatMap(obj => {
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
  const schemaObject: Record<string, z.ZodString> = infoData.reduce(
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
    <RegisterContextProvider value={{ baseInfoForm: form }}>
      <div className="fixed top-0 left-0 h-screen w-screen overflow-auto bg-neutral-100">
        <div className="relative flex items-center py-4">
          <IoCloseOutline className="absolute right-6 size-6" />
          <div className="text-center title-3 text-neutral-800 w-full">
            Register
          </div>
        </div>
        <div className="p-6 space-y-6">
          <Form {...form}>
            <div className="space-y-6">
              <div className="title-5 text-primary-neutral">Personal Info</div>
              {infoData.map(obj => (
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
          <Questions abouts={coLearning?.application.About ?? []} />
        </div>
      </div>
    </RegisterContextProvider>
  )
}

export default Register
