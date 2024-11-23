import { WalletAvatar } from '@/providers/wallet/wallet-avatar'
import { cn } from '@hackquest/ui/lib/utils'
import { Button } from '@hackquest/ui/shared/button'
import { DialogFooter } from '@hackquest/ui/shared/dialog'
import {
  ConnectButton,
  useAccountModal,
  useConnectModal,
} from '@rainbow-me/rainbowkit'
import * as React from 'react'
import toast from 'react-hot-toast'
import { LuArrowLeft, LuArrowRight, LuWallet } from 'react-icons/lu'
import { useAccount } from 'wagmi'
import { useAttestationStore } from '../../utils/store'

export function ConnectWallet() {
  const account = useAccount()
  const { connectModalOpen, openConnectModal } = useConnectModal()
  const { accountModalOpen } = useAccountModal()

  const { setStep } = useAttestationStore()

  function onValid() {
    if (!account.address) {
      toast.error('Please connect your wallet')
      openConnectModal?.()
      return
    }
    setStep(4)
  }

  React.useEffect(() => {
    if (connectModalOpen || accountModalOpen) {
      document.body.style.pointerEvents = 'auto'
    }
  }, [connectModalOpen, accountModalOpen])

  return (
    <div className="flex flex-1 flex-col gap-6 max-sm:mt-4">
      <ConnectButton.Custom>
        {({ openConnectModal, openAccountModal, account, mounted }) => {
          const connected = !!account?.address && mounted
          return (
            <button
              type="button"
              disabled={!mounted}
              className={cn(
                'flex h-16 items-center gap-4 rounded-xl border border-neutral-200 p-4 outline-none transition-colors duration-300 enabled:hover:bg-neutral-100',
                {
                  'border-primary bg-primary-50 enabled:hover:bg-primary-50':
                    connected,
                },
              )}
              onClick={connected ? openAccountModal : openConnectModal}
            >
              {account?.address ? (
                <WalletAvatar address={account.address} size={32} />
              ) : (
                <div className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-neutral-200">
                  <LuWallet className="size-4" />
                </div>
              )}
              <span className="headline-s">
                {account ? account.displayName : 'Connect Wallet'}
              </span>
            </button>
          )
        }}
      </ConnectButton.Custom>
      <DialogFooter className="max-sm:gap-3 max-sm:pt-6 max-sm:pb-10">
        <Button
          variant="outline"
          color="neutral"
          className="sm:w-32"
          onClick={() => setStep(2)}
        >
          <LuArrowLeft className="group-enabled:group-hover:-translate-x-1 size-4 transition-transform duration-300" />
          Back
        </Button>
        <Button onClick={onValid} className="sm:w-32">
          Continue
          <LuArrowRight className="icon-hover-translate size-4" />
        </Button>
      </DialogFooter>
    </div>
  )
}
