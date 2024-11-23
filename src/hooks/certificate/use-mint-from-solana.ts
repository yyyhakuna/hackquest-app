import type { UserCertification } from '@/graphql/generated/graphql'
import { useMintCertificationMutation } from '@/graphql/generated/hooks'
import { create, mplCore } from '@metaplex-foundation/mpl-core'
import { generateSigner } from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters'
import { base58 } from '@metaplex-foundation/umi/serializers'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { useMutation } from '@tanstack/react-query'

const endpoint = 'https://api.devnet.solana.com'

export function useMintFromSolana() {
  const wallet = useWallet()
  const { visible, setVisible } = useWalletModal()

  const mint = useMintCertificationMutation()

  return useMutation({
    mutationFn: async (certificate: UserCertification) => {
      if (!wallet.publicKey && !visible) {
        setVisible(true)
        return
      }

      if (!wallet) {
        throw new Error('Wallet not connected')
      }

      if (!wallet.publicKey) {
        throw new Error('Publickey is missing')
      }

      const umi = createUmi(endpoint)
        .use(mplCore())
        .use(walletAdapterIdentity(wallet))

      const asset = generateSigner(umi)

      const name = certificate.certification.name
      const uri = `${window.location.origin}/api/certificate/${encodeURIComponent(certificate.username ?? '')}-${certificate.certificateId}.json`

      const tx = await create(umi, {
        asset,
        name,
        uri,
      }).sendAndConfirm(umi)

      const signature = base58.deserialize(tx.signature)[0]

      await mint.mutateAsync({
        certificationId: certificate.certificationId,
        txId: signature,
      })
    },
  })
}
