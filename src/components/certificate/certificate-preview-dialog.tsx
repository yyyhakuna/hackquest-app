'use client'

import { ResponsiveDialog } from '@/components/common/responsive-dialog'
import { AspectRatio } from '@hackquest/ui/shared/aspect-ratio'
import Image from 'next/image'

export function CertificatePreviewDialog() {
  return (
    <ResponsiveDialog
      open={false}
      dialogContentProps={{
        className:
          'p-8 sm:max-w-[800px] w-full flex flex-col items-center gap-0',
      }}
      drawerContentProps={{
        className: 'px-6 pb-10',
      }}
    >
      <h2 className="sm:title-1 title-3 mt-6 text-center">
        Level 1. Certified Solana Learner
      </h2>
      <p className="body-m mt-3 text-center text-secondary-neutral">
        Keep learning! Complete 5 phases to earn Level 1 certificate. (1/5)
      </p>
      <div className="mt-6 w-full sm:max-w-[398px]">
        <AspectRatio ratio={16 / 9}>
          <Image
            src="/images/ecosystem/certificate.png"
            alt="Certificate"
            fill
          />
        </AspectRatio>
      </div>
    </ResponsiveDialog>
  )
}
