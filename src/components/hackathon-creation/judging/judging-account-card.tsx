import type { JudgeAccount } from '@/graphql/generated/hooks'
import { copyText } from '@/lib/utils'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@hackquest/ui/shared/avatar'
import { Button } from '@hackquest/ui/shared/button'
import { Input } from '@hackquest/ui/shared/input'
import { Spinner } from '@hackquest/ui/shared/spinner'
import type React from 'react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FiCopy, FiX } from 'react-icons/fi'

interface JudgingAccountCardProp {
  account: JudgeAccount
  onDelete: () => void
  onEdit: (name: string) => void
  loading: boolean
  isDelete: boolean
}

const JudgingAccountCard: React.FC<JudgingAccountCardProp> = ({
  account,
  onDelete,
  onEdit,
  loading,
  isDelete,
}) => {
  const [isEdit, setIsEdit] = useState(!account?.nickname)
  const [inputNickname, setInputNickname] = useState('')

  useEffect(() => {
    if (account.nickname) {
      setInputNickname('')
      setIsEdit(false)
    }
  }, [account])
  return (
    <div className="relative flex flex-col gap-4 overflow-hidden rounded-xl border border-neutral-300 bg-neutral-white p-4">
      {loading && (
        <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
          <Spinner />
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarImage className="object-cover" src={account?.avatar ?? ''} />
            <AvatarFallback className="bg-neutral-100">
              {account?.nickname?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {isEdit ? (
            <Input
              className="border-none"
              placeholder="Enter Judge Name*"
              value={inputNickname}
              onChange={e => setInputNickname(e.target.value)}
              onBlur={e => {
                const val = e.target.value
                onEdit(val)
              }}
              onKeyDown={(e: any) => {
                if (e.code === 'Enter') {
                  const val = e.target.value
                  onEdit(val)
                  e.preventDefault()
                }
              }}
            />
          ) : (
            <span className="headline-m text-neutral-800">
              {account?.nickname}
            </span>
          )}
        </div>
        {isDelete && <FiX className="cursor-pointer" onClick={onDelete} />}
      </div>
      <div className="body-s flex items-center gap-[3rem] text-neutral-600">
        <div className="flex items-center gap-2">
          Account:
          <span className="headline-m text-neutral-800">{account?.email}</span>
        </div>
        <div className="flex items-center gap-2">
          Password:
          <span className="headline-m text-neutral-800">
            {account?.password}
          </span>
        </div>
      </div>
      <Button
        className="w-full"
        variant={'outline'}
        color={'neutral'}
        disabled={isEdit}
        onClick={() => {
          copyText(`email:${account?.email}  password:${account?.password}`)
          toast.success('Copy successfully')
        }}
      >
        <span>Copy Account</span>
        <FiCopy />
      </Button>
    </div>
  )
}

export default JudgingAccountCard
