'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@hackquest/ui/shared/dialog'
import * as React from 'react'
import Cropper, { type Point, type Area } from 'react-easy-crop'

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
  aspect = 1 / 1,
  loading = false,
  onOpenChange,
  onConfirm,
}: CropImageDialogProps) {
  const [crop, onCropChange] = React.useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = React.useState(1)
  const cropPixelsRef = React.useRef<Area>({ width: 0, height: 0, x: 0, y: 0 })

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
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[92.5%]">
        <DialogHeader className="shrink-0 text-left">
          <DialogTitle className="title-3">Crop Image</DialogTitle>
        </DialogHeader>
        <div className="relative h-[35vh] w-full rounded-lg">
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
      </DialogContent>
    </Dialog>
  )
}
