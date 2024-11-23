'use client'

import { cn } from '@hackquest/ui/lib/utils'
import { FeedbackIcon } from '@hackquest/ui/shared/feedback-icon'
import { Progress, ProgressLabel } from '@hackquest/ui/shared/progress'

export function PhaseItem({
  id,
  index,
  title,
  progress,
  isExpanded,
  onExpandPhase,
}: {
  id: string
  index: number
  title: string
  progress: number
  isExpanded?: boolean
  onExpandPhase?: (id: string) => void
}) {
  return (
    <div
      className={cn(
        'mb-6 flex cursor-pointer justify-between rounded-2xl border-2 border-neutral-200 bg-[url("/images/ecosystem/image.png")] bg-contain bg-neutral-white bg-right-bottom bg-no-repeat transition-colors duration-300 hover:bg-neutral-100 max-sm:p-4 sm:rounded-3xl sm:px-8 sm:py-6',
        {
          'sticky top-0 z-50': isExpanded,
          grayscale: progress === 0,
          'border-neutral-300 bg-neutral-white hover:bg-neutral-100':
            progress === 1,
        },
      )}
      onClick={() => onExpandPhase?.(id)}
    >
      <div>
        <span className="font-bold text-base text-secondary-neutral">
          PHASE {index}
        </span>
        <h1 className="title-3 my-3 line-clamp-2" title={title}>
          {title}
        </h1>
        {progress > 0 && progress < 1 && (
          <div className="flex shrink-0 items-center gap-2 max-sm:hidden">
            <Progress className="w-20" value={progress * 100} />
            <ProgressLabel className="body-s text-primary-neutral">
              {Math.round(progress * 100)}%
            </ProgressLabel>
          </div>
        )}
        {progress === 1 && (
          <div className="flex items-center gap-2">
            <span className="headline-m">Completed</span>
            <FeedbackIcon size="medium" />
          </div>
        )}
      </div>
    </div>
  )
}
