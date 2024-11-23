'use client'

import type { CertificateProgressQuery } from '@/graphql/generated/graphql'
import { AspectRatio } from '@hackquest/ui/shared/aspect-ratio'
import { Progress, ProgressLabel } from '@hackquest/ui/shared/progress'
import Image from 'next/image'
import * as React from 'react'

export function CertificateWidget({
  certificatePromise,
}: {
  certificatePromise: Promise<CertificateProgressQuery>
}) {
  const { certificate } = React.use(certificatePromise)

  if (!certificate) return null

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="title-5">{certificate.name}</h3>
          <p className="body-s text-secondary-neutral">Unlock at Phase 4</p>
        </div>
        <Image
          src="/images/ecosystem/silver-medal.svg"
          width={30}
          height={40}
          alt="Silver Medal"
        />
      </div>
      <AspectRatio ratio={16 / 9}>
        <Image
          src={certificate.image}
          fill
          alt="Certificate"
          className="rounded-lg shadow-[0px_0px_8px_0px_rgba(0,0,0,0.12)]"
        />
      </AspectRatio>
      {certificate?.progress && (
        <div className="mt-4 flex items-center gap-4">
          <Progress value={certificate.progress * 100} />
          <ProgressLabel>
            {Math.round(certificate.progress * 100)}%
          </ProgressLabel>
        </div>
      )}
    </div>
  )
}
