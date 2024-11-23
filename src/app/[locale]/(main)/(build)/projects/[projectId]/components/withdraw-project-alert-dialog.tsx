'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@hackquest/ui/shared/alert-dialog'
import { Button } from '@hackquest/ui/shared/button'
import * as React from 'react'
import { LuArrowRight } from 'react-icons/lu'

export function WithdrawPorjectAlertDialog() {
  const [open, onOpenChange] = React.useState(false)
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <Button
          className="w-full"
          onClick={event => {
            event.preventDefault()
            event.stopPropagation()
            onOpenChange(true)
          }}
        >
          Withdraw Project
          <LuArrowRight className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[460px] gap-6">
        <AlertDialogHeader className="space-y-6">
          <AlertDialogTitle className="title-3 text-center">
            Withdraw Project
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Are you sure you want to withdraw your project? This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            className="w-full"
            onClick={event => {
              event.stopPropagation()
              onOpenChange(false)
            }}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
