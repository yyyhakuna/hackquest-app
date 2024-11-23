'use client'

import { Link } from '@/app/navigation'
import { Button } from '@hackquest/ui/shared/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@hackquest/ui/shared/dialog'
import { useTranslations } from 'next-intl'

export function ApplyOrganizerDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const t = useTranslations('HackathonOrganizer')
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-6">
        <DialogHeader className="space-y-6">
          <DialogTitle className="title-3">
            {t('confirmDialogTitle')}
          </DialogTitle>
          <DialogDescription className="body-s">
            {t('dialogText')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="grid grid-cols-2 gap-8 sm:space-x-0">
          <DialogClose asChild>
            <Button variant="outline" color="neutral">
              {t('cancel')}
            </Button>
          </DialogClose>
          <Link href="https://xsxo494365r.typeform.com/to/PxtaoxdQ">
            <Button className="w-full">{t('apply')}</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
