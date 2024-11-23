'use client'

import { useProjectId } from '@/hooks/project/query'
import webApi from '@/service'
import { IconButton } from '@hackquest/ui/shared/icon-button'
import { Spinner } from '@hackquest/ui/shared/spinner'
import { Upload, UploadInput } from '@hackquest/ui/shared/upload'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiEdit3 } from 'react-icons/fi'
import { useSubmit } from '../utils/use-submit'
import type { FormValues } from '../utils/validations'

export function UploadImage() {
  const projectId = useProjectId()

  const form = useFormContext<FormValues>()

  const imageUrl = form.watch('logo')

  const { onSubmit, isPending: isSubmitPending } = useSubmit({
    projectId,
    form,
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => webApi.commonApi.singleUpload(data),
    onSuccess: data => {
      form.setValue('logo', data)
      form.handleSubmit(onSubmit)()
    },
    onError: _error => {
      toast.error('Project logo upload failed')
    },
  })

  async function onValueChange(error: Error | null, files: File[] | null) {
    if (error) {
      toast.error(error.message)
      return
    }
    const file = files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append('files', file)
      formData.append('path', 'hackathons/projects/logo')
      mutate(formData)
    }
  }

  const loading = isPending || isSubmitPending

  return (
    <Upload
      className="size-20 sm:size-32"
      onValueChange={onValueChange}
      dropzoneOptions={{
        accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
      }}
    >
      <UploadInput className="group relative flex size-20 items-center justify-center overflow-hidden rounded-2xl border border-neutral-300 bg-neutral-100 outline-0 sm:size-32">
        {imageUrl ? (
          <div className="relative size-full">
            <Image
              src={imageUrl}
              alt="Project Logo"
              fill
              className="rounded-2xl object-cover"
            />
            <IconButton
              type="button"
              className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-9 border-none bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:size-14"
            >
              <FiEdit3 className="size-4 sm:size-5" />
            </IconButton>
          </div>
        ) : loading ? (
          <Spinner />
        ) : (
          <IconButton
            type="button"
            className="size-9 border-none bg-primary enabled:hover:bg-primary-400 sm:size-14"
          >
            <FiEdit3 className="size-4 sm:size-5" />
          </IconButton>
        )}
      </UploadInput>
    </Upload>
  )
}
