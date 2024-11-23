import { useTranslations } from 'next-intl'

const EventHeader = () => {
  const t = useTranslations('Event')
  return (
    <div className="relative flex justify-between pb-8">
      <div>
        <h1 className="title-1 text-primary-neutral">{t('title')}</h1>
        <p className="body-m pt-6 text-secondary-neutral">{t('pageDescription')}</p>
      </div>
      <img
        src="/images/events/events_banner.png"
        alt="events_banner"
        width={273}
        height={220}
        className='absolute right-4 h-12 w-12 sm:static sm:right-0 sm:h-auto sm:w-auto'
      />
    </div>
  )
}

export default EventHeader
