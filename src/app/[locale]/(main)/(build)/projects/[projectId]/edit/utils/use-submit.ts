'use client'

import { useUpdateProjectMutation } from '@/graphql/generated/hooks'
import { useQueryClient } from '@tanstack/react-query'
import type { UseFormReturn } from 'react-hook-form'
import toast from 'react-hot-toast'
import { getCurrentScore } from './current-score'
import type { FormValues } from './validations'

export function useSubmit({
  projectId,
  form,
  onSuccess,
}: {
  projectId: string
  form: UseFormReturn<FormValues>
  onSuccess?: () => void
}) {
  const queryClient = useQueryClient()

  const progress = getCurrentScore(form)

  const { mutate, isPending } = useUpdateProjectMutation({
    onSuccess: () => {
      toast.success('Project updated')
      queryClient.invalidateQueries({
        predicate: query => {
          return ['FindUniqueProject', 'ListProjectsBySelf'].includes(
            query.queryKey[0] as string,
          )
        },
      })
      onSuccess?.()
    },
    onError: _error => {
      toast.error('Failed to update project')
    },
  })

  function onSubmit(data: FormValues) {
    mutate({
      data: {
        name: { set: data.name },
        logo: { set: data.logo },
        pitchVideo: { set: data.pitchVideo },
        demoVideo: { set: data.demoVideo },
        tracks: { set: data.tracks },
        ecology: { set: data.ecology },
        teachStack: { set: data.teachStack },
        progress: { set: progress },
        wallet: { set: data.wallet },
        detail: {
          upsert: {
            where: {
              id: {
                equals: projectId,
              },
            },
            create: {
              oneLineIntro: data.oneLineIntro,
              detailedIntro: data.detailedIntro,
              progress: data.progress,
            },
            update: {
              oneLineIntro: { set: data.oneLineIntro },
              detailedIntro: { set: data.detailedIntro },
              progress: { set: data.progress },
            },
          },
        },
        addition: {
          upsert: {
            where: {
              id: {
                equals: projectId,
              },
            },
            create: {
              isOpenSource: !!data.githubLink,
              githubLink: data.githubLink,
              fundraisingStatus: data.fundraisingStatus,
            },
            update: {
              isOpenSource: { set: !!data.githubLink },
              githubLink: { set: data.githubLink },
              fundraisingStatus: { set: data.fundraisingStatus },
            },
          },
        },
        team: {
          update: {
            data: {
              intro: { set: data.intro },
            },
          },
        },
      },
      where: {
        id: projectId,
      },
    })
  }

  return { onSubmit, isPending }
}
