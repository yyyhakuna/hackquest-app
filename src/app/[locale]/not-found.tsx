import { Link } from '@/app/navigation'
import { Button } from '@hackquest/ui/shared/button'
import { getTranslations } from 'next-intl/server'

export default async () => {
  const t = await getTranslations('Common')
  return (
    <main className="container mt-[120px] flex flex-col gap-8">
      <h2 className="sm:display-2 title-1">{t('404.title')}</h2>
      <p className="body-l text-secondary-neutral">{t('404.description')}</p>
      <div data-theme>
        <Link href="/">
          <Button
            variant="outline"
            color="neutral"
            className="headline-s w-[140px]"
          >
            {t('404.button')}
          </Button>
        </Link>
      </div>
    </main>
  )
}
