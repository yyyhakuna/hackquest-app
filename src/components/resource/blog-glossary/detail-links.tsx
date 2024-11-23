import { Link } from '@/app/navigation'
import { HACKQUEST_DISCORD, HACKQUEST_TELEGRAM, HACKQUEST_TWITTER } from '@/constants/links'
import { useTranslations } from 'next-intl'
import type React from 'react'
import { FaDiscord,FaTelegram} from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface DetailLinksProp {}

const DetailLinks: React.FC<DetailLinksProp> = () => {
  const t = useTranslations('Blog')
  return <div className='flex items-center justify-between border-neutral-200 border-t pt-5'>
    <span className='title-5 text-neutral-800'>{t('detailLinkText')}</span>
    <div className='title-3 flex items-center gap-4 text-neutral-500'>
      <Link href={HACKQUEST_DISCORD} target='_blank'><FaDiscord /></Link>
      <Link href={HACKQUEST_TWITTER}  target='_blank'><RiTwitterXFill /></Link>
      <Link href={HACKQUEST_TELEGRAM}  target='_blank'><FaTelegram /></Link>
    </div>
  </div>
}

export default DetailLinks
