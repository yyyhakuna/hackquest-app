'use client'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@hackquest/ui/shared/alert-dialog'
import { Button } from '@hackquest/ui/shared/button'
import type * as React from 'react'
import { PiWarning } from 'react-icons/pi'

export function DeleteAlertDialog({
  open,
  onOpenChange,
  title,
  description,
  loading,
  onConfirm,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: React.ReactNode
  description?: React.ReactNode
  loading?: boolean
  onConfirm: (e: React.MouseEvent<HTMLButtonElement>) => void
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="gap-4 sm:max-w-[460px]">
        <div className="mx-auto flex size-12 items-center justify-center self-center rounded-full bg-destructive-100">
          <PiWarning className="size-6 text-destructive" />
        </div>
        <AlertDialogHeader className="space-y-4">
          <AlertDialogTitle className="title-3 text-center">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="px-6 text-center">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-2 grid grid-cols-2 gap-8 sm:space-x-0">
          <AlertDialogCancel
            onClick={event => {
              event.stopPropagation()
              onOpenChange(false)
            }}
          >
            Cancel
          </AlertDialogCancel>
          <Button loading={loading} color="destructive" onClick={onConfirm}>
            Confirm
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
