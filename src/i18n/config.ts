import type { LocalePrefix, Pathnames } from 'next-intl/routing'
import { defineRouting } from 'next-intl/routing'
import locales from './config.json'

export const defaultLocale = locales.find(locale => locale.default)!

export const availableLocales = locales.filter(locale => locale.enabled)

export const availableLocaleCodes = availableLocales.map(locale => locale.code)

export const availableLocalesMap = Object.fromEntries(locales.map(locale => [locale.code, locale]))

export const pathnames: Pathnames<typeof availableLocaleCodes> = {}

export const localePrefix: LocalePrefix<typeof availableLocaleCodes> = {
  mode: 'as-needed',
}

export type I18nSchema = {
  [key: string]: I18nSchema | { value: string; description: string }
}

export const routing = defineRouting({
  locales: availableLocaleCodes,
  defaultLocale: defaultLocale.code,
  localePrefix,
  pathnames,
})
