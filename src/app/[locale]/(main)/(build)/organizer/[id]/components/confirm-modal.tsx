import { Button } from '@hackquest/ui/shared/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from '@hackquest/ui/shared/dialog'
import { useTranslations } from 'next-intl'
export const ConfirmModal = ({
  title,
  desc,
  onConfirm,
}: { title: string; desc: string; onConfirm?: () => void }) => {
  const t = useTranslations('HackathonOrganizer.manage')
  return (
    <DialogContent onClick={e => e.stopPropagation()} className="gap-6">
      <DialogHeader className="title-3 text-primary-neutral">
        {title}
      </DialogHeader>
      <DialogDescription className="body-s text-primary-neutral">
        {desc}
      </DialogDescription>
      <DialogFooter className="w-full gap-8">
        <DialogClose asChild>
          <Button className="flex-1" variant="outline" color="neutral">
            {t('cancel')}
          </Button>
        </DialogClose>
        <Button className="flex-1" onClick={onConfirm}>
          {t('confirm')}
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
