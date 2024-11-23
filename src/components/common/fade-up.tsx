'use client'

import { motion } from 'framer-motion'
import type * as React from 'react'

export interface FadeUpProps extends React.ComponentProps<typeof motion.div> {
  delay?: number
  duration?: number
}

export function FadeUp({
  children,
  delay = 0,
  duration = 0.5,
  ...rest
}: FadeUpProps) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 15,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay, type: 'spring', duration }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}