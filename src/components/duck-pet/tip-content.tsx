import { useAutoAnimate } from '@formkit/auto-animate/react'
import type { MotionProps } from 'framer-motion'
import type React from 'react'

const _animateProps: MotionProps = {
  initial: { opacity: 0, translateY: '0%' },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
  transition: { duration: 0.5, type: 'spring' },
}

interface TipContentProp {
  tips: any[]
}

const TipContent: React.FC<TipContentProp> = ({ tips }) => {
  const [parent] = useAutoAnimate()

  return (
    <div className="flex w-full flex-col-reverse gap-2" ref={parent}>
      {tips.map((_, index) => (
        <div
          key={index}
          className="headline-xs w-full rounded-[1.5rem] rounded-br-[.5rem] bg-primary p-3 text-neutral-800"
        >
          {index}
          {index}
          {index}
          {index}
          {index}
        </div>
      ))}
    </div>
  )
}

export default TipContent
