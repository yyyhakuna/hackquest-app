'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type * as React from 'react'

export interface AnimatedContentProps
  extends React.ComponentProps<typeof motion.div> {
  value: React.Attributes['key']
}

export function AnimatedContent({
  children,
  value,
  ...props
}: AnimatedContentProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={value}
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -5, opacity: 0 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
