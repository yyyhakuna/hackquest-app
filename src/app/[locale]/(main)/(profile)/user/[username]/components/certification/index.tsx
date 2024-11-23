'use client'

import type { UserCertification } from '@/graphql/generated/graphql'
import useMediaQuery from '@/hooks/use-media-query'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@hackquest/ui/shared/carousel'
import dayjs from 'dayjs'
import Image from 'next/image'
import * as React from 'react'
import { useUserAttestations, useUserProfile } from '../../utils/query'
import { useAttestationStore } from '../../utils/store'
import { AttestButton } from '../attestations/attest-button'
import { AttestationsPreview } from '../attestations/attestations-preivew'
import { MintButton } from './mint-button'

export function Certification() {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const { data: profile } = useUserProfile()
  const { data: attestations } = useUserAttestations()
  const { onOpen } = useAttestationStore()

  const certifications = React.useMemo(() => {
    return profile?.userCertifications?.map(cert => {
      return {
        ...cert,
        attestations: attestations?.filter(
          attestation => attestation.sourceId === cert.id,
        ),
      }
    })
  }, [profile?.userCertifications, attestations])

  const sortedCertifications = React.useMemo(() => {
    return certifications?.sort((a, b) =>
      dayjs(a.certificateTime).isBefore(dayjs(b.certificateTime)) ? 1 : -1,
    )
  }, [certifications])

  const noCertifications = sortedCertifications?.length === 0

  if (noCertifications) {
    if (!profile?.isOwnProfile) {
      return null
    }
    return (
      <div className="w-full space-y-6">
        <h2 className="title-3">Certification</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          <div className="h-[11.5625rem] w-full rounded-lg border border-neutral-200 border-dashed sm:h-[11.75rem]" />
        </div>
      </div>
    )
  }

  const certificateUrl = React.useCallback(
    (username?: string | null, certificateId?: number | null) => {
      if (!username || !certificateId) {
        return ''
      }
      return typeof window !== 'undefined'
        ? `${window.location.origin}/api/certificate/${encodeURIComponent(username)}-${certificateId}.png`
        : ''
    },
    [],
  )

  return (
    <Carousel
      className="w-full space-y-6"
      options={{ slidesToScroll: isDesktop ? 3 : 1 }}
    >
      <div className="flex items-center justify-between">
        <h2 className="title-3">Certification</h2>
        <div className="flex items-center gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
      <CarouselContent>
        {sortedCertifications?.map((cert, index) => (
          <CarouselItem key={index} className="sm:basis-1/3">
            <section className="space-y-3 p-1">
              <div className="relative h-[11.5625rem] w-full overflow-hidden rounded-lg border border-neutral-200 sm:h-[11.75rem]">
                <Image
                  src={certificateUrl(cert?.username, cert?.certificateId)}
                  alt={`${cert?.username}'s certification`}
                  fill
                />
              </div>
              <div className="flex flex-col gap-3 max-sm:px-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="headline-m">{cert?.certification.name}</h3>
                    {!profile.isOwnProfile && (
                      <AttestButton
                        onClick={() => {
                          onOpen({ type: 'Certification', sourceId: cert.id })
                        }}
                      />
                    )}
                  </div>
                  <p className="body-xs text-secondary-neutral">
                    Issued {dayjs(cert.certificateTime).format('MMM.D YYYY')}
                  </p>
                </div>
                {profile.isOwnProfile && (
                  <MintButton
                    certificate={cert as unknown as UserCertification}
                  />
                )}
                <AttestationsPreview attestations={cert.attestations} />
              </div>
            </section>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
