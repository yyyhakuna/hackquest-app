'use client'

import { useDisconnectGithubMutation } from '@/graphql/generated/hooks'
import { openWindow } from '@/lib/utils'
import { Button } from '@hackquest/ui/shared/button'
import { useIsMutating } from '@tanstack/react-query'
import isEmpty from 'lodash-es/isEmpty'
import * as React from 'react'
import toast from 'react-hot-toast'
import { FaGithub } from 'react-icons/fa6'
import { LuUnlink } from 'react-icons/lu'

const colors = [
  'hsl(var(--primary-500))',
  'hsl(var(--code-orange))',
  'hsl(var(--code-green))',
  'hsl(var(--code-purple))',
  'hsl(var(--code-blue))',
] as const

export function GithubActivity({
  isOwnProfile,
  data = {},
}: {
  isOwnProfile: boolean
  data?: Record<string, any>
}) {
  const isMutating = useIsMutating({ mutationKey: ['ConnectGithub'] })

  const disconnect = useDisconnectGithubMutation({
    meta: {
      invalidates: [['FindUserProfile']],
    },
    onSuccess: () => {
      toast.success('Github activity disconnected')
    },
    onError: () => {
      toast.error('Failed to disconnect github activity')
    },
  })

  const languages = React.useMemo(() => {
    if (data?.languages) {
      const langs: Record<string, number> = data.languages
      const sorted = Object.entries(langs).sort((a, b) => b[1] - a[1])
      const total = sorted.reduce((acc, [_, value]) => acc + value, 0)

      let mergedLanguages = []
      if (sorted.length > 5) {
        const top4 = sorted.slice(0, 4)
        const others = sorted
          .slice(4)
          .reduce((acc, [_, value]) => acc + value, 0)
        mergedLanguages = [...top4, ['Others', others]]
      } else {
        mergedLanguages = sorted
      }

      return mergedLanguages.map(([key, value]) => ({
        name: key,
        percent: (((value as number) / total) * 100).toFixed(1),
      }))
    } else {
      return []
    }
  }, [data])

  if (!isOwnProfile && isEmpty(data)) {
    return null
  }

  return (
    <div className="relative flex flex-col gap-6 self-start sm:rounded-2xl sm:border sm:border-neutral-200 sm:p-5">
      <h2 className="title-3">Developer Profile</h2>
      {!isEmpty(data) ? (
        <React.Fragment>
          {isOwnProfile && (
            <button
              type="button"
              aria-label="Unlink github account"
              className="-top-2 absolute right-0 rounded-full p-2.5 outline-none transition-colors duration-300 hover:bg-neutral-100 sm:top-2.5 sm:right-3"
              onClick={() => {
                disconnect.mutate({})
              }}
            >
              <LuUnlink className="size-5" />
            </button>
          )}
          {languages.length > 0 && (
            <section className="space-y-4">
              <h3 className="headline-m">Tech Stack</h3>
              <div className="my-4 flex h-2 w-full items-center overflow-hidden rounded-full">
                {languages?.map(({ name, percent }, index) => (
                  <span
                    key={name}
                    className="h-full"
                    style={{
                      width: `${percent}%`,
                      backgroundColor: colors[index],
                    }}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {languages?.map(({ name, percent }, index) => (
                  <div key={name} className="flex items-center gap-2">
                    <span
                      className="size-3 rounded-sm"
                      style={{ backgroundColor: colors[index] }}
                    />
                    <span className="body-xs">{name}</span>
                    <span className="body-xs text-secondary-neutral">
                      {percent}%
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
          <section className="grid grid-cols-2 gap-y-2.5">
            <div className="flex items-center gap-6">
              <span className="headline-s w-24">Total Stars</span>
              <span className="body-s">{data?.totalStar ?? 0}</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="headline-s w-24 whitespace-nowrap">
                Total Commits
              </span>
              <span className="body-s">{data?.totalCommit ?? 0}</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="headline-s w-24">Total PRs</span>
              <span className="body-s">{data?.totalPr ?? 0}</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="headline-s w-24">Total Issues</span>
              <span className="body-s">{data?.totalIssue ?? 0}</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="headline-s w-24 whitespace-nowrap">
                Contributed to
              </span>
              <span className="body-s">{data?.totalContributor ?? 0}</span>
            </div>
          </section>
        </React.Fragment>
      ) : (
        <Button
          className="self-start"
          variant="outline"
          color="neutral"
          loading={isMutating > 0}
          onClick={() => {
            openWindow('http://localhost:4002/auth/github/connect')
          }}
        >
          Connect Github
          <FaGithub className="size-5" />
        </Button>
      )}
    </div>
  )
}
