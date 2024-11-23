import 'server-only'
import { headers } from 'next/headers'

export const PATHNAME_KEY = 'x-pathname'

export const getHeadersParams = (key: string) => {
  const headersList = headers()
  return headersList.get(key)
}
