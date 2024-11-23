import useMeasure from '@/hooks/use-measure'
import { cn } from '@hackquest/ui/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import * as React from 'react'

const PanelContext = React.createContext<{ value: string | number }>({
  value: '',
})

export interface ResizablePanelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string | number
}

function ResizablePanel({
  children,
  className,
  value,
  ...rest
}: ResizablePanelProps) {
  const [ref, bounds] = useMeasure<HTMLDivElement>()
  return (
    <motion.div
      animate={{ height: bounds.height > 0 ? bounds.height : undefined }}
      transition={{ type: 'spring', bounce: 0, duration: 0.8 }}
      className={cn('relative w-full overflow-hidden', className)}
    >
      <div ref={ref} {...rest}>
        <PanelContext.Provider value={{ value }}>
          {children}
        </PanelContext.Provider>
      </div>
    </motion.div>
  )
}

export interface ResizablePanelItemProps
  extends React.ComponentProps<typeof motion.div> {
  value: string | number
}

function ResizablePanelItem({
  value,
  children,
  ...rest
}: ResizablePanelItemProps) {
  const panelContext = React.useContext(PanelContext)
  const isActive = panelContext.value === value

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              type: 'ease',
              ease: 'easeInOut',
              duration: 0.3,
              delay: 0.2,
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              type: 'ease',
              ease: 'easeInOut',
              duration: 0.2,
            },
          }}
          {...rest}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const Root = ResizablePanel
const Item = ResizablePanelItem

export {
  Root,
  Item,
  //
  ResizablePanel,
  ResizablePanelItem,
}
