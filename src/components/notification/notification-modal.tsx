import { Button } from '@hackquest/ui/shared/button'
import { DialogHeader, DialogTitle } from '@hackquest/ui/shared/dialog'
import type React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { ResponsiveDialog } from '../common/responsive-dialog'

interface NotificationModalProp {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const NotificationModal: React.FC<NotificationModalProp> = ({
  open,
  onOpenChange,
}) => {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      dialogContentProps={{
        className: 'gap-6 sm:max-w-[51.5rem] w-[51.5rem]',
      }}
    >
      <DialogHeader className="space-y-4">
        <DialogTitle className="title-3">Email</DialogTitle>
      </DialogHeader>
      <div>
        Resources You Need to Win in the $15K AIA Chain Hackathon – Register by
        October 31st!!
        <div className='mt-2 flex justify-end'>
          <Button>
            <span>Register</span>
            <FiArrowRight />
          </Button>
        </div>
      </div>
    </ResponsiveDialog>
  )
}

export default NotificationModal
