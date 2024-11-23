'use client'

import { cn } from '@hackquest/ui/lib/utils'
import * as React from 'react'

export interface TimelineContextValue {
  active: number
  orientation: 'horizontal' | 'vertical'
}

const TimelineContext = React.createContext<TimelineContextValue>({
  active: -1,
  orientation: 'vertical',
})

export function useTimelineContext() {
  return React.useContext(TimelineContext)
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: number
  orientation?: 'horizontal' | 'vertical'
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  (
    { className, active = -1, orientation = 'vertical', children, ...props },
    ref,
  ) => {
    const childrenArray = React.Children.toArray(children)

    const timelineItems = childrenArray.map((child, index) => {
      return React.cloneElement(child as React.ReactElement, {
        index,
        last: index === childrenArray.length - 1,
        // @ts-ignore
        ...child.props,
      })
    })

    const contextValue = React.useMemo(
      () => ({ active, orientation }),
      [active, orientation],
    )

    return (
      <TimelineContext.Provider value={contextValue}>
        <div
          ref={ref}
          data-orientation={orientation}
          className={cn(
            'group flex flex-col gap-12',
            {
              'flex-row': orientation === 'horizontal',
            },
            className,
          )}
          {...props}
        >
          {timelineItems}
        </div>
      </TimelineContext.Provider>
    )
  },
)

Timeline.displayName = 'Timeline'

const TimelineConnector = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useTimelineContext()
  const { active, completed } = useTimelineItemContext()
  return (
    <div
      ref={ref}
      className={cn(
        'absolute',
        {
          'top-3 right-[calc(50%+28px)] left-[calc(-50%-20px)] flex-auto':
            orientation === 'horizontal',
          'top-[calc(-50%-28px)] bottom-[calc(50%+20px)] left-3 flex-auto':
            orientation === 'vertical',
        },
        className,
      )}
      {...props}
    >
      <div
        className={cn('h-px w-full bg-neutral-300', {
          'bg-neutral-600': active || completed,
          'h-full w-px': orientation === 'vertical',
        })}
      />
    </div>
  )
})

TimelineConnector.displayName = 'TimelineConnector'

export interface TimelineItemContextValue {
  index: number
  last: boolean
  active: boolean
  completed: boolean
}

const TimelineItemContext = React.createContext<TimelineItemContextValue>({
  index: -1,
  last: false,
  active: false,
  completed: false,
})

export function useTimelineItemContext() {
  return React.useContext(TimelineItemContext)
}

export interface TimelineItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  index?: number
  last?: boolean
  active?: boolean
  completed?: boolean
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  (
    {
      className,
      index = -1,
      last = false,
      active: activeProp,
      completed: completedProp,
      children,
      ...props
    },
    ref,
  ) => {
    const { active: activeTimeline, orientation } = useTimelineContext()

    let [active = false, completed = false] = [activeProp, completedProp]

    if (activeTimeline === index) {
      active = activeProp !== undefined ? activeProp : true
    } else if (activeTimeline > index) {
      completed = completedProp !== undefined ? completedProp : true
    }

    const contextValue = React.useMemo(
      () => ({
        index,
        last,
        active,
        completed,
      }),
      [index, last, active, completed],
    )
    return (
      <TimelineItemContext.Provider value={contextValue}>
        <div
          ref={ref}
          data-orientation={orientation}
          data-state={active ? 'active' : 'inactive'}
          className={cn('relative flex-1', className)}
          {...props}
        >
          {index !== 0 ? <TimelineConnector /> : null}
          {children}
        </div>
      </TimelineItemContext.Provider>
    )
  },
)

TimelineItem.displayName = 'TimelineItem'

const TimelineContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { orientation } = useTimelineContext()
  const { active, completed } = useTimelineItemContext()
  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-2',
        {
          'flex-col text-center': orientation === 'horizontal',
          'flex-row text-left': orientation === 'vertical',
        },
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'size-6 rounded-full border border-transparent bg-neutral-200',
          {
            'border-primary-100 bg-primary': active || completed,
          },
        )}
      />
      <div className="flex flex-col">{children}</div>
    </div>
  )
})

TimelineContent.displayName = 'TimelineContent'

const TimelineTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => {
  const { active, completed } = useTimelineItemContext()
  return (
    <h3
      ref={ref}
      className={cn('headline-m text-primary-neutral', {
        'text-neutral-400': !active && !completed,
      })}
      {...props}
    >
      {children}
    </h3>
  )
})

TimelineTitle.displayName = 'TimelineTitle'

const TimelineDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { active, completed } = useTimelineItemContext()
  return (
    <p
      ref={ref}
      className={cn(
        'body-s text-secondary-neutral',
        {
          'text-neutral-400': !active && !completed,
        },
        className,
      )}
      {...props}
    >
      {children}
    </p>
  )
})

export {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
}
