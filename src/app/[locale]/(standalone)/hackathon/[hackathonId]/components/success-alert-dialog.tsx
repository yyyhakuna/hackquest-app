'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import type * as React from 'react'

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
}

export interface SuccessAlertDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
}

export function SuccessAlertDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
}: SuccessAlertDialogProps) {
  return (
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
      {open && (
        <motion.div
          className="absolute inset-0 z-[999] flex h-full w-full items-center justify-center overflow-y-hidden bg-neutral-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={e => e.stopPropagation()}
            className="flex w-[92.5%] flex-col items-center rounded-xl bg-primary p-8 sm:w-[824px] sm:rounded-3xl"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h1 className="title-1 sm:mt-5">{title}</h1>
            <p className="body-s mt-1.5 text-secondary-neutral">
              {description}
            </p>
            <div className="mt-8 flex w-full flex-col items-center gap-6 sm:w-auto sm:flex-row">
              {children}
            </div>
            <div className="mt-16 flex items-center justify-center sm:mt-28">
              <Image
                src="/images/logo/onboarding.png"
                alt="hackquest"
                width={351}
                height={334}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
