import { cn } from '@hackquest/ui/lib/utils'
import type * as React from 'react'
import { CiEdit } from 'react-icons/ci'

export function FileInput({ className, onFileChange }: { className?: string; onFileChange?: (url: string) => void }) {
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = event => {
        if (event.target?.result) {
          const result = event.target?.result
          if (typeof result === 'string') {
            onFileChange?.(result)
          }
        }
      }
      event.target.value = ''
    }
  }
  return (
    <label className={cn('inline-flex cursor-pointer items-center justify-center text-neutral-white', className)}>
      <input type="file" accept="image/*" className="hidden" onChange={onChange} />
      <CiEdit className="h-5 w-5 sm:h-6 sm:w-6" />
    </label>
  )
}
