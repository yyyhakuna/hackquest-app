import { Link } from '@/app/navigation'
import {
  HACKQUEST_DISCORD,
  HACKQUEST_TELEGRAM,
  HACKQUEST_TWITTER,
} from '@/constants/links'
import { getTranslations } from 'next-intl/server'
import type React from 'react'
import { FaDiscord, FaTelegram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import SubTitle from '../subtitle'

const About: React.FC = async () => {
  const t = await getTranslations('PressKit.about')

  return (
    <div className="flex h-full flex-col justify-between pr-0 sm:block sm:pr-[312px]">
      <div className="mb-[32px] flex flex-col gap-[36px]">
        <div>
          <SubTitle title={'About HackQuest'} />
          <div className="body-m text-neutral-800">
            <p>
              HackQuest is a one-stop, self-guided developer education platform.
              HackQuest offers expert-curated learning paths with on-chain
              certificates co-issued by leading Web3 ecosystems including
              Solana, Mantle Network, and Arbitrum. Community builders are
              supported beyond through co-learning camps, meet-ups, hackathons,
              and launchpad services. For more information, please visit
              https://hackquest.io/.
            </p>
          </div>
        </div>
        <div>
          <SubTitle title={'About Moonshot Commons'} />
          <div className="body-m text-neutral-800">
            <p>
              Powered by HackQuest,Moonshot Commons is a global community for
              Web3 founders to learn, build, and scale. Within two years,
              Moonshot community members have raised $110m+ from VCs — with many
              more launching soon! For more information, please visit
              https://moonshotcommons.com/.
            </p>
          </div>
        </div>
      </div>
      <div className="title-5 flex justify-between border-neutral-200 border-t pt-[20px] text-neutral-800">
        <span>{t('stayConnected')}</span>
        <div className="flex items-center gap-[16px]">
          <Link
            href={HACKQUEST_DISCORD}
            target="_blank"
            className="transition-all duration-300 hover:scale-[1.1]"
          >
            <FaDiscord className="size-6 text-neutral-500" />
          </Link>
          <Link
            href={HACKQUEST_TWITTER}
            target="_blank"
            className="transition-all duration-300 hover:scale-[1.1]"
          >
            <FaXTwitter className="size-6 text-neutral-500" />
          </Link>
          <Link
            href={HACKQUEST_TELEGRAM}
            target="_blank"
            className="transition-all duration-300 hover:scale-[1.1]"
          >
            <FaTelegram className="size-6 text-neutral-500" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default About
