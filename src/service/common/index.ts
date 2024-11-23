import { queryOptions } from '@tanstack/react-query'
import webApi from '..'
import type { CustomKeywordType } from './type'

export const customKeywordAddQueryOptions = (data: { type: CustomKeywordType; keyword: string }) => {
  return queryOptions({
    queryKey: ['custom-keyword-add'],
    queryFn: async () => webApi.commonApi.customKeywordAdd(data),
  })
}
