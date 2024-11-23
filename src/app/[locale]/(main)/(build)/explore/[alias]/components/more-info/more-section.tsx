import { Link } from '@/app/navigation'
import type { HackathonPartnersContentType } from '@/components/hackathon-creation/constants/type'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@hackquest/ui/shared/avatar'
import type React from 'react'

interface MoreSectionProp {
  partner: HackathonPartnersContentType
}

const MoreSection: React.FC<MoreSectionProp> = ({ partner }) => {
  if (!partner.accounts.length) return null
  return (
    <div>
      <p className="title-3 text-neutral-800">{partner.title}</p>
      <div className="mt-4 flex flex-wrap gap-3 text-neutral-800 sm:mt-6 sm:gap-5">
        {partner.accounts?.map(v => (
          <Link
            href={v.link}
            target='_blank'
            key={v.id}
            className="flex w-[calc((100%-0.75rem)/2)] items-center gap-2 rounded-[6.25rem] border-[2px] border-neutral-200 bg-neutral-white sm:w-[calc((100%-3.75rem)/4)] sm:p-2"
          >
            <Avatar
              className={` overflow-hidden rounded-[50%] border-[1px] border-neutral-white ${v.type === 'intro' ? 'h-[4.0625rem] w-[4.0625rem]' : 'h-[2.875rem] w-[2.875rem]'}`}
            >
              <AvatarImage src={v.avatar} alt={v.name} />
              <AvatarFallback>{v.name.charAt(0)?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex-shrink-0">
              <p className="headline-m line-clamp-1 font-bold">{v.name}</p>
              {v.type === 'intro' && (
                <p className="body-s line-clamp-2">{v.intro}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MoreSection
