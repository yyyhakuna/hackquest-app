import { Card } from '@hackquest/ui/shared/card'
import type React from 'react'
import { useMemo } from 'react'

interface ActionCardProp {
  children: React.ReactNode
  className?: string
  completed?: boolean
  claimed?: boolean
}

const ActionCard: React.FC<ActionCardProp> = ({
  children,
  className,
  completed,
  claimed,
}) => {
  const renderClassName = useMemo(() => {
    let cls = ''
    if (!completed) {
      cls = 'bg-neutral-white'
    } else {
      if (!claimed) {
        cls = 'bg-primary-50 hover:bg-primary-50'
      } else {
        cls = 'bg-neutral-100 hover:bg-neutral-100'
      }
    }
    return `${cls} ${className}`
  }, [className, completed, claimed])
  return <Card className={renderClassName}>{children}</Card>
}

export default ActionCard
