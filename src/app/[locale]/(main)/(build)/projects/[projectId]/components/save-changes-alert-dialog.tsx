'use client'

import { useRouter } from '@/app/navigation'
import { useProjectId } from '@/hooks/project/query'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@hackquest/ui/shared/alert-dialog'
import { Button } from '@hackquest/ui/shared/button'
import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import { LuArrowLeft } from 'react-icons/lu'
import { useSubmit } from '../edit/utils/use-submit'
import type { FormValues } from '../edit/utils/validations'

export function SaveChangesAlertDialog() {
  const [open, onOpenChange] = React.useState(false)
  const router = useRouter()
  const projectId = useProjectId()

  const form = useFormContext<FormValues>()

  const { onSubmit, isPending } = useSubmit({
    projectId,
    form,
    onSuccess: () => {
      if (open) {
        onOpenChange(false)
        setTimeout(() => {
          router.back()
        }, 500)
      }
    },
  })
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <button type="button" className="flex items-center gap-1 outline-none">
          <LuArrowLeft className="size-4" />
          <span className="body-m font-bold">Back</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="gap-6 rounded-xl max-sm:w-[92.5%] sm:max-w-[460px]">
        <AlertDialogHeader className="space-y-6">
          <AlertDialogTitle className="title-3 text-center">
            Save Your Edit
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Please save your changes before leaving.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center sm:space-x-4">
          <Button
            variant="outline"
            color="neutral"
            className="w-full"
            onClick={() => {
              onOpenChange(false)
              setTimeout(() => {
                router.back()
              }, 500)
            }}
          >
            Leave now
          </Button>
          <Button
            loading={isPending}
            className="w-full"
            onClick={async () => {
              await form.handleSubmit(onSubmit)()
            }}
          >
            Save
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
