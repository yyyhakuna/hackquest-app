'use client'

import { useToggle } from '@/hooks/utils/use-toggle'
import webApi from '@/service'
import type { UserProfileType } from '@/service/user/type'
import { Skeleton } from '@hackquest/ui/shared/skeleton'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import * as React from 'react'
import toast from 'react-hot-toast'
import { CropImageModal } from './crop-image-modal'
import { FileInput } from './file-input'

export function UserAvatar({
  isLoading,
  profile,
  invalidate,
}: {
  profile?: UserProfileType
  isLoading: boolean
  invalidate: () => void
}) {
  const [open, toggle] = useToggle(false)
  const [imageUrl, setImageUrl] = React.useState('')

  const { isPending, mutate } = useMutation({
    mutationFn: (data: FormData) => webApi.userApi.uploadAvatar(data),
    onSuccess: async () => {
      invalidate()
      onClose()
      toast.success('Avatar updated')
    },
  })

  function onFileChange(url: string) {
    setImageUrl(url)
    setTimeout(() => {
      toggle(true)
    }, 500)
  }

  function onClose() {
    toggle(false)
    setImageUrl('')
  }

  function onConfirm(blob: Blob) {
    const formData = new FormData()
    formData.append('file', blob, 'avatar.png')
    mutate(formData)
  }

  return (
    <div className="mx-auto sm:mx-0">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full sm:h-40 sm:w-40">
        <Skeleton className="rounded-full">
          {profile?.user.avatar && (
            <Image src={profile.user.avatar} alt="profile image" fill className="rounded-full object-cover" />
          )}
        </Skeleton>
        <FileInput className="absolute inset-0 rounded-full bg-black/50" onFileChange={onFileChange} />
      </div>
      <CropImageModal
        imageUrl={imageUrl}
        open={open}
        aspect={1}
        cropShape="round"
        loading={isPending}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    </div>
  )
}
