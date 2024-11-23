'use client'

import { usePathname } from '@/app/navigation'
import { sidebarPressKitRegister } from '@/constants/sidebar-pressKit-register'
import { type SidebarItem, sidebarRegister } from '@/constants/sidebar-register'
import { cn } from '@hackquest/ui/lib/utils'
import { SidebarGroupWrapper } from './sidebar-group'
import { SidebarLink } from './sidebar-link'

const SidebarContent = ({ className }: { className?: string }) => {
  let sidebarList: SidebarItem[] = []

  const pathname = usePathname()

  if (!pathname?.includes('/press-kit')) {
    sidebarList = sidebarRegister()
  } else {
    sidebarList = sidebarPressKitRegister()
  }

  const sidebarListRender = (list: SidebarItem[], level = 0) => {
    return list.map(sidebarItem => {
      switch (sidebarItem.type) {
        case 'label':
          return (
            <li
              key={sidebarItem.title}
              className="flex items-center gap-1 py-1"
            >
              <span className="font-nunito font-semibold text-neutral-400 text-xs leading-normal">
                {sidebarItem.title}
              </span>
              <span className="inline-block h-px flex-1 bg-neutral-200" />
            </li>
          )
        case 'link':
          return (
            <SidebarLink
              linkItem={sidebarItem}
              key={sidebarItem.title}
              level={level}
            />
          )
        case 'group':
          return (
            <SidebarGroupWrapper
              key={sidebarItem.title}
              group={sidebarItem}
              parent={sidebarItem}
              level={level}
            >
              {sidebarListRender(sidebarItem.children, level + 1)}
            </SidebarGroupWrapper>
          )
      }
    })
  }

  return (
    <ul
      className={cn(
        'scroll-wrap-y flex flex-1 flex-col gap-1 px-3 py-8 sm:overflow-auto',
        className,
      )}
    >
      {sidebarListRender(sidebarList)}
    </ul>
  )
}

export default SidebarContent
