import { Button } from '@hackquest/ui/shared/button'
import Image from 'next/image'

export function DailyQuestWidget() {
  return (
    <div className="border-t border-t-neutral-300 p-6">
      <div className="space-y-2 rounded-lg bg-primary-100 p-3">
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo/logo.svg"
            width={24}
            height={24}
            alt="logo"
            className="rounded"
          />
          <h2 className="headline-s">Complete 5 Quest (5/5)</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-14 items-center justify-start gap-1 rounded-full bg-neutral-white">
            <Image
              src="/images/layout/coin.svg"
              width={24}
              height={24}
              alt="coin"
            />
            <span className="body-s">50</span>
          </div>
          <div className="flex h-6 w-14 items-center justify-start gap-1 rounded-full bg-neutral-white">
            <Image
              src="/images/layout/coin.svg"
              width={24}
              height={24}
              alt="coin"
            />
            <span className="body-s">50</span>
          </div>
          <Button size="small" className="ml-auto">
            Claim
          </Button>
        </div>
      </div>
    </div>
  )
}
