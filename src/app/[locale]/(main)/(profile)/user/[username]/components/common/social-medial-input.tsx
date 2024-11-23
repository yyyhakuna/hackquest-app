'use client'

import * as React from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  prefix?: string
}

const SocialMediaInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ prefix, ...props }, ref) => {
    return (
      <div className="flex h-9 items-center">
        <div className="body-s inline-flex h-full items-center rounded-l-md px-2 text-neutral-600 ring-1 ring-neutral-300 ring-inset">
          {prefix}
        </div>
        <input
          ref={ref}
          // rounded-l-none fix IOS input bug
          className="-ml-px flex-1 rounded-r-md rounded-l-none bg-transparent p-2 text-sm outline-none ring-1 ring-neutral-300 ring-inset transition-all duration-300 placeholder:text-neutral-400 focus:ring-secondary-neutral"
          {...props}
        />
      </div>
    )
  },
)

SocialMediaInput.displayName = 'SocialMediaInput'

export { SocialMediaInput }
