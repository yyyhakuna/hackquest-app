import { ResponsiveDialog } from '@/components/common/responsive-dialog'
import DuckContent from '@/components/duck-pet/duck-content'
import { DialogContent } from '@hackquest/ui/shared/dialog'
import type React from 'react'

interface DuckModalProp {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DuckModal: React.FC<DuckModalProp> = ({ open, onOpenChange }) => {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      drawerContentProps={{ className: 'rounded-none flex flex-col ' }}
    >
      <DialogContent
        className="flex h-screen flex-col p-0"
        showCloseIcon={false}
      >
        <DuckContent
          onClose={() => onOpenChange(false)}
          onEarn={() => onOpenChange(false)}
        />
      </DialogContent>
    </ResponsiveDialog>
  )
}

export default DuckModal
