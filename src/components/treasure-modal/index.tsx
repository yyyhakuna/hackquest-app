'use client'
import { Button } from '@hackquest/ui/shared/button'
import { DialogContent } from '@hackquest/ui/shared/dialog'
import Image from 'next/image'
import type React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { ResponsiveDialog } from '../common/responsive-dialog'

interface TreasureModalProp {
  treasureId: string
  open: boolean
  onOpenChange?: (open: boolean) => void
}

const TreasureModal: React.FC<TreasureModalProp> = ({
  treasureId,
  open,
  onOpenChange,
}) => {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      dialogContentProps={{
        className: '',
      }}
    >
      <DialogContent className='sm:!w-[56.25rem] sm:!max-w-[56.25rem] flex flex-col items-center bg-primary-100 pt-[4.375rem] pb-12 max-sm:h-screen max-sm:justify-center max-sm:gap-8 sm:h-[80vh] sm:justify-between'>
        <div className="flex flex-col items-center ">
          <p className="body-m text-neutral-700">The treasure you get</p>
          <div className="headline-l mt-4 mb-6 flex gap-8 text-neutral-800">
            <div className="flex items-center gap-3">
              <Image
                src={'/images/layout/coin.png'}
                alt={'coin-icon'}
                width={48}
                height={48}
              />
              <span>x{50}</span>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src={'/images/layout/exp.png'}
                alt={'coin-icon'}
                width={48}
                height={48}
              />
              <span>x{50}</span>
            </div>
          </div>
          <Button>
            <span>Confirm</span>
            <FiArrowRight />
          </Button>
        </div>
        <div>Duck</div>
      </DialogContent>
    </ResponsiveDialog>
  )
}

export default TreasureModal
