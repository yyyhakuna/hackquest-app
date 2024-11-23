import { useWriteCertificateNftMint } from '@/config/abi/generated'
import type { UserCertification } from '@/graphql/generated/graphql'
import {
  useGetCertificationSignatureMutation,
  useMintCertificationMutation,
} from '@/graphql/generated/hooks'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type { Hex } from 'viem'
import { useAccount, useChainId, useSwitchChain } from 'wagmi'

export function useMintFromEvm() {
  const account = useAccount()
  const chainId = useChainId()
  const { switchChainAsync } = useSwitchChain()
  const { openConnectModal } = useConnectModal()
  const { writeContractAsync } = useWriteCertificateNftMint()

  const signature = useGetCertificationSignatureMutation()
  const mint = useMintCertificationMutation()

  return useMutation({
    mutationFn: async (certificate: UserCertification) => {
      const { username, certification, certificateId, certificationId } =
        certificate

      if (!account?.isConnected) {
        openConnectModal?.()
        toast.error('Please connect your wallet')
        return
      }

      if (chainId !== certification?.chainId) {
        await switchChainAsync({ chainId: certification.chainId })
      }

      const result = await signature.mutateAsync({
        certificationId,
        address: account.address!,
      })

      const txId = await writeContractAsync({
        address: certification.contract as Hex,
        account: account.address,
        args: [
          account.address as Hex,
          username ?? '',
          String(certification.chainId),
          '',
          String(certificateId),
          '',
          '',
          result.signature.signature as Hex,
        ],
      })

      let isSuccess = false

      while (!isSuccess) {
        try {
          const res = await mint.mutateAsync({
            certificationId,
            txId,
          })

          isSuccess = true
          return res
        } catch (_) {}
      }
    },
  })
}
