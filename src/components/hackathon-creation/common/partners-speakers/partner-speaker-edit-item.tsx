import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@hackquest/ui/shared/avatar'
import { Input } from '@hackquest/ui/shared/input'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { FiX } from 'react-icons/fi'
import {
  type HackathonPartnerAccountType,
  HackathonPartnerAccountValueType,
} from '../../constants/type'

interface PartnerSpeakerEditItemProp {
  initValue: HackathonPartnerAccountType
  onEdit: (val: HackathonPartnerAccountType) => void
  onDelete: VoidFunction
}

const PartnerSpeakerEditItem: React.FC<PartnerSpeakerEditItemProp> = ({
  initValue,
  onEdit,
  onDelete,
}) => {
  const [inputName, setInputName] = useState('')
  const [inputIntro, setInputIntro] = useState('')
  const timer1 = useRef<NodeJS.Timeout>()
  const timer2 = useRef<NodeJS.Timeout>()
  const searchUsers = (name: string) => {
    // if (!name) return
    onEdit({
      ...initValue,
      name,
    })
  }
  const setIntro = (intro: string) => {
    // if (!intro) return
    onEdit({
      ...initValue,
      intro,
    })
  }

  useEffect(() => {
    setInputName(initValue.name)
    setInputIntro(initValue.intro)
  }, [initValue])
  return (
    <div className="flex flex-col gap-3 rounded-[.375rem] border border-neutral-300 p-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-2">
          <Avatar className="size-8">
            <AvatarImage className="object-cover" src={initValue?.avatar} />
            <AvatarFallback className="bg-neutral-100">
              {initValue.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Input
            type="text"
            value={inputName}
            className="body-s flex-1 border-none text-neutral-800 outline-none"
            placeholder="Enter Partner name"
            onChange={e => {
              const val = e.target.value
              setInputName(val)
              if (timer1.current) clearTimeout(timer1.current)
              timer1.current = setTimeout(() => {
                searchUsers(val)
                clearTimeout(timer1.current)
              }, 500)
            }}
          />
        </div>
        <FiX
          className="size-6 flex-shrink-0 cursor-pointer"
          onClick={onDelete}
        />
      </div>
      {initValue.type === HackathonPartnerAccountValueType.INTRO && (
        <Input
          type="text"
          value={inputIntro}
          className="body-s text-neutral-800 "
          placeholder="One-line intro"
          onChange={e => {
            const val = e.target.value
            setInputIntro(val)
            if (timer2.current) clearTimeout(timer2.current)
            timer2.current = setTimeout(() => {
              setIntro(val)
              clearTimeout(timer2.current)
            }, 500)
          }}
        />
      )}
    </div>
  )
}

export default PartnerSpeakerEditItem
