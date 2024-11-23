'use client'
import { useListBlogsQuery, useLoginMutation } from '@/graphql/generated/hooks'
import { Input } from '@hackquest/ui/shared/input'
import { useSuspenseQuery } from '@tanstack/react-query'
import type { FC, ReactNode } from 'react'

type UploadButtonProps = {
  children?: ReactNode
}

const UploadButton: FC<UploadButtonProps> = _props => {
  const { mutate, mutateAsync, isError, isPending } = useLoginMutation()

  const {
    data: { listBlogs },
  } = useSuspenseQuery({
    queryKey: useListBlogsQuery.getKey(),
    queryFn: useListBlogsQuery.fetcher(),
  })

  // console.log(listBlogs)

  return (
    <Input
      type="file"
      onChange={e => {
        const formData = new FormData()
        formData.append('file', e.target.files?.[0] || '')
        formData.append('filepath', 'test')
        formData.append('isPublic', 'true')

        mutate({
          email: '',
          password: '',
        })
      }}
    >
      upload
    </Input>
  )
}

export default UploadButton
