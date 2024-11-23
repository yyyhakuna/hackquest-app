'use client'

import { useAuthStore } from '@/store/auth'
import { useAuthenticated } from '@/store/user'
import { cn } from '@hackquest/ui/lib/utils'
import type * as React from 'react'
import toast from 'react-hot-toast'
import { LuPlus } from 'react-icons/lu'

export function AttestButton({
  className,
  onClick,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  const isAuthenticated = useAuthenticated()
  const { setAuthModalOpen } = useAuthStore()

  return (
    <button
      aria-label="Add Attestation"
      className={cn(
        'inline-flex h-5 items-center justify-center gap-1 self-start rounded-full bg-primary-link px-2 py-0.5 text-neutral-white outline-none transition-colors duration-300 hover:bg-blue-400',
        className,
      )}
      onClick={event => {
        event.preventDefault()
        event.stopPropagation()
        event.nativeEvent.stopImmediatePropagation()
        if (isAuthenticated) {
          onClick?.(event)
        } else {
          toast.error('Please login to attest')
          setAuthModalOpen(true)
        }
      }}
      {...props}
    >
      <LuPlus className="size-3" />
      <span className="headline-xs">Attest</span>
    </button>
  )
}
