'use client'

import type { UserCertification } from '@/graphql/generated/graphql'
import { useMintCertificate } from '@/hooks/certificate'
import { Button } from '@hackquest/ui/shared/button'
import toast from 'react-hot-toast'

export function MintButton({
  certificate,
}: {
  certificate: UserCertification
}) {
  const isMinted = certificate.mint

  const { mutateAsync, isPending } = useMintCertificate()

  function handleMint() {
    if (!certificate.certification.chainId) {
      toast.error('This NFT will open for minting soon')
      return
    }

    if (isMinted) {
      toast.error('Certificate already minted')
      return
    }

    toast.promise(mutateAsync(certificate), {
      loading: 'Certificate is being minted...',
      success: 'Certificate minted',
      error: 'Please connect your wallet',
    })
  }

  return (
    <Button
      size="small"
      className="w-24"
      disabled={isMinted}
      loading={isPending}
      onClick={handleMint}
    >
      {isMinted ? 'Minted' : 'Mint'}
    </Button>
  )
}
