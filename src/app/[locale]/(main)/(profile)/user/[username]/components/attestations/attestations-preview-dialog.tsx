'use client'

import { cn } from '@hackquest/ui/lib/utils'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@hackquest/ui/shared/drawer'
import { ScrollArea } from '@hackquest/ui/shared/scroll-area'
import * as React from 'react'
import { AttestationItem } from './attestation-item'

const filters = ['All', 'True', 'False', 'Comment']

export function AttestationsPreviewDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [filter, setFilter] = React.useState('All')
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="gap-6 px-6 pb-16">
        <DrawerHeader className="p-0">
          <DrawerTitle>View Attestations</DrawerTitle>
        </DrawerHeader>
        <section className="flex items-center gap-3">
          {filters.map(f => (
            <button
              key={f}
              className={cn(
                'headline-s rounded-lg bg-neutral-100 px-4 py-2 outline-none transition-colors duration-300',
                filter === f && 'bg-blue-100',
              )}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </section>
        <ScrollArea className="h-[50vh]">
          <AttestationItem />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}
