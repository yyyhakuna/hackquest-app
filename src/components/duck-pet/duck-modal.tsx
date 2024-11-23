'use client'
import { usePathname, useRouter } from '@/app/navigation'
import MenuLink from '@/constants/menu-link'
import { type MotionProps, motion } from 'framer-motion'
import type React from 'react'
import { createPortal } from 'react-dom'
import DuckContent from './duck-content'

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
interface DuckModalProp {
  onClose: () => void
}

const DuckModal: React.FC<DuckModalProp> = ({ onClose }) => {
  const pathname = usePathname()
  const router = useRouter()
  const onEarn = () => {
    if (!pathname.includes(MenuLink.MISSION_CENTER)) {
      router.push(MenuLink.MISSION_CENTER)
    }
    onClose()
  }
  return createPortal(
    <motion.div
      {...animateProps}
      className={
        'fixed top-[calc(50%-18.75rem)] right-[5.625rem] z-[99] h-[37.5rem] w-[30rem] rounded-2xl border border-neutral-200 bg-neutral-white shadow-[0_2px_4px_0_rgba(0,0,0,0.08),0_3px_10px_0_rgba(0,0,0,0.1)]'
      }
    >
      <DuckContent onClose={onClose} onEarn={onEarn} />
    </motion.div>,
    document.body,
  )
}

export default DuckModal
