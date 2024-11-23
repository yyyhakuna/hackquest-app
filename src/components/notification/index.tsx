'use client'
import { GlobalModal, useGlobalModalStore } from '@/store/global-modal'
import { type MotionProps, motion } from 'framer-motion'
import type React from 'react'
import { useState } from 'react'
import NotificationCard from './notification-card'
import NotificationModal from './notification-modal'
const animateProps: MotionProps = {
  initial: { opacity: 0, translateX: '100%' },
  animate: {
    opacity: 1,
    translateX: '0',
  },
  exit: {
    opacity: 1,
    translateX: '100%',
  },
  transition: { duration: 0.5, type: 'spring' },
  style: { originY: 'bottom' },
}
const Notification: React.FC = () => {
  const { modalType, setModalType } = useGlobalModalStore()
  const data = Array.from({ length: 20 }).map((_, index) => index + 1)
  const [open, setOpen] = useState(false)
  return (
    modalType === GlobalModal.NOTIFICATION && (
      <>
        <div
          className="fixed top-0 left-0 h-full w-full bg-neutral-600 bg-opacity-25"
          onClick={() => setModalType(null)}
        >
          <motion.div
            {...animateProps}
            className="absolute top-[4rem] right-0 flex h-[calc(100%-4rem)] w-[27.125rem] flex-col bg-neutral-white "
          >
            <div className="title-3 flex h-[3.5rem] items-center border-neutral-200 border-b px-6 text-neutral-800">
              Notification
            </div>
            <div className="scroll-wrap-y flex-1 ">
              {data.map(v => (
                <div
                  key={v}
                  onClick={e => {
                    e.stopPropagation()
                    setOpen(true)
                  }}
                >
                  <NotificationCard />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <NotificationModal open={open} onOpenChange={setOpen} />
      </>
    )
  )
}

export default Notification
