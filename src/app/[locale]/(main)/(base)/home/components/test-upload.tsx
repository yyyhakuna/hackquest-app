'use client'
import { VideoPlayer } from '@/components/common/video-player'
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
import React, { useState, type ReactNode } from 'react'
import toast from 'react-hot-toast'
import { FaYoutube } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { LuLink2, LuUpload } from 'react-icons/lu'

export function TestUpload({ children }: { children?: ReactNode }) {
  const [videoUrl, setVideoUrl] = useState<string>()

  const { percent, upload, retry } = useResumableUpload({
    cachePrefix: 'test-upload',
    onSuccess(data) {
      setVideoUrl(data)
    },
    onError(error) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error(error)
    },
  })

  async function onValueChange(error: Error | null, files: File[] | null) {
    if (error) {
      toast.error(error.message)
      return
    }
    const file = files?.[0]
    if (file) {
      upload.mutate({ file, path: 'zcy22606' })
    }
  }

  return (
    <div className="group relative flex aspect-video w-full overflow-hidden rounded-xl bg-neutral-100">
      {videoUrl && <VideoPlayer url={videoUrl} />}
      <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 flex items-center justify-center gap-3 transition-opacity duration-300">
        {upload.isPending || retry.isPending ? (
          <div className="flex flex-col gap-6">
            <Spinner />
            <span className="title-3 text-red-500">{percent}% uploaded</span>
          </div>
        ) : (
          <React.Fragment>
            <Upload
              onValueChange={onValueChange}
              dropzoneOptions={{
                accept: { 'video/*': ['.mp4', '.mov', '.avi', '.mkv'] },
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
                  <FaYoutube className="size-6 shrink-0 text-[#FF2121]" />
                  <Input
                    value={videoUrl}
                    onChange={e => setVideoUrl(e.target.value)}
                    className="w-72"
                    placeholder="Only Youtube video"
                  />
                  <Button type="button" className="w-28" onClick={() => {}}>
                    Confirm
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  <FcGoogle className="size-6 shrink-0" />
                  <Input
                    value={videoUrl}
                    onChange={e => setVideoUrl(e.target.value)}
                    className="w-72"
                    placeholder="Only google video"
                  />
                  <Button type="button" className="w-28" onClick={() => {}}>
                    Confirm
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </React.Fragment>
        )}
        {(upload.isError || retry.isError) && (
          <Button type="button" className="w-28" onClick={() => retry.mutate()}>
            重试111
          </Button>
        )}
      </div>
      {(upload.isPending || retry.isPending) && (
        <div className="absolute bottom-0 left-0 h-3 w-full bg-neutral-300">
          <div
            className="absolute top-0 left-0 h-full bg-primary"
            style={{ width: `${percent}%` }}
          />
        </div>
      )}
    </div>
  )
}
