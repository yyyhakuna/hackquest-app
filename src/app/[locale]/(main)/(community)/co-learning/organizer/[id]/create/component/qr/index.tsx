
import { useHackathonId, } from '@/hooks/hackathon/query'
import webApi from '@/service'
import { Form } from '@hackquest/ui/shared/form'
import { IconButton } from '@hackquest/ui/shared/icon-button'
import { Spinner } from '@hackquest/ui/shared/spinner'
import { Upload, UploadInput } from '@hackquest/ui/shared/upload'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useForm, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiEdit3 } from 'react-icons/fi'
import { LuInfo, LuUpload } from 'react-icons/lu'
import * as z from 'zod'
import ContinueButton from '../common/continue-button'
import { useColearningContext } from '../common/creation-provider'

const formSchema = z.object({
  image: z.string().min(1),
})

type FormValues = z.infer<typeof formSchema>

export function UploadContent() {
  const _hackathonId = useHackathonId()
  const form = useFormContext<FormValues>()

  const error = form.formState.errors.image

  const imageUrl = form.watch('image')

  const upload = useMutation({
    mutationFn: (data: FormData) => webApi.commonApi.singleUpload(data),
    onSuccess: image => {
      form.setValue('image', image)
      toast.success('Hackathon image uploaded')
    },
    onError: (_error: string) => {
      toast.error('Hackathon image upload failed')
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
      formData.append('path', 'hackathons')
      upload.mutate(formData)
    }
  }

  const fullPending = upload.isPending

  return (
    <section className="space-y-2">
      <Upload
        className="aspect-video w-full"
        onValueChange={onValueChange}
        dropzoneOptions={{
          accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
        }}
      >
        <UploadInput className="group relative flex h-full items-center justify-center overflow-hidden rounded-xl bg-neutral-100 outline-0 ">
          {imageUrl ? (
            <div className="relative size-full">
              <Image
                src={imageUrl}
                alt="Hackathon image"
                fill
                className="rounded-xl object-cover"
              />
              <IconButton
                type="button"
                className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-9 border-none bg-primary opacity-0 transition-all duration-300 enabled:hover:bg-primary-400 group-hover:opacity-100 sm:size-14"
              >
                <FiEdit3 className="size-4 sm:size-5" />
              </IconButton>
            </div>
          ) : fullPending ? (
            <Spinner />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <IconButton
                type="button"
                className="size-9 border-none bg-primary enabled:hover:bg-primary-400 sm:size-14"
              >
                <LuUpload className="size-5" />
              </IconButton>
              <div className="body-m mt-5 space-y-3 text-center text-neutral-400">
                <p>File Size: less than 10m</p>
                <p>Cover Size: 1920 x 1080 or 1240 x 720</p>
              </div>
            </div>
          )}
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

export default function Cover() {
  const context = useColearningContext()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  function onValid() {
    context.setSelectedTab('todo')
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onValid)}
      >
        <UploadContent />
        <ContinueButton />
      </form>
    </Form>
  )
}
