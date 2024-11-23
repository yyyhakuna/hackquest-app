'use client'

import { usePathname } from '@/app/navigation'
import type { SidebarGroupItem } from '@/constants/sidebar-register'
import { cn } from '@hackquest/ui/lib/utils'
import { type ReactNode, useEffect, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

export function SidebarGroupWrapper({
  children,
  group,
  level = 0,
  parent,
}: {
  children: ReactNode
  group: SidebarGroupItem
  level?: number
  parent: SidebarGroupItem
}) {
  const [active, setActive] = useState(true)
  const pathname = usePathname()
  useEffect(() => {
    if (parent.children.find((child: any) => child.link === pathname)) {
      setActive(true)
    }
  }, [parent, pathname])
  return (
    <div className="relative w-full">
      <div
        key={group.title}
        className={cn(
          'body-s flex cursor-pointer items-center justify-between rounded-lg border border-transparent px-3 py-2 transition-all hover:border-neutral-200 hover:bg-neutral-100',
          {
            'border-neutral-200 bg-neutral-100': active,
          },
        )}
        style={{
          paddingLeft: !level ? `12px` : `${12 + level * 24}px`,
        }}
        onClick={() => {
          setActive(!active)
        }}
        onKeyDown={() => {
          setActive(!active)
        }}
      >
        <div className="flex items-center gap-2">
          <span>{group.icon}</span>
          <span>{group.title}</span>
        </div>

        <FiChevronDown
          className={cn('inline-block rotate-0 transition-all', {
            '-rotate-180': active,
          })}
        />
      </div>
      <div className={active ? 'mt-1 flex flex-col gap-1' : 'hidden'}>
        {children}
      </div>
    </div>
  )
}
