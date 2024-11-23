import { cn } from '@hackquest/ui/lib/utils'
import type * as React from 'react'

export function Card({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'w-full rounded-xl border-2 border-neutral-200 p-6',
        className,
      )}
      {...props}
    />
  )
}
