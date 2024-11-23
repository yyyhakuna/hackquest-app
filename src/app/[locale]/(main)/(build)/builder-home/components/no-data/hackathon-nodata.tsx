import { Link } from '@/app/navigation'
import MenuLink from '@/constants/menu-link'
import { Card } from '@hackquest/ui/shared/card'
import type React from 'react'
import { FiArrowRight } from 'react-icons/fi'

const HackathonNodata: React.FC = () => {
  return (
    <Link href={`${MenuLink.EXPLORE}`}>
      <Card className="group relative flex h-[24.4375rem] items-stretch justify-between gap-[3.75rem] p-6 hover:bg-neutral-100 sm:h-[14.625rem]">
        <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center sm:static sm:w-[22.875rem]">
          <div className="headline-l flex items-center gap-2 text-neutral-800">
            <span>Explore Hackathon</span>
            <FiArrowRight className="icon-hover-translate" />
          </div>
        </div>
        <div className="flex flex-1 flex-col items-stretch gap-2 sm:flex-row sm:gap-6">
          <div className="flex flex-1 flex-col justify-between">
            <div className="h-[1.8125rem] w-[50%] rounded-[.75rem] bg-neutral-200" />
            <div className="h-[2.625rem] w-full rounded-[.75rem] bg-neutral-200" />
            <div className="h-[5.4375rem] w-full rounded-[.75rem] bg-neutral-200" />
          </div>
          <div className=" flex-1 rounded-[.75rem] bg-neutral-200" />
        </div>
      </Card>
    </Link>
  )
}

export default HackathonNodata
