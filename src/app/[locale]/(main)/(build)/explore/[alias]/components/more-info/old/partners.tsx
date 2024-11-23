import type { HackathonExtend } from '@/graphql/generated/hooks'
import type {
  HackathonInfoSectionCustomType,
  HackathonParterKeys,
} from '@/service/hackathon/type'
import Image from 'next/image'
import type React from 'react'

type PartnersProp =
  | {
      hackathon: HackathonExtend
      title: string
      type: HackathonParterKeys
    }
  | {
      isCustom: boolean
      custom: HackathonInfoSectionCustomType
    }

const Partners: React.FC<PartnersProp> = props => {
  let list = []
  let title = ''
  if ('isCustom' in props) {
    list = props.custom?.list || []
    title = props.custom?.title || ''
  } else {
    list =
      props.hackathon?.info?.sections?.[props.type as HackathonParterKeys]
        ?.list || []
    title = props.title
  }
  if (!list?.length) return null
  return (
    <div>
      <p className="title-3 text-neutral-800">{title}</p>
      <div className="mt-4 flex flex-wrap gap-3 text-neutral-800 sm:mt-6 sm:gap-5">
        {list.map((v: any, i: number) => (
          <div
            key={i}
            className='flex h-[3.5rem] w-[calc((100%-0.75rem)/2)] items-center gap-2 rounded-[6.25rem] border-[2px] border-neutral-200 bg-neutral-white sm:w-[calc((100%-3.75rem)/4)] sm:p-2'
          >
            <Image
              src={v.picture}
              alt={v.name}
              width={46}
              height={46}
              className="rounded-[50%]"
            />
            <div className="flex-1 flex-shrink-0">
              <p className="headline-m-m line-clamp-1 font-bold">{v.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Partners
