import type { GetFaucetDetailByIdQuery } from '@/graphql/generated/graphql'
import {
  type ListFaucetsClaimRecordByChainIdQuery,
  useCreateFaucetClaimMutation,
} from '@/graphql/generated/hooks'
import { isEthAddress } from '@/lib/utils'
import { AuthType, useAuthStore } from '@/store/auth'
import { useAuthenticated } from '@/store/user'
import { Button } from '@hackquest/ui/shared/button'
import {} from '@hackquest/ui/shared/callout'
import { Input } from '@hackquest/ui/shared/input'
import type { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import Image from 'next/image'
import { useState } from 'react'
import { FiInfo } from 'react-icons/fi'
import { useShallow } from 'zustand/react/shallow'

interface FaucetInfoInputProps {
  faucetInfo: GetFaucetDetailByIdQuery['findFirstFaucet']
  refresh: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<ListFaucetsClaimRecordByChainIdQuery, Error>>
}

const FaucetInfoInput: React.FC<FaucetInfoInputProps> = ({
  faucetInfo,
  refresh,
}) => {
  const [inputVal, setInputVal] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const isAuthenticated = useAuthenticated()

  const { setAuthType, setAuthModalOpen } = useAuthStore(
    useShallow(state => ({
      setAuthType: state.setAuthType,
      setAuthModalOpen: state.setAuthModalOpen,
    })),
  )

  const {
    mutateAsync: faucetClaimMutation,
    isSuccess,
    isError,
    error,
    isPending,
  } = useCreateFaucetClaimMutation({
    onSuccess: () => {
      refresh()
    },
  })

  const handleInputSubmit = () => {
    if (!isAuthenticated) {
      setAuthType(AuthType.SIGN_IN)
      setAuthModalOpen(true)
      return
    }

    if (!isEthAddress(inputVal)) {
      setShowMessage(true)
      return
    }

    faucetClaimMutation({
      chainId: faucetInfo.chainId,
      address: inputVal,
    })
  }

  return (
    <div className="body-s">
      <h2 className="pb-2 text-primary-neutral">Enter your ETH Address</h2>
      <Input
        className="text-neutral-400"
        placeholder="Address"
        value={inputVal}
        onChange={e => {
          const value = e.target.value
          setInputVal(value)
          setShowMessage(false)
        }}
      />

      <Button
        disabled={!inputVal}
        className="my-4"
        onClick={handleInputSubmit}
        loading={isPending}
      >
        Request {`${faucetInfo.amount} ${faucetInfo.symbol}`}
      </Button>
      {showMessage && (
        <div className="body-xs flex items-center text-destructive-600">
          <FiInfo />
          <p className="pl-1">
            Your wallet address does not match the network of this faucet.
            Please try another address.
          </p>
        </div>
      )}
      {isSuccess && !isPending && (
        <div className="flex items-center gap-[7px] text-neutral-rich-gray">
          <div className="relative h-[20px] w-[20px]">
            <Image
              src={'/images/faucet/success_icon.svg'}
              alt="success-icon"
              fill
              className="object-cover"
            />
          </div>
          <span>token dripped successfully (3s)</span>
        </div>
      )}
      {isError && (
        <div className="flex items-center gap-[7px] text-status-error">
          <div className="relative h-[20px] w-[20px]">
            <Image
              src="/images/faucet/warning_icon.svg"
              alt="warning-icon"
              fill
              className="object-cover"
            />
          </div>
          <span>{error as string}</span>
        </div>
      )}
    </div>
  )
}

export default FaucetInfoInput
