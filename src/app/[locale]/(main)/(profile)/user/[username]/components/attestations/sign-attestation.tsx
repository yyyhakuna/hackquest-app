import { useCreateAttestationMutation } from '@/graphql/generated/hooks'
import { useUser } from '@/store/user'
import { cn } from '@hackquest/ui/lib/utils'
import { Button } from '@hackquest/ui/shared/button'
import { DialogFooter } from '@hackquest/ui/shared/dialog'
import * as React from 'react'
import toast from 'react-hot-toast'
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'
import { TbTriangleFilled, TbTriangleInvertedFilled } from 'react-icons/tb'
import { useChainId, useSwitchChain } from 'wagmi'
import { lineaSepolia, mainnet } from 'wagmi/chains'
import { SERVICE_CONFIG } from '../../constants'
import {
  useCreateEAS,
  useCreateETHSign,
  useCreateVerax,
} from '../../utils/attestation'
import { useUserProfile } from '../../utils/query'
import { useAttestationStore } from '../../utils/store'
;(BigInt.prototype as any).toJSON = function () {
  return this.toString()
}

type Chain = {
  attestationId?: string | null
  service?: string
}

export function SignAttestation() {
  const chainId = useChainId()
  const { switchChainAsync } = useSwitchChain()
  const { data: profile } = useUserProfile()
  const currentUser = useUser()
  const { state, setStep, reset } = useAttestationStore()
  const [loading, setLoading] = React.useState(false)
  const [ready, setReady] = React.useState(false)

  const createEAS = useCreateEAS()
  const createVerax = useCreateVerax()
  const createETHSign = useCreateETHSign()

  const create = useCreateAttestationMutation({
    meta: {
      invalidates: [['ListUserAttestations']],
    },
  })

  async function onSign() {
    setLoading(true)
    try {
      const input = {
        attest: state?.attest,
        comment: state?.comment,
      }

      if (state?.service === SERVICE_CONFIG.EAS) {
        const attestation = await createEAS(input)

        if (!attestation?.error) {
          onSubmit({
            attestationId: attestation?.offchainAttestationId,
            service: SERVICE_CONFIG.EAS,
          })
        }
      }
      if (state?.service === SERVICE_CONFIG.EthSign) {
        const attestation = await createETHSign(input)

        if (attestation) {
          onSubmit({
            attestationId: attestation?.attestationId,
            service: SERVICE_CONFIG.EthSign,
          })
        }
      }

      if (state?.service === SERVICE_CONFIG.Verax) {
        const result = await createVerax(input)

        if (result) {
          const attestationId = result.logs?.[0]?.topics[1]
          if (attestationId) {
            onSubmit({
              attestationId,
              service: SERVICE_CONFIG.Verax,
            })
          }
        }
      }
    } catch (_) {
      toast.error('Failed to create attestation')
    } finally {
      setLoading(false)
    }
  }

  async function onSubmit(chain: Chain) {
    toast
      .promise(
        create.mutateAsync({
          data: {
            userId: profile.id,
            creatorId: currentUser?.id!,
            type: state?.type,
            attest: state.attest,
            comment: state.comment || null,
            sourceId: state.sourceId,
            chain,
          },
        }),
        {
          loading: 'Creating attestation...',
          success: 'Attestation created',
          error: 'Failed to create attestation',
        },
      )
      .finally(() => {
        setLoading(false)
        reset()
      })
  }

  React.useEffect(() => {
    if (
      state?.service === SERVICE_CONFIG.EAS ||
      state?.service === SERVICE_CONFIG.EthSign
    ) {
      if (chainId !== mainnet.id) {
        switchChainAsync({ chainId: mainnet.id }).then(() => setReady(true))
      } else {
        setReady(true)
      }
    }

    if (state?.service === SERVICE_CONFIG.Verax) {
      if (chainId !== lineaSepolia.id) {
        switchChainAsync({ chainId: lineaSepolia.id }).then(() =>
          setReady(true),
        )
      } else {
        setReady(true)
      }
    }
  }, [chainId, switchChainAsync, state?.service])

  return (
    <div className="flex flex-1 flex-col gap-6 max-sm:mt-4">
      <h4 className="headline-m">Add attestation to your profile:</h4>
      <section className={cn('space-y-3 rounded-xl bg-success-50 p-4')}>
        <div className="flex items-center">
          <div className="inline-flex size-8 items-center justify-center rounded-full">
            {state?.attest ? (
              <TbTriangleFilled className="size-4 text-success-600" />
            ) : (
              <TbTriangleInvertedFilled className="size-4 text-destructive-600" />
            )}
          </div>
          <h4 className="headline-s">
            Attest {state?.attest ? 'True' : 'False'}
          </h4>
        </div>
        {state?.comment && (
          <p className="body-s text-neutral-600">{state.comment}</p>
        )}
      </section>
      <DialogFooter className="max-sm:gap-3 max-sm:pt-6 max-sm:pb-10">
        <Button
          variant="outline"
          color="neutral"
          className="sm:w-32"
          onClick={() => setStep(3)}
        >
          <LuArrowLeft className="group-enabled:group-hover:-translate-x-1 size-4 transition-transform duration-300" />
          Back
        </Button>
        <Button
          loading={loading}
          disabled={!ready}
          className="sm:w-32"
          onClick={onSign}
        >
          {ready ? 'Sign' : 'Ready...'}
          <LuArrowRight className="icon-hover-translate size-4" />
        </Button>
      </DialogFooter>
    </div>
  )
}
