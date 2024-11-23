
import Image from 'next/image'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import DuckModal from './duck-modal'
import TipContent from './tip-content'

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface DuckProp {}

const Duck: React.FC<DuckProp> = () => {
  const [_hover, setHover] = useState(false)
  const [tips, setTips] = useState<any>([])
  const [open, setOpen] = useState(false)

  const timer = useRef<NodeJS.Timeout>()

  const removeTips = () => {
    timer.current = setTimeout(() => {
      const newTips = structuredClone(tips)
      newTips.splice(newTips.length - 1, 1)
      setTips(newTips)
      clearTimeout(timer.current)
    }, 1000)
  }

  const _addTips = () => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    setTips([...tips, '1'])
  }
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (tips.length) {
      removeTips()
    }
  }, [tips])
  return (
    <>
      <div
        className="relative h-full"
        onMouseEnter={() => {
          setHover(true)
        }}
        onMouseLeave={() => setHover(false)}
      >
        <div
          onClick={_event => {
            setOpen(!open)
          }}
        >
          <Image
            src={'/images/mission-center/duck_default.png'}
            alt="pet"
            width={85}
            height={90}
            className="pointer-events-none"
          />
        </div>
        <div className="absolute right-[1.25rem] bottom-[6.25rem] w-[9.875rem] ">
          <TipContent tips={tips} />
        </div>
      </div>
      {open && <DuckModal onClose={() => setOpen(false)} />}
    </>
  )
}

export default Duck
