import webApi from '@/service'
import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

export function useSingleUpload(
  options?: Omit<
    UseMutationOptions<string, Error, FormData>,
    'mutationKey' | 'mutationFn'
  >,
) {
  return useMutation({
    mutationKey: ['SingleUpload'],
    mutationFn: (data: FormData) => webApi.commonApi.singleUpload(data),
    ...options,
  })
}
