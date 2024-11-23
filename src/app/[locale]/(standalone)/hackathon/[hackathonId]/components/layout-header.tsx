'use client'

import { usePathname, useRouter } from '@/app/navigation'
import Image from 'next/image'
import { IoExitOutline } from 'react-icons/io5'
import { create } from 'zustand'

export const useExitDialog = create<{
  open: boolean
  onOpenChange: (open: boolean) => void
}>(set => ({
  open: false,
  onOpenChange: open => set({ open }),
}))

export function LayoutHeader() {
  const router = useRouter()
  const pathname = usePathname()

  const { onOpenChange } = useExitDialog()

  const isCreatePage = pathname.includes('create')

  function handleExit() {
    if (isCreatePage) {
      router.push('/organizer')
    } else {
      onOpenChange(true)
    }
  }

  return (
    <header className="h-16 shrink-0 bg-neutral-white">
      <div className="relative flex h-full w-full items-center justify-center">
        <Image
          src="/images/logo/logo-text.svg"
          width={134}
          height={16}
          alt="hackquest"
        />
        <button
          className="-translate-y-1/2 absolute top-1/2 right-10 inline-flex items-center gap-1.5 text-neutral-off-black outline-none"
          onClick={handleExit}
        >
          <IoExitOutline className="size-6" />
          <span className="body-l">Exit</span>
        </button>
      </div>
    </header>
  )
}
