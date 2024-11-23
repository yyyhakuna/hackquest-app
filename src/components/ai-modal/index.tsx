'use client'
import { type MotionProps, motion } from 'framer-motion'
import type React from 'react'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import AiContent from './ai-content'
import { calculatePosition } from './utils'

const animateProps: MotionProps = {
  initial: { scaleY: 0, opacity: 0, translateY: '0%' },
  animate: {
    opacity: 1,
    scaleY: 1,
    translateY: '12px',
    position: 'absolute',
  },
  exit: {
    opacity: 1,
    scaleY: 1,
    translateY: '12px',
    position: 'absolute',
  },
  transition: { duration: 0.5, type: 'spring' },
  style: { originY: 'bottom' },
}

interface AiModalProp {
  children?: React.ReactNode
}
const AiModal: React.FC<AiModalProp> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { x, y } = calculatePosition(event)
    setPosition({ x, y })
    setOpen(!open)
  }
  return (
    <>
      <div onClick={handleClick}>{children}</div>
      {open &&
        createPortal(
          <motion.div
            {...animateProps}
            className={
              'fixed z-[99] h-[37.5rem] w-[30rem] rounded-2xl border border-neutral-200 bg-neutral-white shadow-[0_2px_4px_0_rgba(0,0,0,0.08),0_3px_10px_0_rgba(0,0,0,0.1)]'
            }
            style={{
              left: position.x,
              top: position.y,
            }}
          >
            <AiContent
              onClose={() => {
                setOpen(false)
              }}
            />
          </motion.div>,
          document.body,
        )}
    </>
  )
}

export default AiModal
