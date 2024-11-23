'use client'

import { FormInput } from '@/components/common/form-input'
import { FormSelect } from '@/components/common/form-select'
import { FormTextarea } from '@/components/common/form-textarea'
import { ResponsiveDialog } from '@/components/common/responsive-dialog'
import type { WorkType } from '@/graphql/generated/graphql'
import {
  useCreateUserWorkExperienceMutation,
  useUpdateUserWorkExperienceMutation,
} from '@/graphql/generated/hooks'
import dayjs from '@/lib/dayjs'
import { Button } from '@hackquest/ui/shared/button'
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@hackquest/ui/shared/dialog'
import { Form } from '@hackquest/ui/shared/form'
import { ScrollArea } from '@hackquest/ui/shared/scroll-area'
import { Separator } from '@hackquest/ui/shared/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import pick from 'lodash-es/pick'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { EMPLOYMENT_TYPES, FULL_MONTHS, FULL_YEARS } from '../../constants'
import { formatExperienceDates } from '../../utils'
import { useDialogStore } from '../../utils/store'
import {
  type ExperienceSchema,
  experienceSchema,
} from '../../utils/validations'

const defaultValues: ExperienceSchema = {
  title: '',
  companyName: '',
  employmentType: '',
  location: '',
  description: '',
  startMonth: '',
  startYear: '',
  endMonth: '',
  endYear: '',
}

export function EditExperienceDialog() {
  const submitRef = React.useRef<HTMLInputElement>(null)

  const { open, type, state, onClose } = useDialogStore()

  const dialogOpen = open && type === 'create-experience'
  const initialValues = state?.initialValues

  const form = useForm<ExperienceSchema>({
    resolver: zodResolver(experienceSchema),
    defaultValues,
  })

  const create = useCreateUserWorkExperienceMutation({
    meta: {
      invalidates: [['FindUserProfile']],
    },
  })

  const update = useUpdateUserWorkExperienceMutation({
    meta: {
      invalidates: [['FindUserProfile']],
    },
  })

  const isPending = create.isPending || update.isPending

  function onValid(data: ExperienceSchema) {
    const input = {
      ...pick(data, ['title', 'companyName']),
      description: data.description || null,
      employmentType: data.employmentType as WorkType,
      location: data.location || null,
      isCurrentWork: false,
      startDate: dayjs(`${data.startMonth} ${data.startYear}`).format(
        'YYYY-MM-DD',
      ),
      ...(data.endYear &&
        data.endMonth &&
        data.endYear && {
          endDate: dayjs(`${data.endMonth} ${data.endYear}`).format(
            'YYYY-MM-DD',
          ),
        }),
    }
    if (initialValues) {
      toast
        .promise(
          update.mutateAsync({
            experienceId: initialValues.id,
            data: {
              title: { set: input.title },
              companyName: { set: input.companyName },
              employmentType: { set: input.employmentType },
              location: { set: input.location },
              description: { set: input.description },
              isCurrentWork: { set: input.isCurrentWork },
              startDate: { set: input.startDate },
              ...(input.endDate && { endDate: { set: input.endDate } }),
            },
          }),
          {
            loading: 'Updating experience...',
            success: 'Experience updated',
            error: 'Failed to update experience',
          },
        )
        .finally(() => {
          onClose('create-experience')
        })
    } else {
      toast
        .promise(
          create.mutateAsync({
            data: input,
          }),
          {
            loading: 'Creating experience...',
            success: 'Experience created',
            error: 'Failed to create experience',
          },
        )
        .finally(() => {
          onClose('create-experience')
        })
    }
  }

  React.useEffect(() => {
    if (initialValues) {
      form.reset({
        ...initialValues,
        ...formatExperienceDates(
          initialValues.startDate,
          initialValues?.endDate,
        ),
      })
    } else {
      form.reset(defaultValues)
    }
  }, [initialValues, form.reset])

  return (
    <ResponsiveDialog
      open={dialogOpen}
      onOpenChange={() => onClose('create-experience')}
      dialogContentProps={{ className: 'p-0 sm:w-full sm:max-w-xl' }}
      drawerContentProps={{ className: 'max-h-[80vh]' }}
    >
      <DialogHeader className="px-6 pt-6 pb-4">
        <DialogTitle className="title-3">Edit Experience</DialogTitle>
      </DialogHeader>
      <Separator className="max-sm:hidden" />
      <ScrollArea className="h-[50vh] sm:h-[60vh]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onValid)}
            className="space-y-4 px-6 pb-1 max-sm:py-4"
          >
            <FormInput
              control={form.control}
              name="title"
              label="Title"
              placeholder="e.g. Frontend Developer"
              requiredSymbol
            />
            <FormInput
              control={form.control}
              name="companyName"
              label="Company"
              placeholder="e.g. Google"
              requiredSymbol
            />
            <FormSelect
              control={form.control}
              name="employmentType"
              label="Employment Type"
              options={EMPLOYMENT_TYPES}
              requiredSymbol
            />
            <FormInput
              control={form.control}
              name="location"
              label="Location"
              placeholder="e.g. London"
            />
            <FormTextarea
              control={form.control}
              name="description"
              label="Description"
              placeholder="e.g. I worked on Google's product"
              rows={5}
              maxLength={600}
            />
            <section className="grid grid-cols-2 gap-4">
              <FormSelect
                control={form.control}
                name="startMonth"
                label="Start Date"
                options={FULL_MONTHS.map(month => ({
                  label: month,
                  value: month,
                }))}
                requiredSymbol
              />
              <FormSelect
                control={form.control}
                name="startYear"
                label="Start Year"
                labelProps={{ className: 'opacity-0' }}
                options={FULL_YEARS.map(year => ({
                  label: year,
                  value: year,
                }))}
              />
            </section>
            <section className="grid grid-cols-2 gap-4">
              <FormSelect
                control={form.control}
                name="endMonth"
                label="End Date"
                options={FULL_MONTHS.map(month => ({
                  label: month,
                  value: month,
                }))}
              />
              <FormSelect
                control={form.control}
                name="endYear"
                label="End Year"
                labelProps={{ className: 'opacity-0' }}
                options={FULL_YEARS.map(year => ({
                  label: year,
                  value: year,
                }))}
              />
            </section>
            <input ref={submitRef} type="submit" className="hidden" />
          </form>
        </Form>
      </ScrollArea>
      <Separator className="max-sm:hidden" />
      <DialogFooter className="px-6 pb-4 max-sm:py-4">
        <Button onClick={() => submitRef.current?.click()} loading={isPending}>
          Save Changes
        </Button>
      </DialogFooter>
    </ResponsiveDialog>
  )
}
