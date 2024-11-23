import { Button } from '@hackquest/ui/shared/button'
import { Input } from '@hackquest/ui/shared/input'
import Image from 'next/image'
import type React from 'react'
import { useState } from 'react'
import { FiSend } from 'react-icons/fi'

interface AiInputProp {
  sendInput: (input: string) => void
}

const AiInput: React.FC<AiInputProp> = ({ sendInput }) => {
  const [input, setInput] = useState('')
  return (
    <div className="border-neutral-100 border-t bg-neutral-white p-3">
      <div className="body-xs flex items-center justify-center gap-1 pb-3 text-center text-neutral-500">
        {input ? (
          <span>You have {1} free trials left</span>
        ) : (
          <>
            <span>Your interaction will cost</span>
            <Image
              src={'/images/layout/coin.png'}
              alt="coin"
              width={12}
              height={12}
            />
            <span>1</span>
          </>
        )}
      </div>
      <div className="flex items-center rounded-[.5rem] border border-neutral-800 bg-neutral-100 px-3">
        <Input
          className="body-m flex-1 border-none text-neutral-800 outline-none"
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              if (!input) return
              sendInput(input)
            }
          }}
        />
        <Button
          variant={'text'}
          className={`p-0 `}
          disabled={!input}
          onClick={() => {
            if (!input) return
            sendInput(input)
          }}
        >
          <FiSend
            className={`size-6 ${input ? 'text-neutral-800' : 'text-neutral-400'}`}
          />
        </Button>
      </div>
    </div>
  )
}

export default AiInput
