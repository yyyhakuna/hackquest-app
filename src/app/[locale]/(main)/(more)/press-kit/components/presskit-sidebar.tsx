'use client'

import { Link } from '@/app/navigation'
import Image from 'next/image'
import { useSelectedLayoutSegments } from 'next/navigation'

import MenuLink from '@/constants/menu-link'
import { cn } from '@hackquest/ui/lib/utils'
import { FiArrowLeft } from 'react-icons/fi'
import { pressKitNavData } from '../constants/data'
export function PressKitSidebar() {
  const segments = useSelectedLayoutSegments()

  return (
    <aside className="hidden w-60 border-neutral-300 border-r bg-neutral-50 px-3 py-8 sm:block">
      <Link href="/" aria-label="Back to home">
        <Image src="/images/logo/logo-text.svg" alt="hackquest logo" priority width={134} height={16} />
      </Link>
      <ul className="mt-12 flex flex-col gap-1">
        <li className="cursor-pointer rounded-lg px-3 py-2.5 font-extrabold text-sm transition-colors duration-200">
          <Link href="/" className="flex items-center gap-2">
            <FiArrowLeft size={24} />
            <span>Back</span>
          </Link>
        </li>
        <li className="mb-1 flex w-full items-center gap-2 py-1">
          <p>Press kit</p>
          <div className="h-[1px] w-[145px] bg-neutral-200" />
        </li>
        {pressKitNavData.map(nav => (
          <li
            key={nav.id}
            className={cn(
              'cursor-pointer rounded-lg px-3 py-2.5 font-extrabold text-sm transition-colors duration-200',
              {
                'bg-neutral-200': segments[segments.length - 1] === nav.id,
              },
            )}
          >
            <Link href={`${MenuLink.PRESS_KIT}/${nav.id}`} className="flex items-center gap-2">
              {nav.icon}
              <span>{nav.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
