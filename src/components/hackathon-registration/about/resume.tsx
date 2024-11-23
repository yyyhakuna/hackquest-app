import webApi from '@/service'
import { Label } from '@hackquest/ui/shared/label'
import { Spinner } from '@hackquest/ui/shared/spinner'
import { Upload, UploadInput } from '@hackquest/ui/shared/upload'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import {
  type Control,
  type FieldError,
  type FieldValues,
  useFormContext,
} from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaFilePdf, FaFileWord } from 'react-icons/fa6'
import { FiFileText } from 'react-icons/fi'
import { LuInfo, LuUpload } from 'react-icons/lu'
import * as z from 'zod'
import type { ApplicationField, ApplicationSchema } from '../type'

const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp']

export function Resume({
  control,
  field,
}: {
  control: Control<FieldValues>
  field: ApplicationField
}) {
  const form = useFormContext<FieldValues>()

  const error = form.formState.errors.resume as FieldError

  const upload = useMutation({
    mutationFn: (data: FormData) => webApi.commonApi.singleUpload(data),
    onSuccess: data => {
      form.setValue('resume', data)
      toast.success('Resume uploaded')
    },
    onError: _error => {
      toast.error('Resume upload failed')
    },
  })

  const resume = form.watch('resume')

  async function onValueChange(error: Error | null, files: File[] | null) {
    if (error) {
      toast.error(error.message)
      return
    }
    const file = files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append('files', file)
      formData.append('path', 'hackathons/members/resume')
      upload.mutate(formData)
    }
  }

  return (
    <section className="space-y-1">
      <Label className="body-s flex items-center text-neutral-600">
        Resume
        {!field.optional && <span className="text-destructive-600">*</span>}
      </Label>
      <Upload
        onValueChange={onValueChange}
        dropzoneOptions={{
          accept: {
            'image/*': imageExtensions,
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
              ['.docx'],
            'application/msword': ['.doc'],
            'text/plain': ['.txt'],
          },
        }}
      >
        <UploadInput className="relative h-40 w-28 overflow-hidden rounded-2xl bg-neutral-100 p-2">
          <div className="flex h-full w-full items-center justify-center rounded-xl border border-neutral-300 border-dashed transition-colors duration-300 hover:border-neutral-400">
            {upload.isPending ? (
              <Spinner size={25} />
            ) : resume ? (
              resumeRender(resume)
            ) : (
              <LuUpload className="size-6 text-neutral-600" />
            )}
          </div>
        </UploadInput>
      </Upload>
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

function resumeRender(link: string) {
  if (imageExtensions.some(ext => link?.toLowerCase()?.endsWith(ext))) {
    return (
      <Image
        src={link}
        alt="resume"
        fill
        className="rounded-2xl object-cover"
      />
    )
  }

  if (link?.toLowerCase()?.endsWith('.pdf')) {
    return <FaFilePdf className="size-6 text-neutral-600" />
  }

  if (['.doc', '.docx'].some(ext => link?.toLowerCase()?.endsWith(ext))) {
    return <FaFileWord className="size-6 text-neutral-600" />
  }

  return <FiFileText className="size-6 text-neutral-600" />
}

export const resumeField: ApplicationSchema<
  React.ComponentProps<typeof Resume>
> = {
  type: 'ResumeUpload',
  component: Resume,
  getValidator(field) {
    const validator = z.string().url()
    return {
      resume: field.optional ? validator.optional() : validator,
    }
  },
}
