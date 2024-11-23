'use client'

import MenuLink from '@/constants/menu-link'
import type { ValueOf } from 'next/dist/shared/lib/constants'
import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

type SidebarContextType = {
  active: ValueOf<typeof MenuLink>
  setActive: Dispatch<SetStateAction<ValueOf<typeof MenuLink>>>
}

const SidebarContext = createContext<SidebarContextType>({
  active: MenuLink.HOME,
  setActive: () => {},
})

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<ValueOf<typeof MenuLink>>(MenuLink.HOME)

  return (
    <SidebarContext.Provider value={{ active, setActive }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  return context
}
