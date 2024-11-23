'use client'

import { useToggle } from '@/hooks/utils/use-toggle'
import * as React from 'react'
import { FiPlusSquare } from 'react-icons/fi'
import { CreateProjectDialog } from './create-project-dialog'

export function CreateProjectCard() {
  const [open, onOpenChange] = useToggle(false)

  return (
    <React.Fragment>
      <div
        className="relative flex h-full cursor-pointer flex-col justify-between gap-1.5 rounded-2xl border-2 border-neutral-200 bg-neutral-white p-6"
        onClick={() => onOpenChange(true)}
      >
        <div className="h-9 w-20 rounded-md bg-neutral-100" />
        <div className="h-9 w-full rounded-md bg-neutral-100" />
        <div className="h-9 w-full rounded-md bg-neutral-100" />
        <div className="h-28 w-full rounded-md bg-neutral-100" />
        <div className="flex items-center gap-3">
          <div className="h-9 w-20 rounded-md bg-neutral-100" />
          <div className="h-9 w-20 rounded-md bg-neutral-100" />
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 inline-flex size-20 items-center justify-center rounded-full bg-primary">
          <FiPlusSquare className="size-6" />
        </div>
      </div>
      <CreateProjectDialog open={open} onOpenChange={onOpenChange} />
    </React.Fragment>
  )
}
