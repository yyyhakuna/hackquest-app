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
import { LuArrowRight } from 'react-icons/lu'
import { ExitAlertDialog } from '../../components/exit-alert-dialog'
import { FormFieldRender } from '../../components/form-field-render'
import { useExitDialog } from '../../components/layout-header'
import { useHackathonRegistrationContext } from './context'

export function AboutSection({
  fields,
}: {
  fields: ApplicationField[]
}) {
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const hackathonId = useHackathonId()
  const router = useRouter()
  const context = useHackathonRegistrationContext()
  const { open, onOpenChange } = useExitDialog()

  const { data: info } = useHackathonRegisterInfoQuery()

  const initialValues = info?.info || {}

  const utmSource = searchParams.get('utm')

  const sortedFields = fields?.sort((a, b) =>
    a.type === 'ResumeUpload' ? -1 : b.type === 'ResumeUpload' ? 1 : 0,
  )

  const formSchema = useFormSchema(sortedFields)

  const defaultValues = useDefaultValues(formSchema, initialValues?.About)

  const register = useHackathonRegisterMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GetHackathonRegisterInfo'] })
      toast.success('Registration information saved')
      if (open) {
        onOpenChange(false)
        router.push(MenuLink.BUILDER_HOME)
      } else {
        context.setStep(prev => prev + 1)
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
      context.setStep(prev => prev + 1)
    }
  }

  function onSubmit(data: FieldValues, isExit?: boolean) {
    register.mutate({
      hackathonId,
      data: {
        info: {
          ...omit(initialValues, 'About'),
          About: data,
        },
        status: isExit && !isValid ? 'About' : 'OnlineProfiles',
        utmSource,
      },
    })
  }

  return (
    <React.Fragment>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onValid)}
          className="mt-8 flex flex-col gap-6"
        >
          {sortedFields?.map(field => (
            <FormFieldRender key={field.id} field={field} />
          ))}
          <Button
            className="self-end"
            type="submit"
            loading={!open && register.isPending}
          >
            Continue
            <LuArrowRight className="size-4" />
          </Button>
        </form>
      </Form>
      <ExitAlertDialog
        open={open}
        onOpenChange={onOpenChange}
        loading={open && register.isPending}
        onSave={() => {
          const values = form.getValues()
          if (isValid) {
            onSubmit(values, true)
          } else {
            onOpenChange(false)
            setTimeout(() => {
              router.back()
            }, 100)
          }
        }}
      />
    </React.Fragment>
  )
}
