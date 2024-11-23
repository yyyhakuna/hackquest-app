'use client'

import { Link } from '@/app/navigation'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { FiHelpCircle } from 'react-icons/fi'
import { IoExitOutline } from 'react-icons/io5'
import AskAi from './ask-ai'
import CourseUnits from './course-units'

export function LayoutHeader() {
  const { alias } = useParams()
  const link = `/courses/${alias}`
  return (
    <header className="flex h-16 shrink-0 items-center border-neutral-300 border-b bg-neutral-white px-6">
      <Link href={link} className="sm:hidden">
        <IoExitOutline className="size-6 " />
      </Link>
      <div className="w-[12.5rem] max-sm:hidden">
        <Image
          src="/images/logo/logo-text.svg"
          width={134}
          height={16}
          alt="hackquest"
        />
      </div>
      <div className="flex flex-1 justify-center">
        <CourseUnits />
      </div>
      <div className="w-6 sm:hidden" />
      <div className="flex w-[12.5rem] items-center justify-end gap-6 text-neutral-600 max-sm:hidden">
        <AskAi />
        <FiHelpCircle className="size-6 cursor-pointer" />
        <Link href={link}>
          <IoExitOutline className="size-6" />
        </Link>
      </div>
    </header>
  )
}
