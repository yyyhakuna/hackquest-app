import { useSingleUpload } from '@/hooks/utils/use-single-upload'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@hackquest/ui/shared/avatar'
import { Spinner } from '@hackquest/ui/shared/spinner'
import { Upload, UploadInput } from '@hackquest/ui/shared/upload'
import * as React from 'react'
import toast from 'react-hot-toast'
import { LuCamera } from 'react-icons/lu'
import { RxAvatar } from 'react-icons/rx'
import { useUpdateUserProfile } from '../../utils/mutation'

export function UserAvatar({
  isOwnProfile,
  src,
}: {
  isOwnProfile: boolean
  src?: string
}) {
  const update = useUpdateUserProfile()
  const upload = useSingleUpload({
    onSuccess: async filepath => {
      await updateAvatar(filepath)
    },
  })

  async function updateAvatar(filepath: string) {
    await update.mutateAsync({
      data: {
        user: {
          update: {
            data: {
              avatar: {
                set: filepath,
              },
            },
          },
        },
      },
    })
  }

  async function onValueChange(error: Error | null, files: File[] | null) {
    if (error) {
      toast.error(error.message)
      return
    }
    const file = files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append('files', file)
      formData.append('path', 'users/avatars')
      upload.mutate(formData)
    }
  }

  const fullPending = upload.isPending || update.isPending

  return (
    <div className="group flex size-full items-center justify-center rounded-full">
      {fullPending ? (
        <Spinner size={32} />
      ) : (
        <React.Fragment>
          <Avatar className="size-full">
            <AvatarImage src={src} />
            <AvatarFallback className="bg-neutral-100">
              <RxAvatar className="size-6 text-secondary-neutral sm:size-12" />
            </AvatarFallback>
          </Avatar>
          {isOwnProfile && (
            <Upload
              onValueChange={onValueChange}
              dropzoneOptions={{
                accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
              }}
              className="absolute inset-0 flex items-center justify-center rounded-full bg-neutral-black/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              <UploadInput
                rootClassName="h-full"
                className="flex h-full items-center justify-center"
              >
                <LuCamera className="size-6 text-neutral-white sm:size-8" />
              </UploadInput>
            </Upload>
          )}
        </React.Fragment>
      )}
    </div>
  )
}
