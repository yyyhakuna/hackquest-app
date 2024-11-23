import { Link } from '@/app/navigation'
import { Card } from '@hackquest/ui/shared/card'
import { LuArrowRight, LuPlusSquare } from 'react-icons/lu'

export function ExploreHackathon() {
  return (
    <Link href="/explore">
      <Card className="relative flex cursor-pointer justify-between p-6 max-sm:flex-col max-sm:gap-1.5 sm:items-center">
        <div className="flex items-center justify-center gap-2 max-sm:hidden sm:w-[366px]">
          <h3 className="headline-l">Explore Hackathon</h3>
          <LuArrowRight className="size-4" />
        </div>
        <div className="flex gap-1.5 max-sm:w-full max-sm:flex-col sm:items-center sm:gap-6">
          <div className="flex flex-col gap-1.5 max-sm:w-full sm:ml-14 sm:gap-3">
            <div className="h-9 w-20 rounded-md bg-neutral-200 sm:h-8 sm:w-36 sm:rounded-xl" />
            <div className="h-9 w-full rounded-md bg-neutral-200 sm:h-11 sm:w-72 sm:rounded-xl" />
            <div className="h-9 w-full rounded-md bg-neutral-200 sm:h-24 sm:w-72 sm:rounded-xl" />
          </div>
          <div className="h-28 w-full rounded-md bg-neutral-200 sm:h-48 sm:w-[20.625rem] sm:rounded-xl" />
        </div>
        <div className="flex items-center gap-3 sm:hidden">
          <div className="h-9 w-20 rounded-md bg-neutral-200" />
          <div className="h-9 w-20 rounded-md bg-neutral-200" />
        </div>
        <button
          type="button"
          className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 inline-flex size-20 items-center justify-center rounded-full bg-primary outline-none sm:hidden"
        >
          <LuPlusSquare className="size-6" />
        </button>
      </Card>
    </Link>
  )
}
