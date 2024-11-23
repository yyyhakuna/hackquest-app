import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'
import { fillData } from './fillData'

async function main() {
  const _sheetUrl = process.argv[2]
  // execSync(`curl -L ${sheetUrl}/export?format=csv -o ./src/i18n/pending-message.csv`, {
  //   stdio: 'inherit',
  // })

  // const input = fs.readFileSync(path.resolve(__dirname, '../src/i18n/pending-message.csv'), 'utf8')
  const input = fs.readFileSync(path.resolve(__dirname, '../../src/i18n/pending-message.csv'), 'utf8')

  const data = parse(input, { columns: true })

  fillData(data, true)
}

main()
