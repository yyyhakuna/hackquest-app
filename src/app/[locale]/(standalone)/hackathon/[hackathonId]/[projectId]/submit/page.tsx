'use client'

import { Link, useRouter } from '@/app/navigation'
import { FormCheckboxCards } from '@/components/common/form-checkbox-cards'
import MenuLink from '@/constants/menu-link'
import type { ProjectExtend } from '@/graphql/generated/graphql'
import { useProjectSubmitMutation } from '@/graphql/generated/hooks'
import {
  useDefaultValues,
  useFormSchema,
  useHackathonId,
  useHackathonPrizeTracksQuery,
  useHackathonQuery,
  useValidateProjectQuery,
} from '@/hooks/hackathon/query'
import { useProjectSubmitInfoQuery } from '@/hooks/project/query'
import { useToggle } from '@/hooks/utils/use-toggle'
import { isUUID } from '@/lib/is'
import { Button } from '@hackquest/ui/shared/button'
import { Form } from '@hackquest/ui/shared/form'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@hackquest/ui/shared/tooltip'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { omit } from 'lodash-es'
import * as React from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { LuArrowRight, LuInfo } from 'react-icons/lu'
import * as z from 'zod'
import { ExitAlertDialog } from '../../components/exit-alert-dialog'
import { FormFieldRender } from '../../components/form-field-render'
import { useExitDialog } from '../../components/layout-header'
import { SuccessAlertDialog } from '../../components/success-alert-dialog'
import { FormDropdown } from './components/form-dropdown'

function processFormData(data: FieldValues, submissionFields: any[]) {
  const fields = omit(data, ['fromId', 'prizeTrack'])
  const info: Record<string, any> = {}
  const processedFields: Record<string, any> = {}

  Object.keys(fields).forEach(key => {
    if (isUUID(key)) {
      const field = submissionFields.find(f => f.id === key)
      if (field) {
        processedFields[key] = {
          label: field.property.label,
          value: fields[key],
        }
      }
    } else {
      info[key] = fields[key]
    }
  })

  return { info, processedFields }
}

function formatValues(
  values?: Pick<ProjectExtend, 'fromId' | 'prizeTrack' | 'fields'> | null,
) {
  const tracks = values?.prizeTrack?.split(',')
  const fields = Object.entries(values?.fields ?? {}).reduce(
    (acc, [key, field]) => {
      acc[key] = (field as { value: string })?.value
      return acc
    },
    {} as Record<string, string>,
  )

  return { fromId: values?.fromId ?? '', prizeTrack: tracks ?? [], ...fields }
}

const baseSchema = z.object({
  fromId: z.string().min(1),
  prizeTrack: z.array(z.string()).min(1),
})

export default function Page() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const hackathonId = useHackathonId()
  const { data: hackathon } = useHackathonQuery()
  const { data: submittedInfo } = useProjectSubmitInfoQuery()
  const { data: prizeTracks } = useHackathonPrizeTracksQuery()
  const { data: validateProject, isLoading } = useValidateProjectQuery()

  const [open, onOpenChange] = useToggle(false)
  const exitDialog = useExitDialog()

  const submissionFields = Array.isArray(hackathon?.info?.submission)
    ? hackathon.info.submission
    : Object.values(hackathon?.info?.submission ?? {}).flat()

  const fieldsSchema = useFormSchema(submissionFields)

  const formSchema = z.object({
    ...baseSchema.shape,
    ...fieldsSchema.shape,
  })

  const defaultValues = useDefaultValues(formSchema)

  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const isValid = form.formState.isValid

  const submit = useProjectSubmitMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: query => {
          return [
            'ListValidateProjects',
            'ListProjectsBySelf',
            'ListHackathonsBySelf',
          ].includes(query.queryKey[0] as string)
        },
      })
      if (exitDialog.open) {
        toast.success('Project submission information saved')
        exitDialog.onOpenChange(false)
        router.push(MenuLink.BUILDER_HOME)
      } else {
        toast.success('Project submitted')
        onOpenChange(true)
      }
    },
    onError: _error => {
      toast.error('Failed to submit project')
    },
  })

  function onValid(data: FieldValues) {
    const { info, processedFields } = processFormData(data, submissionFields)
    submit.mutate({
      data: {
        fromId: data.fromId,
        hackathonId,
        prizeTrack: {
          set: data.prizeTrack.join(),
        },
        fields: {
          ...info,
          ...processedFields,
        },
        isSubmit: {
          set: true,
        },
      },
    })
  }

  React.useEffect(() => {
    const values = formatValues(submittedInfo)
    Object.entries(values).forEach(([key, value]) => {
      form.setValue(key, value)
    })
  }, [submittedInfo, form.setValue])

  return (
    <div className="rounded-3xl bg-neutral-white p-8">
      <h1 className="title-1 mb-1.5 text-center">Submisstion Prject</h1>
      <p className="body-s text-center text-secondary-neutral">
        {hackathon?.name}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onValid)}
          className="mt-8 flex flex-col gap-6"
        >
          <FormDropdown
            control={form.control}
            name="fromId"
            label="Submisstion project"
            loading={isLoading}
            options={validateProject?.map(project => ({
              label: project.name,
              value: project.id,
              disabled: project.isSubmit,
            }))}
          />
          <FormCheckboxCards
            control={form.control}
            name="prizeTrack"
            requiredSymbol
            checkboxCardsProps={{
              className: 'grid grid-cols-2 gap-3',
            }}
            label="Which Prize Track Do You Belong To (Please select all that apply)"
            tooltip={<PrizeTrackTooltip />}
            options={prizeTracks?.map(track => ({
              label: track.name,
              value: track.name,
            }))}
          />
          {submissionFields.map(field => (
            <FormFieldRender key={field.id} field={field} type="submission" />
          ))}
          <Button
            className="self-end"
            type="submit"
            loading={!exitDialog.open && submit.isPending}
          >
            Confirm
            <LuArrowRight className="size-4" />
          </Button>
        </form>
      </Form>
      <SuccessAlertDialog
        title="Successfully Submission Project"
        description={hackathon?.name}
        open={open}
        onOpenChange={onOpenChange}
      >
        <Button
          variant="outline"
          color="neutral"
          className="w-full sm:w-auto"
          onClick={() => {
            form.reset()
            onOpenChange(false)
            router.replace(`/hackathon/${hackathonId}/null/submit`)
          }}
        >
          Submission another project
        </Button>
        <Link href={MenuLink.BUILDER_HOME}>
          <Button
            variant="outline"
            color="neutral"
            className="w-full sm:w-auto"
          >
            Back to my hackathon
          </Button>
        </Link>
      </SuccessAlertDialog>
      <ExitAlertDialog
        open={exitDialog.open}
        onOpenChange={exitDialog.onOpenChange}
        loading={exitDialog.open && submit.isPending}
        onSave={() => {
          if (isValid) {
            const values = form.getValues()
            onValid(values)
          } else {
            exitDialog.onOpenChange(false)
            router.push(MenuLink.BUILDER_HOME)
          }
        }}
      />
    </div>
  )
}

function PrizeTrackTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="outline-none">
            <LuInfo className="size-4 fill-primary" />
          </button>
        </TooltipTrigger>
        <TooltipContent
          align="start"
          className="body-s w-80 rounded-xl border border-neutral-300 bg-neutral-white p-6 text-primary-neutral"
        >
          <p>
            Submitting this hackathon application ensures that your chosen BUIDL
            applies for the selected track in this hackathon. After submitting
            this application, you may proceed to apply for bounties. Bounty
            applications are optional.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
