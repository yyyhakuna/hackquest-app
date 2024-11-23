'use client'

import writeText from 'copy-to-clipboard'
import * as React from 'react'
import toast from 'react-hot-toast'

export interface CopyToClipboardProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onCopy'> {
  text: string
  children: React.ReactNode
  onCopy?: (text: string, result: boolean) => void
  options?: {
    debug?: boolean
    message?: string
    format?: string
  }
}

export function CopyToClipboard({
  text,
  children,
  onCopy,
  options,
  ...props
}: CopyToClipboardProps) {
  const child = React.Children.only(children) as React.ReactElement<
    React.HTMLAttributes<HTMLElement>
  >

  function onClick(event: React.MouseEvent<HTMLDivElement>) {
    const result = writeText(text, options)
    onCopy?.(text, result)

    if (result) {
      toast.success(options?.message || 'Copied to clipboard')
    } else {
      toast.error(options?.message || 'Failed to copy to clipboard')
    }

    if (child && child.props && typeof child.props.onClick === 'function') {
      child.props.onClick(event)
    }
  }

  return React.cloneElement(child, {
    ...props,
    onClick,
  })
}
