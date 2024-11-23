import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

const ExploreHeader = async () => {
  const t = await getTranslations('HackathonExplore')

  return (
    <div className="flex justify-between gap-[374px]">
      <div>
        <h1 className="title-1 pb-4 text-primary-neutral sm:pb-6">{t('pageTitle')}</h1>
        <p className="body-m text-secondary-neutral">{t('pageDescription')}</p>
      </div>
      <div className="hidden pr-[94px] sm:block">
        <Image src={'/images/explore/explore_header.png'} alt="explore_header" width={121} height={174} />
      </div>
    </div>
  )
}

export default ExploreHeader
