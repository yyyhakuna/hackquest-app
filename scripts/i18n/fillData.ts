import fs from 'fs'
import path from 'path'
import { getNestedProperty, setNestedProperty } from '@hackquest/utils'
import { availableLocaleCodes, defaultLocale } from '../../src/i18n/config'

export type I18nOutput = {
  path: string
  defaultValue: string
  description: string
} & Record<string, string>

export const fillData = async (data: I18nOutput[], importModel = false) => {
  for (const locale of availableLocaleCodes) {
    const localFilePath = path.resolve(__dirname, `../../src/i18n/locales/${locale}.json`)
    if (fs.existsSync(localFilePath)) {
      try {
        const module = (await import(localFilePath)).default
        for (let i = 0; i < data.length; i++) {
          const localeItemPath = data[i]!.path
          const value = getNestedProperty(module, localeItemPath.split('.'))
          if (!importModel) {
            if (!value) {
              let defaultValue = data[i]!.defaultValue
              if (
                !process.argv.includes('-d') &&
                !process.argv.includes('--default') &&
                locale !== defaultLocale.code
              ) {
                defaultValue = ''
              }
              setNestedProperty(module, localeItemPath.split('.'), defaultValue)
            } else {
              data[i]![locale] = value
            }
          } else {
            setNestedProperty(module, localeItemPath.split('.'), data[i]![locale])
          }
        }
        fs.writeFileSync(localFilePath, JSON.stringify(module))
      } catch (error) {
        throw new Error(`Error importing locale file: ${error}`)
      }
    } else {
      const result = {}
      for (const item of data) {
        const localeItemPath = item.path.split('.')
        setNestedProperty(result, localeItemPath, item.defaultValue)
        item[locale] = item.defaultValue
      }
      fs.writeFileSync(localFilePath, JSON.stringify(result))
    }
  }
}
