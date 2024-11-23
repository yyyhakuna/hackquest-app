'use client'

import type { FindEcosystemInfoQuery } from '@/graphql/generated/graphql'
import { AspectRatio } from '@hackquest/ui/shared/aspect-ratio'
import Image from 'next/image'
import * as React from 'react'

const levels = ['Starter', 'Expert']

export function CertificateWidget({
  ecosystemPromise,
}: {
  ecosystemPromise: Promise<FindEcosystemInfoQuery>
}) {
  const { ecosystem } = React.use(ecosystemPromise)

  const certifications = ecosystem?.certifications ?? []

  return (
    <div className="w-full shrink-0 self-start rounded-xl bg-primary-50 p-6 sm:w-[17.5rem]">
      <div className="flex items-center gap-4">
        <h2 className="title-5 max-sm:order-last">
          {ecosystem?.basic?.type} Developer Certificate
        </h2>
        <Image
          src="/images/ecosystem/silver-medal.svg"
          alt="Silver medal"
          width={30}
          height={40}
          className="shrink-0"
        />
      </div>
      <p className="body-s mt-4 text-secondary-neutral">
        Upon completing the {ecosystem?.basic?.type} Developer Quest you'll earn
        a certification from {ecosystem?.basic?.type}.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-1">
        {certifications.map((certification, index) => (
          <div
            key={certification.id}
            className="flex flex-col items-center gap-3"
          >
            <AspectRatio ratio={16 / 9}>
              <Image
                src={certification.image}
                alt={certification.name}
                fill
                className="rounded-lg shadow-[0px_0px_8px_0px_rgba(0,0,0,0.12)]"
              />
            </AspectRatio>
            <h3 className="headline-s">
              Lvl {index + 1}. {levels[index]}
            </h3>
          </div>
        ))}
      </div>
    </div>
  )
}
