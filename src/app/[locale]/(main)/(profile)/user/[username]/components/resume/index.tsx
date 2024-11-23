'use client'

import { Link } from '@/app/navigation'
import { DeleteAlertDialog } from '@/components/common/delete-alert-dialog'
import {
  useCreateUserResumeMutation,
  useDeleteUserResumeMutation,
} from '@/graphql/generated/hooks'
import { useSingleUpload } from '@/hooks/utils/use-single-upload'
import { useToggle } from '@/hooks/utils/use-toggle'
import { Spinner } from '@hackquest/ui/shared/spinner'
import { Upload, UploadInput } from '@hackquest/ui/shared/upload'
import * as React from 'react'
import toast from 'react-hot-toast'
import { LuFileText, LuTrash2, LuUpload } from 'react-icons/lu'
import { useUserProfile } from '../../utils/query'

export function Resume() {
  const [open, onOpenChange] = useToggle(false)
  const { data: profile } = useUserProfile()
  const fileName = React.useRef<string | null>(null)
  const deletedId = React.useRef<number | null>(null)

  const noResume = profile?.user?.userResume?.length === 0

  const upload = useSingleUpload({
    onSuccess: filepath => {
      createResume(filepath)
    },
  })
  const create = useCreateUserResumeMutation({
    meta: {
      invalidates: [['FindUserProfile']],
    },
  })

  const remove = useDeleteUserResumeMutation({
    meta: {
      invalidates: [['FindUserProfile']],
    },
  })

  async function onValueChange(error: Error | null, files: File[] | null) {
    if (error) {
      toast.error(error.message)
      return
    }
    const file = files?.[0]
    if (file) {
      fileName.current = file.name
      const formData = new FormData()
      formData.append('files', file)
      formData.append('path', 'users/resumes')
      upload.mutate(formData)
    }
  }

  function createResume(file: string) {
    if (!fileName.current) return
    toast
      .promise(
        create.mutateAsync({
          data: {
            file,
            name: fileName.current,
          },
        }),
        {
          loading: 'Uploading resume...',
          success: 'Resume uploaded',
          error: 'Failed to upload resume',
        },
      )
      .finally(() => {
        fileName.current = null
      })
  }

  async function onDelete() {
    if (!deletedId.current) return
    toast
      .promise(remove.mutateAsync({ resumeId: deletedId.current }), {
        loading: 'Deleting resume...',
        success: 'Resume deleted',
        error: 'Failed to delete resume',
      })
      .finally(() => {
        onOpenChange(false)
        deletedId.current = null
      })
  }

  const fullPending = upload.isPending || create.isPending

  if (noResume && !profile?.isOwnProfile) {
    return null
  }

  return (
    <div className="space-y-6">
      <h2 className="title-3">Resume</h2>
      <div className="grid gap-5 sm:grid-cols-3">
        {profile?.user?.userResume?.map(file => (
          <div
            key={file.id}
            className="flex w-full items-center justify-between rounded-xl border border-neutral-300 p-4"
          >
            <div className="flex items-center gap-2">
              <LuFileText className="size-5" />
              <Link
                href={file.file}
                target="_blank"
                rel="noreferrer"
                className="body-s underline"
              >
                {file.name}
              </Link>
            </div>
            {profile.isOwnProfile && (
              <button
                type="button"
                className="outline-none"
                onClick={() => {
                  deletedId.current = file.id
                  onOpenChange(true)
                }}
              >
                <LuTrash2 className="size-5 text-destructive-600" />
              </button>
            )}
          </div>
        ))}
        {profile.isOwnProfile && (
          <div className="flex w-full items-center">
            {fullPending ? (
              <div className="flex w-full items-center justify-between rounded-xl border border-neutral-300 p-4">
                <div className="flex items-center gap-2">
                  <LuFileText className="size-5" />
                  <span className="body-s underline">{fileName.current}</span>
                </div>
                <Spinner className="ml-auto" size={20} />
              </div>
            ) : (
              <Upload
                onValueChange={onValueChange}
                dropzoneOptions={{
                  accept: { 'application/pdf': ['.pdf'] },
                }}
              >
                <UploadInput className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-neutral-300 border-dashed p-4 transition-colors duration-300 hover:border-neutral-400">
                  <LuUpload className="text-neutral-500" />
                  <span className="body-s text-neutral-500">Upload file</span>
                </UploadInput>
              </Upload>
            )}
          </div>
        )}
      </div>
      <DeleteAlertDialog
        open={open}
        onOpenChange={onOpenChange}
        loading={remove.isPending}
        title="Delete resume"
        description="Are you sure you want to delete this resume? This action cannot be undone."
        onConfirm={onDelete}
      />
    </div>
  )
}
