import type { UserCertification } from '@/graphql/generated/graphql'
import { useMintCertificationMutation } from '@/graphql/generated/hooks'
import { useSuiWalletModal } from '@/providers/wallet/sui-wallet-provider'
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
} from '@mysten/dapp-kit'
import { Transaction } from '@mysten/sui/transactions'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

// const stateTemplate = {
//   statId: '0x2df0aa12193737ba88e5ef19211530dbe80e685910c69b99b203a495ae287c42',
//   adminId: '0x710a6a347bfaf1f7c63003044d1decd827f75dd4ab25b2b09125461f66775131',
//   globalId:
//     '0x6c34320c3f23e0b34ba1b7a98006ba0fc8fab575652aa6eabb1fe643f3a3ac6b',
//   packageId:
//     '0x0597a12765ad49dd9925a999b934af369b23e8f87e4c6a3a9e93f593b7e067d9',
//   sender: '0xbefe4881a3f08d191d71ed3d6af5ce07de39f010fe0da692c26374f465efd0cf',
// }

export function useMintFromSui() {
  const client = useSuiClient()
  const account = useCurrentAccount()
  const { open, onOpenChange } = useSuiWalletModal()

  const mint = useMintCertificationMutation()

  const signAndExecuteTransaction = useSignAndExecuteTransaction({
    execute: async ({ bytes, signature }) =>
      await client.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        options: {
          showRawEffects: true,
          showObjectChanges: true,
        },
      }),
  })

  return useMutation({
    mutationFn: async (certificate: UserCertification) => {
      return new Promise((resolve, reject) => {
        const { certification } = certificate
        if (!account?.address && !open) {
          onOpenChange(true)
          reject()
          return
        }

        if (!account?.address) {
          onOpenChange(true)
          reject()
          return
        }

        const tx = new Transaction()

        tx.setSender(account.address)
        tx.setGasBudget(100_000_00)

        tx.moveCall({
          target: certification.extra.packageId + '::certificateNFT::mint',
          arguments: [
            tx.object(certification.extra.statId),
            tx.object(certification.extra.globalId),
            tx.pure.address(account.address),
            tx.pure.string(certificate.username ?? ''),
            tx.pure.string(encodeURIComponent(certificate.username ?? '')),
            tx.pure.string(String(certification.chainId)),
            tx.pure.string(''),
            tx.pure.string(certificate.certificateId?.toString() ?? ''),
            tx.pure.string(''),
            tx.pure.string(''),
          ],
          typeArguments: [],
        })

        signAndExecuteTransaction.mutate(
          {
            transaction: tx,
            chain: 'sui:testnet',
          },
          {
            onSuccess: result => {
              const res = mint.mutateAsync({
                certificationId: certificate.certificationId,
                txId: result.digest,
              })
              resolve(res)
            },
            onError: (error: any) => {
              toast.error(error)
              reject(error)
            },
          },
        )
      })
    },
  })
}
