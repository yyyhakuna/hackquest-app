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

export function ExitAlertDialog({
  open,
  onOpenChange,
  loading,
  onSave,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  loading?: boolean
  onSave: () => void
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="gap-6 max-sm:w-[92.5%] sm:max-w-[460px]">
        <AlertDialogHeader className="space-y-6">
          <AlertDialogTitle className="title-3 text-center">
            Save and exit?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Your progress will be saved and you can continue later.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="grid grid-cols-2 gap-8 sm:space-x-0">
          <AlertDialogCancel
            className="mt-0"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </AlertDialogCancel>
          <Button onClick={onSave} loading={loading}>
            Save & Exit
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
