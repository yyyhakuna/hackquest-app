'use client'

import { motion, useSpring, useTransform } from 'framer-motion'
import * as React from 'react'

export interface AnimatedNumberProps
  extends React.ComponentProps<typeof motion.span> {
  value: number
}

export const AnimatedNumber = ({ value, ...props }: AnimatedNumberProps) => {
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 })
  const display = useTransform(spring, current =>
    Math.round(current).toLocaleString(),
  )

  React.useEffect(() => {
    spring.set(value)
  }, [spring, value])

  return <motion.span {...props}>{display}</motion.span>
}
