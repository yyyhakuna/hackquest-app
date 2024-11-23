'use client'

import { VideoPlayer } from '@/components/common/video-player'
import { useProjectId } from '@/hooks/project/query'
import { useResumableUpload } from '@/hooks/utils/use-resumable-upload'
import { Button } from '@hackquest/ui/shared/button'
import { IconButton } from '@hackquest/ui/shared/icon-button'
import { Input } from '@hackquest/ui/shared/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@hackquest/ui/shared/popover'
import { Spinner } from '@hackquest/ui/shared/spinner'
import { Upload, UploadInput } from '@hackquest/ui/shared/upload'
import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaYoutube } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { LuArrowRight, LuLink2, LuUpload } from 'react-icons/lu'
import { useSubmit } from '../utils/use-submit'
import type { FormValues } from '../utils/validations'

export function UploadVideo({
  videoUrl,
  type,
}: {
  videoUrl?: string | null
  type: 'pitchVideo' | 'demoVideo'
}) {
  const projectId = useProjectId()
  const [youtubeVideoUrl, setYoutubeVideoUrl] = React.useState<string>('')
  const [googleVideoUrl, setGoogleVideoUrl] = React.useState<string>('')

  const form = useFormContext<FormValues>()

  const { onSubmit, isPending: submitting } = useSubmit({
    projectId,
    form,
  })

  const { percent, upload, retry } = useResumableUpload({
    cachePrefix: type,
    onSuccess(data) {
      form.setValue(type, data)
      form.handleSubmit(onSubmit)()
    },
    onError(_error) {
      toast.error('Project video upload failed')
    },
  })

  async function onValueChange(error: Error | null, files: File[] | null) {
    if (error) {
      toast.error(error.message)
      return
    }
    const file = files?.[0]
    if (file) {
      upload.mutate({ file, path: `hackathons/projects/${type}` })
    }
  }

  const handleConfirmVideoUrl = () => {
    if (youtubeVideoUrl) {
      form.setValue(type, youtubeVideoUrl)
      form.handleSubmit(onSubmit)()
      setYoutubeVideoUrl('')
    }

    if (googleVideoUrl) {
      form.setValue(type, googleVideoUrl)
      form.handleSubmit(onSubmit)()
      setGoogleVideoUrl('')
    }
  }

  const uploading = upload.isPending || retry.isPending

  return (
    <div className="group relative flex aspect-video w-full overflow-hidden rounded-xl bg-neutral-100">
      {videoUrl && <VideoPlayer url={videoUrl} />}
      <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 flex-col items-center justify-center gap-4 transition-opacity duration-300">
        {uploading ? (
          <p className="body-m text-center text-neutral-400">
            {percent}% uploaded
          </p>
        ) : submitting ? (
          <Spinner />
        ) : (
          <section className="flex items-center justify-center gap-3">
            <Upload
              onValueChange={onValueChange}
              dropzoneOptions={{
                accept: { 'video/*': ['.mp4', '.mov', '.avi', '.mkv'] },
                // 150MB
                maxSize: 150 * 1024 * 1024,
              }}
            >
              <UploadInput className="inline-flex size-[60px] items-center justify-center rounded-full bg-primary outline-0 hover:bg-primary-400">
                <LuUpload className="size-5" />
              </UploadInput>
            </Upload>
            <Popover>
              <PopoverTrigger asChild>
                <IconButton size="extra-large" className="border-[1px]">
                  <LuLink2 className="size-6" />
                </IconButton>
              </PopoverTrigger>
              <PopoverContent className="w-full space-y-3 rounded-xl px-6 py-3">
                <h3 className="body-s text-neutral-400">Video Link</h3>
                <div className="flex items-center gap-3">
                  <FaYoutube className="size-6 shrink-0 text-social-youtube" />
                  <Input
                    value={youtubeVideoUrl}
                    onChange={e => setYoutubeVideoUrl(e.target.value)}
                    className="w-72"
                    placeholder="Only Youtube video"
                  />
                  <Button
                    type="button"
                    className="w-28"
                    onClick={handleConfirmVideoUrl}
                  >
                    Confirm
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  <FcGoogle className="size-6 shrink-0" />
                  <Input
                    value={googleVideoUrl}
                    onChange={e => setGoogleVideoUrl(e.target.value)}
                    className="w-72"
                    placeholder="Only google video"
                  />
                  <Button
                    type="button"
                    className="w-28"
                    onClick={handleConfirmVideoUrl}
                  >
                    Confirm
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </section>
        )}
        {(upload.isError || retry.isError) && (
          <section className="flex flex-col items-center justify-center gap-4">
            <p className="body-m text-center text-destructive">
              Upload failed, please try again
            </p>
            <Button type="button" onClick={() => retry.mutate()}>
              Continue Upload
              <LuArrowRight className="icon-hover-translate size-4" />
            </Button>
          </section>
        )}
      </div>
      {uploading && (
        <div className="absolute bottom-0 left-0 h-2 w-full bg-neutral-300">
          <div
            className="absolute top-0 left-0 h-full bg-primary"
            style={{ width: `${percent}%` }}
          />
        </div>
      )}
    </div>
  )
}
