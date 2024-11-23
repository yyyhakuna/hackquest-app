'use client'

import useMediaQuery from '@/hooks/use-media-query'
import { Dialog, DialogContent } from '@hackquest/ui/shared/dialog'
import { Drawer, DrawerContent } from '@hackquest/ui/shared/drawer'

export function ResponsiveDialog({
  open,
  onOpenChange,
  dialogContentProps,
  drawerContentProps,
  children,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  dialogContentProps?: React.ComponentProps<typeof DialogContent>
  drawerContentProps?: React.ComponentProps<typeof DrawerContent>
  children: React.ReactNode
}) {
  const isDesktop = useMediaQuery('(min-width: 640px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent {...dialogContentProps}>{children}</DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} repositionInputs={false}>
      <DrawerContent {...drawerContentProps}>{children}</DrawerContent>
    </Drawer>
  )
}
