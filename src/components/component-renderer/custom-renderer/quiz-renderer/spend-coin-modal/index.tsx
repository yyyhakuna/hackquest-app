'use client'
import { ResponsiveDialog } from '@/components/common/responsive-dialog'
import { LocalStorageKey } from '@/constants/enum'
import { Button } from '@hackquest/ui/shared/button'
import { Checkbox } from '@hackquest/ui/shared/checkbox'
import { DialogContent } from '@hackquest/ui/shared/dialog'
import Image from 'next/image'
import type React from 'react'
import { useState } from 'react'

interface SpendCoinModalProp {
  open: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  coin: number
  onConfirm: VoidFunction
}

const SpendCoinModal: React.FC<SpendCoinModalProp> = ({
  open,
  onOpenChange,
  coin,
  onConfirm,
}) => {
  const [showMe, setShowMe] = useState(false)

  const setShow = (show: boolean) => {
    window.localStorage.setItem(
      LocalStorageKey.ShowAnswerCostCoinModal,
      show ? 'hidden' : 'show',
    )
    setShowMe(show)
  }
  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:!w-[28.75rem] sm:!max-w-[28.75rem] flex flex-col items-center bg-neutral-white max-sm:h-screen max-sm:justify-center max-sm:gap-8 sm:h-[22.625rem] sm:justify-between">
        <div className="body-s flex w-full items-center gap-2 text-neutral-800">
          <Image
            src={'/images/layout/coin.png'}
            alt={'coin'}
            width={30}
            height={30}
          />
          <span>{20}</span>
        </div>
        <Image
          src={'/images/project/spend_coin_cover.png'}
          alt={'coin-cover'}
          width={64}
          height={64}
        />
        <div className="headline-l flex items-center gap-1 text-neutral-800">
          <span>You’ll spend {coin}</span>
          <Image
            src={'/images/layout/coin.png'}
            alt={'coin'}
            width={20}
            height={20}
          />
          <span>to show answer</span>
        </div>
        <div className="body-m text-neutral-800">
          <label
            className="flex cursor-pointer items-center gap-2"
            htmlFor="show-me"
          >
            <Checkbox
              checked={showMe}
              name="show-me"
              onCheckedChange={checked => setShow(checked as boolean)}
            />
            <span onClick={() => setShow(!showMe)}>Don’t show me again</span>
          </label>
        </div>
        <Button className="w-full" onClick={onConfirm}>
          Continue
        </Button>
      </DialogContent>
    </ResponsiveDialog>
  )
}

export default SpendCoinModal
