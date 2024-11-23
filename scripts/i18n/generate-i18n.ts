import fs from 'fs'
import path from 'path'
import {} from '@hackquest/utils'
import { stringify } from 'csv-stringify'
import {
  type I18nSchema,
  availableLocaleCodes,
  availableLocalesMap,
} from '../../src/i18n/config'
import i18nSchema from '../../src/i18n/schema'
import { type I18nOutput, fillData } from './fillData'

function mapLocale(headerModel = false) {
  const obj = {} as Record<string, string>
  availableLocaleCodes.forEach(locale => {
    if (headerModel) {
      obj[locale] = availableLocalesMap[locale]?.displayName || locale
    } else {
      obj[locale] = ''
    }
  })
  return obj
}

const isTranslateNode = (node: Record<string, any>) => {
  return !!node.value && !!node.description
}

let data: I18nOutput[] = []

function generate(schema: I18nSchema, parentPath: string) {
  try {
    Object.keys(schema).forEach(key => {
      const newSchema = schema[key]! as I18nSchema
      if (!isTranslateNode(newSchema)) {
        generate(newSchema, `${parentPath}${parentPath && '.'}${key}`)
      } else {
        data.push({
          path: `${parentPath}${parentPath && '.'}${key}`,
          defaultValue: schema[key]!.value as string,
          description: schema[key]!.description as string,
          ...mapLocale(),
        })
      }
    })
  } catch (error) {
    throw new Error(`Error generating i18n data: ${error}`)
  }
}

const exportToCsv = () => {
  // const columns = {
  //   path: 'Message Path',
  //   defaultValue: 'Default Message',
  //   description: 'Description',
  //   ...mapLocale(),
  // }

  stringify(data, { header: true }, (err, output) => {
    if (err) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.log(err)
    }
    fs.writeFileSync(path.resolve(__dirname, '../../src/i18n/i18n.csv'), output)
  })
}

async function main() {
  if (process.argv.includes('-w') || process.argv.includes('--watch')) {
    fs.watch(
      path.resolve(__dirname, '../../src/i18n/schema'),
      { recursive: true },
      async (_eventType, _filename) => {
        try {
          generate(i18nSchema, '')
          await fillData(data)
          fs.writeFileSync(
            path.resolve(__dirname, '../../src/i18n/i18n.json'),
            JSON.stringify(data),
          )
          exportToCsv()
          data = []
        } catch (_err) {}
      },
    )
  } else {
    generate(i18nSchema, '')
    await fillData(data)
    fs.writeFileSync(
      path.resolve(__dirname, '../../src/i18n/i18n.json'),
      JSON.stringify(data),
    )
    exportToCsv()
  }
}

main()
