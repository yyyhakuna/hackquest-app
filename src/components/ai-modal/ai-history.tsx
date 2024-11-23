
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import AiLoading from './ai-loading'

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface AiHistoryProp {}

const AiHistory: React.FC<AiHistoryProp> = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    if (mounted && ref.current) {
      ref.current.scrollTop = ref.current?.scrollHeight
    }
  }, [mounted])
  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <div className="scroll-wrap-y h-full" ref={ref}>
      <div className="body-m flex flex-col gap-3 p-4 text-neutral-800">
        {[1, 2, 3, 4, 5, 5].map((_, index) => (
          <div
            key={index}
            className={`max-w-[25.25rem] rounded-[.5rem] p-3 ${index % 2 === 0 ? 'self-end bg-primary-100' : 'bg-neutral-100'}`}
          >
            Solana is a highly functional open-source project that banks on
            blockchain technology's permissionless nature to provide
            decentralized finance (DeFi) solutions. Introduced by the Solana
          </div>
        ))}
        <AiLoading />
      </div>
    </div>
  )
}

export default AiHistory
