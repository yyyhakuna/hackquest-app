import { config } from '@/config/wagmi'
import { EAS_REF_UID, ZERO_ADDRESS } from '@/constants/enum'
import { EAS_BASE_URL } from '@/constants/links'
import dayjs from '@/lib/dayjs'
import {
  type AttestationShareablePackageObject,
  EAS,
  SchemaEncoder,
} from '@ethereum-attestation-service/eas-sdk'
import { OffChainSignType, SignProtocolClient, SpMode } from '@ethsign/sp-sdk'
import { VeraxSdk } from '@verax-attestation-registry/verax-sdk'
import { BrowserProvider, JsonRpcSigner } from 'ethers'
import * as React from 'react'
import toast from 'react-hot-toast'
import type { Account, Chain, Client, Hex, Transport } from 'viem'
import { waitForTransactionReceipt } from 'viem/actions'
import { type Config, useAccount, useConnectorClient } from 'wagmi'

type CreateAttestationInput = {
  attest: boolean
  comment?: string
}

type StoreIPFSActionReturn = {
  error: null | string
  ipfsHash: string | null
  offchainAttestationId: string | null
}

type StoreAttestationRequest = {
  filename: string
  textJson: string
}

export async function submitSignedAttestation(
  packageObject: AttestationShareablePackageObject,
): Promise<StoreIPFSActionReturn> {
  const data: StoreAttestationRequest = {
    filename: `schema-186-attestation-${Math.round(Date.now() / 1000)}.eas.txt`,
    textJson: JSON.stringify(packageObject),
  }

  const response = await fetch(`${EAS_BASE_URL}/offchain/store`, {
    method: 'POST',
    body: JSON.stringify(data),
  })

  return response.json()
}

export function clientToSigner(client: Client<Transport, Chain, Account>) {
  const { account, chain, transport } = client
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  const provider = new BrowserProvider(transport, network)
  const signer = new JsonRpcSigner(provider, account.address)
  return signer
}

export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId })
  return React.useMemo(
    () => (client ? clientToSigner(client) : undefined),
    [client],
  )
}

export function useSignProtocolClient() {
  const client = React.useMemo(() => {
    return new SignProtocolClient(SpMode.OffChain, {
      signType: OffChainSignType.EvmEip712,
    })
  }, [])
  return client
}

export function useVeraxSdk() {
  const [veraxSdk, setVeraxSdk] = React.useState<VeraxSdk>()
  const account = useAccount()

  React.useEffect(() => {
    if (account?.address) {
      const veraxSdk = new VeraxSdk(
        VeraxSdk.DEFAULT_LINEA_SEPOLIA_FRONTEND,
        account.address,
      )
      setVeraxSdk(veraxSdk)
    }
  }, [account?.address])

  return veraxSdk
}

export function useCreateEAS() {
  const account = useAccount()
  const signer = useEthersSigner()

  const create = React.useCallback(
    async (input: CreateAttestationInput) => {
      if (!account.address || !signer) {
        toast.error('Please connect your wallet')
        return
      }

      const schemaEncoder = new SchemaEncoder('bool attest, string comment')
      const encodedData = schemaEncoder.encodeData([
        { name: 'attest', value: input.attest, type: 'bool' },
        { name: 'comment', value: input.comment || '', type: 'string' },
      ])

      const eas = new EAS(process.env.NEXT_PUBLIC_EAS_CONTRACT_ADDRESS)

      eas.connect(signer)

      const offchain = await eas.getOffchain()

      const offchainAttestation = await offchain.signOffchainAttestation(
        {
          schema: process.env.NEXT_PUBLIC_EAS_SCHEMA_ID,
          recipient: ZERO_ADDRESS,
          refUID: EAS_REF_UID,
          expirationTime: BigInt(0),
          time: BigInt(dayjs().unix()),
          revocable: true,
          data: encodedData,
          nonce: BigInt(0),
        },
        signer,
      )

      const packageObject: AttestationShareablePackageObject = {
        signer: account.address,
        sig: offchainAttestation,
      }

      const attestation = await submitSignedAttestation(packageObject)

      return attestation
    },
    [account, signer],
  )

  return create
}

export function useCreateETHSign() {
  const account = useAccount()
  const client = useSignProtocolClient()

  const create = React.useCallback(
    async (input: CreateAttestationInput) => {
      if (!client || !account?.address) {
        toast.error('Please connect your wallet')
        return
      }

      const result = await client.createAttestation({
        schemaId: process.env.NEXT_PUBLIC_ETH_SIGN_SCHEMA_ID,
        data: {
          attest: input.attest,
          comment: input.comment || '',
        },
        indexingValue: crypto.randomUUID(),
      })

      return result
    },
    [client, account?.address],
  )

  return create
}

export function useCreateVerax() {
  const account = useAccount()
  const veraxSdk = useVeraxSdk()

  const create = React.useCallback(
    async (input: CreateAttestationInput) => {
      if (!veraxSdk || !account?.address) {
        toast.error('Please connect your wallet')
        return
      }

      const receipt = await veraxSdk.portal.attest(
        process.env.NEXT_PUBLIC_VERAX_PORTAL_ADDRESS as Hex,
        {
          schemaId: process.env.NEXT_PUBLIC_VERAX_SCHEMA_ID,
          expirationDate: Math.floor(Date.now() / 1000) + 2592000,
          subject: account.address,
          // @ts-expect-error
          attestationData: [input.attest, input.comment || ''],
        },
        [],
      )

      if (receipt.transactionHash) {
        const result = await waitForTransactionReceipt(config.getClient(), {
          hash: receipt.transactionHash,
        })

        return result
      }
    },
    [veraxSdk, account],
  )

  return create
}
