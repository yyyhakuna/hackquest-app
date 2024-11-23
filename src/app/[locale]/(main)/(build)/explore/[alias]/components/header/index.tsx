import { HackathonActionButton } from '@/components/hackathon/hackathon-action-button'
import type { HackathonExtend } from '@/graphql/generated/hooks'
import { copyText } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import type React from 'react'
import toast from 'react-hot-toast'
import { FiShare2 } from 'react-icons/fi'
import Back from '../back'

interface HeaderProp {
  hackathon: HackathonExtend
}

const Header: React.FC<HeaderProp> = ({ hackathon }) => {
  const t = useTranslations()
  return (
    <div className="w-full px-6 pt-[2rem] sm:container">
      <div className=" flex items-center justify-between">
        <Back />
        <div
          className="headline-s hidden cursor-pointer items-center gap-2 text-neutral-500 sm:flex"
          onClick={() => {
            copyText(window.location.href)
            toast.success('Share link copied')
          }}
        >
          <FiShare2 />
          <span>{t('HackathonDetail.shareLink')}</span>
        </div>
      </div>
      <div className="mt-[1.25rem] flex justify-center sm:mt-[-1.25rem]">
        <div className="flex w-full flex-col gap-3 sm:w-[47.25rem] sm:items-center ">
          <h1 className="title-1 text-neutral-800">{hackathon?.name}</h1>
          <p className="body-m text-neutral-500">{hackathon?.info?.intro}</p>
          <div className="w-full pb-8 sm:py-6">
            <HackathonActionButton hackathon={hackathon} isDetail={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
