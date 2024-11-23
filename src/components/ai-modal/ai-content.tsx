import Image from 'next/image'
import type React from 'react'
import { FiRefreshCcw, FiX } from 'react-icons/fi'
import AiHistory from './ai-history'
import AiInput from './ai-input'

interface AiContentProp {
  onClose: () => void
}

const AiContent: React.FC<AiContentProp> = ({ onClose }) => {
  const onRefresh = () => {}
  const sendInput = (_input: string) => {
  }
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col">
        <div className="flex h-[3.5rem] items-center justify-between border-neutral-300 border-b px-5">
          <div className="title-3 flex items-center gap-3 text-neutral-800">
            <Image
              src={'/images/logo/hackquest_logo.png'}
              alt={'hackquest_logo'}
              width={24}
              height={24}
            />
            <span>HACKQUEST AI</span>
          </div>
          <div className="flex items-center gap-6">
            <FiRefreshCcw
              className="size-6 cursor-pointer"
              onClick={onRefresh}
            />
            <FiX className=" size-6 cursor-pointer" onClick={onClose} />
          </div>
        </div>
        <div className="relative flex-1">
          <div className="no-scrollbar absolute top-0 left-0 h-full w-full">
            <AiHistory />
          </div>
        </div>
      </div>
      <AiInput sendInput={sendInput} />
    </div>
  )
}

export default AiContent
