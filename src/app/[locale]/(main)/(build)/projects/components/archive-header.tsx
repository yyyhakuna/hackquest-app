import { useTranslations } from 'next-intl'

const ArchiveHeader = () => {
  const t = useTranslations('Archive')
  return (
    <div className="relative flex justify-between pb-6 sm:pb-8">
      <div className="max-w-[581px]">
        <h1 className="title-1 text-primary-neutral">Project Archive</h1>
        <p className="body-m break-words pt-4 text-secondary-neutral sm:pt-6">
          {t('welcomeText')}
        </p>
      </div>
      <img
        src="/images/events/events_banner.png"
        alt="events_banner"
        width={95}
        height={137}
        className="absolute right-4 hidden h-12 w-12 sm:static sm:right-0 sm:block sm:h-[137px] sm:w-[95px]"
      />
    </div>
  )
}

export default ArchiveHeader
