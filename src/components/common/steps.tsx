'use client'

import { cn } from '@hackquest/ui/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'

export function Steps({
  currentStep,
  totalStep = 3,
  className,
}: {
  currentStep: number
  totalStep?: number
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center gap-2.5',
        className,
      )}
    >
      {[...Array(totalStep)].map((_, index) => (
        <div key={index} className="relative h-1.5 w-12 rounded-full">
          <span className="absolute inset-0 rounded-full bg-neutral-200" />
          <AnimatePresence>
            {index + 1 <= currentStep && (
              <motion.span
                className="absolute inset-0 origin-left rounded-full bg-primary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
