'use client'

import { Link, useRouter } from '@/app/navigation'
import type { FindEcosystemInfoQuery } from '@/graphql/generated/graphql'
import { Button } from '@hackquest/ui/shared/button'
import { Progress, ProgressLabel } from '@hackquest/ui/shared/progress'
import { Skeleton } from '@hackquest/ui/shared/skeleton'
import Image from 'next/image'
import * as React from 'react'
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'

export function BasicInfo({
  ecosystemPromise,
}: {
  ecosystemPromise: Promise<FindEcosystemInfoQuery>
}) {
  const router = useRouter()
  const { ecosystem } = React.use(ecosystemPromise)

  const phases = ecosystem?.phases ?? []

  const firstUnlockedCourse = React.useMemo(() => {
    for (const phase of phases ?? []) {
      if (phase.courses?.length) {
        const unlockedCourse = phase.courses.find(
          course => course.progress! < 1,
        )
        if (unlockedCourse) {
          return unlockedCourse
        }
        return null
      }
    }
  }, [phases])

  return (
    <div className="pt-5 pb-0 sm:bg-neutral-100 sm:py-8">
      <div className="flex items-center justify-between gap-8 sm:container max-sm:px-5">
        <div className="flex flex-col gap-6">
          <button
            type="button"
            className="flex items-center gap-2 transition-colors duration-300 hover:text-neutral-700"
            onClick={() => router.back()}
          >
            <LuArrowLeft className="size-4" />
            <span className="headline-s">Back</span>
          </button>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <h1 className="title-1">{ecosystem?.basic?.type} Ecosystem</h1>
            <div className="flex items-center gap-2">
              <p className="body-s text-neutral-600">Certified by</p>
              <Image
                src={ecosystem?.basic?.image ?? ''}
                alt={ecosystem?.basic?.type ?? ''}
                width={28}
                height={28}
                className="rounded-full"
              />
            </div>
          </div>
          <p className="body-m text-neutral-500">{ecosystem?.description}</p>
          {ecosystem?.progress && ecosystem.progress > 0 ? (
            <div className="flex items-center gap-8">
              <Link
                href={`/learn/${firstUnlockedCourse?.alias}/${firstUnlockedCourse?.currentPageId}`}
              >
                <Button className="self-start">
                  Continue
                  <LuArrowRight className="size-4" />
                </Button>
              </Link>
              <div className="flex shrink-0 items-center gap-2">
                <Progress className="w-20" value={ecosystem.progress * 100} />
                <ProgressLabel className="body-s">
                  {Math.round(ecosystem.progress * 100)}%
                </ProgressLabel>
              </div>
            </div>
          ) : (
            <Link
              href={`/learn/${firstUnlockedCourse?.alias}/${firstUnlockedCourse?.currentPageId}`}
            >
              <Button className="self-start">
                Start learning
                <LuArrowRight className="size-4" />
              </Button>
            </Link>
          )}
        </div>
        <div className="relative shrink-0 max-sm:hidden">
          <Image
            src="/images/ecosystem/ecosystem-cover.svg"
            alt="ecosystem cover"
            width={368}
            height={292}
          />
          {/* <Image
            src={ecosystem?.basic?.image ?? ''}
            alt={ecosystem?.basic?.type ?? ''}
            width={96}
            height={96}
            className="absolute top-[106px] left-[106px] rounded-full"
          /> */}
        </div>
      </div>
    </div>
  )
}

export function BasicInfoSkeleton() {
  return (
    <div className="pt-5 pb-0 sm:bg-neutral-100 sm:py-8">
      <div className="flex items-center justify-between gap-8 sm:container max-sm:px-5">
        <div className="flex flex-col gap-6">
          <button
            type="button"
            className="flex items-center gap-2 transition-colors duration-300 hover:text-neutral-700"
          >
            <LuArrowLeft className="size-4" />
            <span className="headline-s">Back</span>
          </button>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Skeleton className="h-7 w-48" />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-80" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-11 w-36" />
        </div>
        <div className="shrink-0 max-sm:hidden">
          <Image
            src="/images/ecosystem/ecosystem-cover.png"
            alt="ecosystem cover"
            width={368}
            height={292}
          />
        </div>
      </div>
    </div>
  )
}
