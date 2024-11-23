import {
  useConnectWalletMutation,
  useDisconnectWalletMutation,
} from '@/graphql/generated/hooks'
import { Button } from '@hackquest/ui/shared/button'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import isEmpty from 'lodash-es/isEmpty'
import toast from 'react-hot-toast'
import { LuUnlink, LuWallet } from 'react-icons/lu'

export function OnChainActivity({
  isOwnProfile,
  data = {},
}: {
  isOwnProfile: boolean
  data?: Record<string, any>
}) {
  const connect = useConnectWalletMutation({
    meta: {
      invalidates: [['FindUserProfile']],
    },
    onSuccess: () => {
      toast.success('On-chain activity connected')
    },
    onError: () => {
      toast.error('Failed to connect on-chain activity')
    },
  })

  const disconnect = useDisconnectWalletMutation({
    meta: {
      invalidates: [['FindUserProfile']],
    },
    onSuccess: () => {
      toast.success('On-chain activity disconnected')
    },
    onError: () => {
      toast.error('Failed to disconnect on-chain activity')
    },
  })

  if (!isOwnProfile && isEmpty(data)) {
    return null
  }

  return (
    <div className="relative flex flex-col gap-6 self-start sm:rounded-2xl sm:border sm:border-neutral-200 sm:p-5">
      <h2 className="title-3">On-Chain Activity</h2>
      {!isEmpty(data) ? (
        <div className="grid grid-cols-2 gap-x-6 gap-y-8">
          {isOwnProfile && (
            <button
              type="button"
              aria-label="Unlink wallet"
              className="-top-2 absolute right-0 rounded-full p-2.5 outline-none transition-colors duration-300 hover:bg-neutral-100 sm:top-2.5 sm:right-3"
              onClick={() => disconnect.mutate({})}
            >
              <LuUnlink className="size-5" />
            </button>
          )}
          <div className="flex flex-col gap-1">
            <span className="headline-m">{data?.balance?.toFixed(2)}</span>
            <span className="body-s text-secondary-neutral">
              Deployed Contracts
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="headline-m">
              {Math.round(data?.transactionCount || 0)}
            </span>
            <span className="body-s text-secondary-neutral">
              Defi Interaction
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="headline-m">
              {Math.round(data?.transactionCount || 0)}
            </span>
            <span className="body-s text-secondary-neutral">
              Total Contract Deployed
            </span>
          </div>
        </div>
      ) : (
        <ConnectButton.Custom>
          {({ openConnectModal, account, mounted }) => {
            return (
              <Button
                className="self-start"
                variant="outline"
                color="neutral"
                disabled={!mounted}
                loading={connect.isPending}
                onClick={() => {
                  if (!account?.address) {
                    toast.error('Please connect your wallet first')
                    openConnectModal()
                    return
                  }

                  connect.mutate({ address: account.address })
                }}
              >
                Connect Wallet
                <LuWallet className="size-5" />
              </Button>
            )
          }}
        </ConnectButton.Custom>
      )}
    </div>
  )
}
