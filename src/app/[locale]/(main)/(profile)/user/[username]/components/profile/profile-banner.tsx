import { useSingleUpload } from '@/hooks/utils/use-single-upload'
import { useToggle } from '@/hooks/utils/use-toggle'
import Image from 'next/image'
import * as React from 'react'
import toast from 'react-hot-toast'
import { FiEdit3 } from 'react-icons/fi'
import { useUpdateUserProfile } from '../../utils/mutation'
import { CropImageDialog } from '../common/crop-image-dialog'

export function ProfileBanner({
  src,
  isOwnProfile,
}: {
  src?: string | null
  isOwnProfile: boolean
}) {
  const [open, onOpenChange] = useToggle(false)
  const imageUrl = React.useRef('')

  const upload = useSingleUpload()

  const update = useUpdateUserProfile({
    onSuccess: () => {},
  })

  function updateBanner(filepath: string) {
    toast.promise(
      update.mutateAsync({
        data: {
          backgroundImage: { set: filepath },
        },
      }),
      {
        loading: 'Background image updating...',
        success: 'Background image updated',
        error: 'Failed to update background image',
      },
    )
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = event => {
        if (event.target?.result) {
          const result = event.target?.result
          if (typeof result === 'string') {
            imageUrl.current = result
            setTimeout(() => {
              onOpenChange(true)
            }, 500)
          }
        }
      }
      event.target.value = ''
    }
  }

  async function onConfirm(blob: Blob) {
    const formData = new FormData()
    formData.append('files', blob)
    formData.append('path', 'users/background')
    upload.mutateAsync(formData).then(filepath => {
      updateBanner(filepath)
      onOpenChange(false)
    })
  }

  return (
    <React.Fragment>
      <div className="relative h-28 w-full sm:h-52">
        <Image
          src={src ?? '/images/profile/default-background.png'}
          fill
          alt="Profile Banner"
          className="w-full object-cover"
        />
        {isOwnProfile && (
          <label className="absolute right-6 bottom-4 cursor-pointer text-neutral-white mix-blend-difference">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onChange}
            />
            <FiEdit3 className="size-4 sm:size-6" />
          </label>
        )}
      </div>
      <CropImageDialog
        open={open}
        imageUrl={imageUrl.current}
        onOpenChange={onOpenChange}
        onConfirm={onConfirm}
        loading={upload.isPending}
      />
    </React.Fragment>
  )
}
