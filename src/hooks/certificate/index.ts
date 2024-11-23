import { ChainId } from '@/config/wagmi'
import type { UserCertification } from '@/graphql/generated/graphql'
import { useMutation } from '@tanstack/react-query'
import { useMintFromEvm } from './use-mint-from-evm'
import { useMintFromSolana } from './use-mint-from-solana'
import { useMintFromSui } from './use-mint-from-sui'

export function useMintCertificate() {
  const mintFromEvm = useMintFromEvm()
  const mintFromSui = useMintFromSui()
  const mintFromSolana = useMintFromSolana()

  return useMutation({
    mutationFn: async (certificate: UserCertification) => {
      if (certificate.certification.chainId === ChainId.Solana) {
        return mintFromSolana.mutateAsync(certificate)
      } else if (certificate.certification.chainId === ChainId.Sui) {
        return mintFromSui.mutateAsync(certificate)
      } else {
        return mintFromEvm.mutateAsync(certificate)
      }
    },
  })
}
