import { FormInput } from '@/components/common/form-input'
import { FormSelect } from '@/components/common/form-select'
import { useCreateCoLearningMemberMutation } from '@/graphql/generated/hooks'
import { Button } from '@hackquest/ui/shared/button'
import { Form, FormControl, FormField } from '@hackquest/ui/shared/form'
import { Input } from '@hackquest/ui/shared/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { LuCheck } from 'react-icons/lu'
import * as z from 'zod'
import { useRegisterContext } from './register-context'

type Item = {
  label: string
  placeholder: string
  name: string
  required: boolean
}

const Questions = ({ abouts }: { abouts: Record<string, any>[] }) => {
  const data: Item[] = abouts!.flatMap(obj => {
    if (obj?.selected) {
      return {
        label: obj?.property?.label ?? obj?.type,
        placeholder: obj?.property?.placeholder ?? obj?.title,
        name: obj?.property?.name ?? obj?.type.toLowerCase(),
        required: obj?.required,
      }
    }
    return [] // return an empty array to exclude unselected items
  })
  const schemaObject: Record<string, z.ZodString> = data.reduce(
    (prev, obj) => ({
      ...prev,
      [obj.name]: obj.required ? z.string().min(1) : z.string().optional(),
    }),
    {},
  )
  const coLearningId = useParams().id as string

  const formSchema = z.object(schemaObject)
  type FormValue = z.infer<typeof formSchema>

  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })
  const { baseInfoForm } = useRegisterContext()
  const { mutateAsync } = useCreateCoLearningMemberMutation()
  const onValid = async (data: FormValue) => {
    const isContinue = await baseInfoForm.trigger()
    if (!isContinue) return
    const baseInfoData = baseInfoForm.getValues()
    const info = { ...baseInfoData, ...data }
    toast.promise(
      mutateAsync({
        data: {
          coLearningId,
          info,
        },
      }),
      {
        loading: 'Loading',
        error: 'Failed to Register',
        success: 'Register success',
      },
    )
  }
  return (
    <Form {...form}>
      <div className="space-y-6">
        <div className="title-5 text-primary-neutral">Personal Info</div>
        {data.map(obj =>
          obj.name === 'who recommended this event to you?' ? (
            <FormInput
              key={obj.name}
              control={form.control}
              name={obj.name as keyof FormValue}
              label={obj.label}
              placeholder={obj.placeholder}
              requiredSymbol={obj.required}
            />
          ) : (
            <FormSelect
              key={obj.name}
              control={form.control}
              name={obj.name as keyof FormValue}
              label={obj.label}
              requiredSymbol={obj.required}
              options={[{ label: 'aa', value: 'aa' }]}
            />
          ),
        )}
      </div>
      <Button onClick={form.handleSubmit(onValid)} className="w-full">
        Submit <LuCheck />{' '}
      </Button>
    </Form>
  )
}

export default Questions
