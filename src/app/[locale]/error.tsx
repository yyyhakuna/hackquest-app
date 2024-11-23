'use client'

import { Link } from '@/app/navigation'
import { Button } from '@hackquest/ui/shared/button'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

export default function ErrorPage({
  error,
}: {
  error: Error & {
    msg?: string
  } & { digest?: string }
}) {
  const t = useTranslations('Common')

  useEffect(() => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error(error)
  }, [error])

  return (
    <div className="flex w-screen flex-col items-center justify-center gap-8 sm:container sm:mt-[120px] sm:items-start sm:justify-start">
      <h2 className="sm:display-2 title-1">{t('errorPage.title')}</h2>
      <p className="sm:body-l body-m whitespace-pre-line text-destructive-600">
        {error.message || error.msg}
      </p>
      <div>
        <p className="sm:body-l body-m text-secondary-neutral">
          {t('errorPage.description')}
        </p>
        <Link
          href="mailto:cammeronwang@moonshotcommons.com"
          className="sm:body-l text-secondary-neutral underline"
        >
          cammeronwang@moonshotcommons.com
        </Link>
      </div>
      <div data-theme className="flex gap-4">
        <Button
          variant="outline"
          color="neutral"
          className="headline-s w-[140px]"
          onClick={() => window.location.reload()}
        >
          {t('errorPage.reloadButton')}
        </Button>
        <Link href="/">
          <Button
            variant="outline"
            color="neutral"
            className="headline-s w-[140px]"
          >
            {t('errorPage.backToHomeButton')}
          </Button>
        </Link>
      </div>
    </div>
  )
}
