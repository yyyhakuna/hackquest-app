import { Link } from '@/app/navigation'
import { cn } from '@hackquest/ui/lib/utils'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@hackquest/ui/shared/avatar'
import { TbTriangleFilled, TbTriangleInvertedFilled } from 'react-icons/tb'
import { ATTESTATION_CONFIG } from '../../constants'
import { useUserAttestations } from '../../utils/query'
import { useAttestationStore } from '../../utils/store'

function getAttestationLink({
  service,
  attestationId,
}: {
  service: string
  attestationId: string
}) {
  const linkGenerator =
    ATTESTATION_CONFIG[service as keyof typeof ATTESTATION_CONFIG]
  return linkGenerator?.(attestationId) || '/'
}

export function AttestationItem() {
  const { activeIds } = useAttestationStore()
  const { data: attestations } = useUserAttestations()

  return (
    <section className="space-y-0">
      {attestations.map(attestation => (
        <Link
          className={cn(
            'flex flex-col gap-3 border-b border-b-neutral-100 p-4 opacity-30 transition-opacity duration-300 last:border-b-0',
            activeIds.includes(attestation.sourceId) && 'opacity-100',
          )}
          key={attestation.id}
          href={getAttestationLink(attestation.chain)}
          target="_blank"
          data-source={attestation.sourceId}
          rel="noopener noreferrer"
        >
          <div className="flex items-center gap-2">
            <object>
              <Link
                href={`/user/${attestation?.creator?.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Avatar className="size-6">
                  <AvatarImage src={attestation?.creator?.avatar || ''} />
                  <AvatarFallback>
                    {attestation?.creator?.nickname?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <p className="headline-s">{attestation?.creator?.nickname}</p>
              </Link>
            </object>
            {attestation?.attest ? (
              <TbTriangleFilled className="size-3 text-success-600" />
            ) : (
              <TbTriangleInvertedFilled className="size-3 text-destructive-600" />
            )}
          </div>
          {attestation?.comment && (
            <p className="body-s line-clamp-3 text-secondary-neutral">
              {attestation?.comment}
            </p>
          )}
        </Link>
      ))}
    </section>
  )
}
