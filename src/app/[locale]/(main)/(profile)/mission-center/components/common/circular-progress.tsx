import { cn } from '@hackquest/ui/lib/utils'
import * as React from 'react'

interface CircularProgressProps
  extends Omit<React.HTMLProps<HTMLDivElement>, 'color'> {
  size?: number
  max?: number
  min?: number
  thickness?: number
  value?: number
  children?: React.ReactNode
  trackColor?: string
  color?: string
}

const CircularProgress = React.forwardRef<
  HTMLDivElement,
  CircularProgressProps
>(
  (
    {
      size = 55,
      max = 100,
      min = 0,
      thickness = 5,
      value = 0,
      trackColor = 'hsl(var(--neutral-200))',
      color = 'hsl(var(--primary-500))',
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const rootSize = size + thickness
    const radius = rootSize / 2 - thickness / 2
    const strokeDasharray = 2 * Math.PI * radius
    const strokeDashoffset =
      strokeDasharray - (strokeDasharray * value) / (max - min)

    return (
      // biome-ignore lint/a11y/useFocusableInteractive: <explanation>
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        className={cn(
          'relative inline-flex shrink-0 items-center justify-center align-middle',
          className,
        )}
        {...props}
        style={{
          width: rootSize,
          height: rootSize,
          ...style,
        }}
      >
        <svg className="absolute top-0 left-0" width="100%" height="100%">
          <circle
            stroke={trackColor}
            strokeWidth={thickness}
            fill="transparent"
            cx="50%"
            cy="50%"
            r={radius}
          />
          <circle
            stroke={color}
            strokeWidth={thickness}
            fill="transparent"
            cx="50%"
            cy="50%"
            r={radius}
            strokeLinecap="round"
            strokeDashoffset={strokeDashoffset}
            strokeDasharray={strokeDasharray}
            className="origin-center rotate-90 animate-grow-rotate"
            style={
              {
                '--stroke-dashoffset': `${strokeDashoffset}px`,
                '--stroke-dasharray': `${strokeDasharray}px`,
              } as React.CSSProperties
            }
          />
        </svg>
        {children}
      </div>
    )
  },
)

CircularProgress.displayName = 'CircularProgress'

export { CircularProgress }
