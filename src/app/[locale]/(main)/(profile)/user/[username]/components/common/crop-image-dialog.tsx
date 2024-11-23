'use client'

import { ResponsiveDialog } from '@/components/common/responsive-dialog'
import { Button } from '@hackquest/ui/shared/button'
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@hackquest/ui/shared/dialog'
import { Slider } from '@hackquest/ui/shared/slider'
import * as React from 'react'
import Cropper, { type Point, type Area } from 'react-easy-crop'
import { LuMinus, LuPlus } from 'react-icons/lu'

function createImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.src = url
  })
}

async function getCroppedImage(src: string, pixelCrop: Area) {
  const image = await createImage(src)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) return null

  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  )

  return new Promise<Blob | null>((resolve, reject) => {
    canvas.toBlob(file => {
      if (file) {
        resolve(file)
      } else {
        reject()
      }
    }, 'image/jpeg')
  })
}

export interface CropImageDialogProps {
  open: boolean
  imageUrl: string
  cropShape?: 'rect' | 'round'
  aspect?: number
  loading?: boolean
  onOpenChange?: (open: boolean) => void
  onConfirm: (blob: Blob) => void
}

export function CropImageDialog({
  open,
  imageUrl,
  cropShape = 'rect',
  aspect = 16 / 9,
  loading = false,
  onOpenChange,
  onConfirm,
}: CropImageDialogProps) {
  const [crop, onCropChange] = React.useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = React.useState(1)
  const cropPixelsRef = React.useRef<Area>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  })

  const onCropComplete = React.useCallback(
    (_: Area, croppedAreaPixels: Area) => {
      cropPixelsRef.current = croppedAreaPixels
    },
    [],
  )

  async function onCropDone() {
    try {
      const croppedImage = await getCroppedImage(
        imageUrl,
        cropPixelsRef.current,
      )
      if (croppedImage) {
        onConfirm(croppedImage)
      }
    } catch (_) {}
  }

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      dialogContentProps={{ className: 'p-6 sm:w-full sm:max-w-xl gap-6' }}
      drawerContentProps={{ className: 'px-6 gap-4' }}
    >
      <DialogHeader className="shrink-0 text-center">
        <DialogTitle className="title-3">Crop Image</DialogTitle>
      </DialogHeader>
      <div className="relative h-[25vh] w-full rounded-lg sm:h-[35vh]">
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          cropShape={cropShape}
          restrictPosition={true}
          onCropChange={onCropChange}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          style={{
            containerStyle: {
              width: '100%',
              height: '100%',
              borderRadius: '8px',
              backgroundColor: 'hsl(var(--neutral-50))',
            },
          }}
        />
      </div>
      <section className="flex items-center gap-4 sm:px-16">
        <button
          className="inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-neutral-black outline-none disabled:opacity-50"
          disabled={zoom <= 1}
          onClick={() => setZoom(prev => prev - 0.01)}
        >
          <LuMinus className="size-4" />
        </button>
        <Slider
          min={1}
          max={2}
          step={0.01}
          value={[zoom]}
          onValueChange={val => setZoom(val[0] ?? 1)}
        />
        <button
          className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-neutral-black text-neutral-white outline-none disabled:opacity-50"
          disabled={zoom >= 2}
          onClick={() => setZoom(prev => prev + 0.01)}
        >
          <LuPlus className="size-4" />
        </button>
      </section>
      <DialogFooter className="pt-4 max-sm:gap-3 max-sm:pb-6">
        <Button
          variant="outline"
          color="neutral"
          className="sm:w-28"
          onClick={() => onOpenChange?.(false)}
        >
          Cancel
        </Button>
        <Button className="sm:w-28" loading={loading} onClick={onCropDone}>
          Confirm
        </Button>
      </DialogFooter>
    </ResponsiveDialog>
  )
}
