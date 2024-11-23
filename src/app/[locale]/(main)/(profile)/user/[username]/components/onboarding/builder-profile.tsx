import { useConnectWalletMutation } from '@/graphql/generated/hooks'
import { openWindow, shortenHex } from '@/lib/utils'
import { WalletAvatar } from '@/providers/wallet/wallet-avatar'
import { cn } from '@hackquest/ui/lib/utils'
import { Button } from '@hackquest/ui/shared/button'
import { DialogFooter } from '@hackquest/ui/shared/dialog'
import { Label } from '@hackquest/ui/shared/label'
import { Spinner } from '@hackquest/ui/shared/spinner'
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit'
import { useIsMutating } from '@tanstack/react-query'
import * as React from 'react'
import toast from 'react-hot-toast'
import { FaGithub } from 'react-icons/fa6'
import { LuArrowRight, LuCheck, LuPlus, LuWallet } from 'react-icons/lu'
import { useUpdateUserProfile } from '../../utils/mutation'
import { useUserProfile } from '../../utils/query'

export function BuilderProfile({
  setStep,
}: {
  setStep: (step: number) => void
}) {
  const isMutating = useIsMutating({ mutationKey: ['ConnectGithub'] })
  const { data: profile } = useUserProfile()
  const { connectModalOpen } = useConnectModal()

  const githubName = profile?.githubActivity?.name
  const walletAddress = profile?.onChainActivity?.address

  const connect = useConnectWalletMutation({
    meta: {
      invalidates: [['FindUserProfile']],
    },
  })

  const update = useUpdateUserProfile({
    onSuccess: () => {
      setStep(2)
    },
  })

  function onValid() {
    if (!profile?.githubActivity?.name) {
      toast.error('Please connect your GitHub account first')
      return
    }
    if (!profile?.onChainActivity?.address) {
      toast.error('Please connect your wallet first')
      return
    }

    toast.promise(
      update.mutateAsync({
        data: {
          progress: { push: [2] },
        },
      }),
      {
        loading: 'Updating profile...',
        success: 'Profile updated',
        error: 'Failed to update profile',
      },
    )
  }

  function connectWallet(address: string) {
    toast.promise(connect.mutateAsync({ address }), {
      loading: 'Connecting wallet...',
      success: 'Wallet connected',
      error: 'Failed to connect wallet',
    })
  }

  React.useEffect(() => {
    if (connectModalOpen) {
      document.body.style.pointerEvents = 'auto'
    }
  }, [connectModalOpen])

  return (
    <div className="space-y-4 max-sm:px-6">
      <h2 className="title-5 sm:title-3 max-sm:text-center">
        Generate your Web3 builder profile
      </h2>
      <div className="flex flex-col gap-4">
        <Label className="headline-s">Builder Experience</Label>
        <div className="grid sm:grid-cols-2">
          <button
            type="button"
            disabled={!!githubName}
            className={cn(
              'inline-flex items-center gap-4 rounded-xl border border-neutral-200 p-3 outline-none transition-colors duration-300 enabled:hover:border-neutral-300',
              {
                'border-success-600': githubName,
              },
            )}
            onClick={() => {
              openWindow('http://localhost:4002/auth/github/connect')
            }}
          >
            <FaGithub className="size-8" />
            <div>
              {githubName ? (
                <React.Fragment>
                  <h4 className="headline-s">Github</h4>
                  <p className="body-xs text-secondary-neutral">{githubName}</p>
                </React.Fragment>
              ) : (
                <span className="headline-s">Connect Github</span>
              )}
            </div>
            {githubName ? (
              <LuCheck className="ml-auto size-4 text-success-600" />
            ) : isMutating > 0 ? (
              <Spinner className="ml-auto" size={20} />
            ) : (
              <LuPlus className="ml-auto size-4" />
            )}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Label className="headline-s">On Chain Activities</Label>
        <div className="grid sm:grid-cols-2">
          <ConnectButton.Custom>
            {({ openConnectModal, account, mounted }) => {
              return (
                <button
                  type="button"
                  disabled={!!walletAddress || !mounted || connect.isPending}
                  className={cn(
                    'inline-flex items-center gap-4 rounded-xl border border-neutral-200 p-3 outline-none transition-colors duration-300 enabled:hover:border-neutral-300',
                    {
                      'border-success-600': walletAddress,
                    },
                  )}
                  onClick={() => {
                    if (!account?.address) {
                      toast.error('Please connect your wallet first')
                      openConnectModal()
                      return
                    }
                    connectWallet(account.address)
                  }}
                >
                  {walletAddress ? (
                    <React.Fragment>
                      <div className="size-8 overflow-hidden rounded-full">
                        <WalletAvatar address={walletAddress} size={32} />
                      </div>
                      <p className="body-xs text-secondary-neutral">
                        {shortenHex(walletAddress, 5)}
                      </p>
                      <LuCheck className="ml-auto size-4 text-success-600" />
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <LuWallet className="size-8" />
                      <span className="headline-s">Connect wallet</span>
                      {connect.isPending ? (
                        <Spinner className="ml-auto" size={20} />
                      ) : (
                        <LuPlus className="ml-auto size-4" />
                      )}
                    </React.Fragment>
                  )}
                </button>
              )
            }}
          </ConnectButton.Custom>
        </div>
      </div>
      <DialogFooter className="mt-10 max-sm:gap-2 max-sm:py-6 sm:items-center">
        <Button
          variant="text"
          color="neutral"
          size="small"
          aria-label="Skip for now"
          className="text-secondary-neutral"
          onClick={() => setStep(3)}
        >
          Skip for now
          <LuArrowRight className="icon-hover-translate size-3" />
        </Button>
        <Button loading={update.isPending} onClick={onValid}>
          Continue
          <LuArrowRight className="icon-hover-translate size-4" />
        </Button>
      </DialogFooter>
    </div>
  )
}
