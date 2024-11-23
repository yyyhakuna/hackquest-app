'use client'

import { FormInput } from '@/components/common/form-input'
import { FormTextarea } from '@/components/common/form-textarea'
import { useProjectId } from '@/hooks/project/query'
import { Button } from '@hackquest/ui/shared/button'
import { useFormContext } from 'react-hook-form'
import { LuArrowRight } from 'react-icons/lu'
import { useSubmit } from '../utils/use-submit'
import type { FormValues } from '../utils/validations'
import { UploadImage } from './upload-image'

export function ProjectInfo() {
  const projectId = useProjectId()
  const form = useFormContext<FormValues>()

  const { onSubmit, isPending } = useSubmit({ projectId, form })

  return (
    <div className="flex flex-col gap-6 max-sm:pt-6 sm:mx-auto sm:max-w-[613px]">
      <div className="flex gap-6 max-sm:items-center sm:gap-4">
        <UploadImage />
        <div className="flex-1 space-y-3">
          <FormInput
            control={form.control}
            name="name"
            label="Name"
            placeholder="Project Name"
            maxLength={80}
          />
          <FormTextarea
            control={form.control}
            name="oneLineIntro"
            label="Intro"
            placeholder="Project Intro"
            maxLength={200}
          />
        </div>
      </div>
      <Button loading={isPending} onClick={form.handleSubmit(onSubmit)}>
        Save Edit
        <LuArrowRight className="icon-hover-translate size-4" />
      </Button>
    </div>
  )
}
