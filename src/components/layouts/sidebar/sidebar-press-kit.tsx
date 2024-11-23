import { Link } from '@/app/navigation'
import { cn } from '@hackquest/ui/lib/utils'
import Image from 'next/image'
import SidebarContent from './sidebar-content'

export function SidebarPressKit({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        'flex w-60 flex-shrink-0 flex-col border-neutral-300 border-r bg-neutral-50',
        className,
      )}
    >
      <Link
        href="/"
        aria-label="Back to home"
        className="inline-block px-3 pt-8 pb-4"
      >
        <Image
          src="/images/logo/logo-text.svg"
          alt="hackquest logo"
          priority
          width={134}
          height={16}
        />
      </Link>
      <SidebarContent />
    </aside>
  )
}
