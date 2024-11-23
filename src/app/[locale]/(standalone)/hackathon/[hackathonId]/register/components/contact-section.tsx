import { useRouter } from '@/app/navigation'
import type { ApplicationField } from '@/components/hackathon-registration/type'
import MenuLink from '@/constants/menu-link'
import { useHackathonRegisterMutation } from '@/graphql/generated/hooks'
import {
  useDefaultValues,
  useFormSchema,
  useHackathonId,
  useHackathonRegisterInfoQuery,
} from '@/hooks/hackathon/query'
import { Button } from '@hackquest/ui/shared/button'
import { Form } from '@hackquest/ui/shared/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { omit } from 'lodash-es'
import { useSearchParams } from 'next/navigation'
import * as React from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'
import { ExitAlertDialog } from '../../components/exit-alert-dialog'
import { FormFieldRender } from '../../components/form-field-render'
import { useExitDialog } from '../../components/layout-header'
import { useHackathonRegistrationContext } from './context'

export function ContactSection({
  fields,
}: {
  fields: ApplicationField[]
}) {
  const queryClient = useQueryClient()
  const submitRef = React.useRef<HTMLInputElement>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const hackathonId = useHackathonId()
  const { open, onOpenChange } = useExitDialog()

  const { data: info } = useHackathonRegisterInfoQuery()

  const initialValues = info?.info || {}

  const utmSource = searchParams.get('utm')

  const context = useHackathonRegistrationContext()

  const sortedFields = fields?.sort((a, b) =>
    a.type === 'Discord' ? 1 : b.type === 'Discord' ? -1 : 0,
  )

  const formSchema = useFormSchema(sortedFields)

  const defaultValues = useDefaultValues(formSchema, initialValues?.Contact)

  const register = useHackathonRegisterMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: query =>
          ['ListProjectsBySelf', 'GetHackathonRegisterInfo'].includes(
            query.queryKey[0] as string,
          ),
      })

      toast.success('Registration successful')
      if (open) {
        onOpenChange(false)
        router.push(MenuLink.BUILDER_HOME)
      } else {
        context.onOpenChange(true)
      }
    },
    onError: error => {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error(error)
    },
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const isValid = form.formState.isValid

  function onValid(data: FieldValues) {
    const hasChanges = Object.keys(data).some(
      key => data[key] !== defaultValues[key],
    )

    if (hasChanges) {
      onSubmit(data)
    } else {
      context.onOpenChange(true)
    }
  }

  function onSubmit(data: FieldValues) {
    register.mutate({
      hackathonId,
      data: {
        info: {
          ...omit(initialValues, 'Contact'),
          Contact: data,
        },
        status: 'Contact',
        isRegister: isValid,
        utmSource,
      },
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onValid)}
          className="mt-8 grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-2 sm:gap-y-6"
        >
          {sortedFields?.map(field => (
            <FormFieldRender key={field.id} field={field} />
          ))}
          <input ref={submitRef} type="submit" className="hidden" />
        </form>
      </Form>
      <div className="flex items-center justify-end gap-4">
        <Button
          variant="outline"
          color="neutral"
          onClick={() => context.setStep(2)}
        >
          <LuArrowLeft className="size-4" />
          Back
        </Button>
        <Button
          onClick={() => submitRef.current?.click()}
          loading={!open && register.isPending}
        >
          Register
          <LuArrowRight className="size-4" />
        </Button>
      </div>
      <ExitAlertDialog
        open={open}
        onOpenChange={onOpenChange}
        loading={open && register.isPending}
        onSave={() => {
          const values = form.getValues()
          onSubmit(values)
        }}
      />
    </div>
  )
}
