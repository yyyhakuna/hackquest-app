'use client'

import { Link, usePathname } from '@/app/navigation'
import { EcosystemDropdown } from '@/components/ecosystem/ecosystem-dropdown'
import { useAuthenticated } from '@/store/user'
import { Sheet, SheetContent, SheetTrigger } from '@hackquest/ui/shared/sheet'
import Image from 'next/image'
import { FiMenu } from 'react-icons/fi'
import SidebarContent from '../sidebar/sidebar-content'
import { CurrentUser } from './current-user'
import { GlobalSearch } from './global-search'
import { Unauthorized } from './unauthorized'

export function Topbar() {
  const pathname = usePathname()
  const isAuthenticated = useAuthenticated()

  const isHomePage = pathname.includes('/home')

  return (
    <header className="h-16 border-neutral-300 border-b bg-neutral-50">
      <div className="hidden h-full w-full items-center justify-between px-8 sm:flex">
        {isHomePage ? <EcosystemDropdown /> : <GlobalSearch />}
        {isAuthenticated ? <CurrentUser /> : <Unauthorized />}
      </div>
      <div className="flex w-screen sm:hidden">
        <Sheet>
          <div className="flex h-16 w-screen items-center justify-between px-6">
            <SheetTrigger asChild>
              <button aria-label="Open sidebar" className="outline-none">
                <FiMenu size={24} className="text-primary-neutral" />
              </button>
            </SheetTrigger>
            <Link href="/" aria-label="Back to home">
              <Image
                src="/images/logo/logo-text.svg"
                alt="hackquest logo"
                width={134}
                height={16}
              />
            </Link>
            <div>&nbsp;</div>
          </div>

          <SheetContent hiddenClose className="overflow-auto p-0" side="left">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
