'use client'

import { Link } from '@/app/navigation'
import type { EcosystemPhaseExtend } from '@/graphql/generated/graphql'
import { cn } from '@hackquest/ui/lib/utils'
import { Button } from '@hackquest/ui/shared/button'
import { FeedbackIcon } from '@hackquest/ui/shared/feedback-icon'
import { Progress, ProgressLabel } from '@hackquest/ui/shared/progress'
import * as React from 'react'
import { LuArrowRight } from 'react-icons/lu'

export function PhaseItem({
  index,
  phase,
  isExpanded,
  onExpandPhase,
}: {
  index: number
  phase: EcosystemPhaseExtend
  isExpanded?: boolean
  onExpandPhase?: (id: string) => void
}) {
  const progress = phase.progress ?? 0

  const firstUnlockedCourse = React.useMemo(() => {
    if (phase.courses?.length) {
      const unlockedCourse = phase.courses.find(course => course.progress! < 1)
      if (unlockedCourse) {
        return unlockedCourse
      }
      return null
    }
  }, [phase.courses])

  return (
    <div
      className={cn(
        'mb-6 flex cursor-pointer justify-between rounded-3xl border border-primary bg-[url("/images/ecosystem/image.png")] bg-contain bg-primary-100 bg-right-bottom bg-no-repeat transition-colors duration-300 hover:bg-primary-200/80 max-sm:p-4 sm:px-8 sm:py-6',
        {
          'sticky top-0 z-50': isExpanded,
          grayscale: progress === 0,
          'border-neutral-300 bg-neutral-white hover:bg-neutral-100':
            progress === 1,
        },
      )}
      onClick={() => onExpandPhase?.(phase.id)}
    >
      <div>
        <span className="font-extrabold text-sm">PHASE {index}</span>
        <h1 className="title-3 mt-3 mb-6" title={phase.title}>
          {phase.title}
        </h1>
        {progress === 0 && (
          <Button variant="outline" color="neutral">
            Start here
            <LuArrowRight className="size-4" />
          </Button>
        )}
        {progress > 0 && progress < 1 && (
          <div className="flex items-center gap-6">
            {firstUnlockedCourse && (
              <Link
                href={`/learn/${firstUnlockedCourse.alias}/${firstUnlockedCourse.currentPageId}`}
              >
                <Button>
                  Make progress
                  <LuArrowRight className="size-4" />
                </Button>
              </Link>
            )}
            <div className="flex shrink-0 items-center gap-2 max-sm:hidden">
              <Progress className="w-20" value={progress * 100} />
              <ProgressLabel className="body-s text-primary-neutral">
                {Math.round(progress * 100)}%
              </ProgressLabel>
            </div>
          </div>
        )}
        {progress === 1 && (
          <div className="flex items-center gap-2 py-3">
            <span className="headline-m">Completed</span>
            <FeedbackIcon size="medium" />
          </div>
        )}
      </div>
    </div>
  )
}
