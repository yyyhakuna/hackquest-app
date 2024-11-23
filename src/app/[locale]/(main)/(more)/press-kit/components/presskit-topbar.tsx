import { Link } from '@/app/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@hackquest/ui/shared/avatar'
import Image from 'next/image'
import { IoMdNotificationsOutline } from 'react-icons/io'

const PressKitTopBar = () => {
  return (
    <header className="h-16 border-neutral-300 border-b bg-neutral-50">
      <div className="hidden h-full w-full items-center justify-between px-8 sm:flex">
        <p className="title-3 text-neutral-800">About</p>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Image src="/images/layout/experience.svg" alt="experience" width={16} height={24} />
            <span className="font-bold text-neutral-500 text-sm">10</span>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/images/layout/coin.svg" alt="coin" width={24} height={24} />
            <span className="font-bold text-neutral-500 text-sm">212</span>
          </div>
          <button className="text-neutral-600 outline-none">
            <IoMdNotificationsOutline size={24} />
          </button>
          <Avatar>
            <AvatarImage src="/images/layout/avatar.svg" alt="avatar" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="relative flex h-full w-full items-center justify-center px-6 py-4 sm:hidden">
        <button className="-translate-y-1/2 absolute top-1/2 left-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 12H21" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 6H21" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 18H21" stroke="#262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <Link href="/" aria-label="Back to home">
          <Image src="/images/logo/logo-text.svg" alt="hackquest logo" width={134} height={16} />
        </Link>
      </div>
    </header>
  )
}

export default PressKitTopBar
