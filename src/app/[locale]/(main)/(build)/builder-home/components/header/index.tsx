import { useTranslations } from 'next-intl'
import type React from 'react'

const Header: React.FC = () => {
  const t = useTranslations()
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <h1 className="title-1 text-neutral-800">{t('BuilderHome.pageTitle')}</h1>
      <p className="body-m w-full text-neutral-500 sm:w-[51%]">
        {t('BuilderHome.pageDescription')}
      </p>
    </div>
  )
}

export default Header
