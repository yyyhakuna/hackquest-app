import type { HackathonExtend } from '@/graphql/generated/hooks'
import type {
  HackathonInfoSectionCustomType,
  HackathonSponsorsKeys,
} from '@/service/hackathon/type'
import Image from 'next/image'
import type React from 'react'

type SponsorsProp =
  | {
      hackathon: HackathonExtend
      title: string
      type: HackathonSponsorsKeys
    }
  | {
      isCustom: boolean
      custom: HackathonInfoSectionCustomType
    }

const Sponsors: React.FC<SponsorsProp> = props => {
  let list = []
  let title = ''
  if ('isCustom' in props) {
    list = props.custom?.list || []
    title = props.custom?.title || ''
  } else {
    list =
      props.hackathon?.info?.sections?.[props.type as HackathonSponsorsKeys]
        ?.list || []
    title = props.title
  }
  if (!list?.length) return null
  return (
    <div>
      <p className="title-3 text-neutral-800">{title}</p>
      <div className="mt-4 flex flex-wrap gap-5 text-neutral-800 sm:mt-6">
        {list.map((v: any, i: number) => (
          <div
            key={i}
            className="flex h-[5.0625rem] w-full items-center gap-2 rounded-[6.25rem] border-[2px] border-neutral-200 p-2 sm:w-[calc((100%-2.5rem)/3)]"
          >
            <Image
              src={v.picture}
              alt={v.name}
              width={65}
              height={65}
              className="rounded-[50%]"
            />
            <div className="flex-1 flex-shrink-0">
              <p className="headline-m line-clamp-1 font-bold">{v.name}</p>
              <p className="body-s line-clamp-2">{v.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sponsors
