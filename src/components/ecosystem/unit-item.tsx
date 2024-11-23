import { Link } from '@/app/navigation'
import type { UnitExtend } from '@/graphql/generated/graphql'
import { cn } from '@hackquest/ui/lib/utils'
import { FeedbackIcon } from '@hackquest/ui/shared/feedback-icon'
import { Progress, ProgressLabel } from '@hackquest/ui/shared/progress'
import { LuLock } from 'react-icons/lu'

export function UnitItem({
  unit,
  alias,
}: {
  unit: UnitExtend
  alias?: string | null
}) {
  const progress = unit?.progress ?? 0

  if (progress > 0 && progress < 1) {
    return (
      <Link href={`/learn/${alias}/${unit?.currentPageId}`}>
        <div
          className={cn(
            'flex items-center justify-between rounded-xl border border-transparent bg-neutral-100 p-6 transition-colors duration-300',
            {
              'border-neutral-300 bg-neutral-white hover:bg-neutral-100':
                progress > 0 && progress < 1,
            },
          )}
        >
          <h2 className="headline-m">{unit?.title}</h2>
          {progress === 1 && <FeedbackIcon size="medium" />}
          {progress === 0 && <LuLock className="size-5 text-neutral-400" />}
          {progress > 0 && progress < 1 && (
            <div className="flex shrink-0 items-center gap-2">
              <Progress className="w-20" value={progress * 100} />
              <ProgressLabel className="body-s">
                {Math.round(progress * 100)}%
              </ProgressLabel>
            </div>
          )}
        </div>
      </Link>
    )
  }

  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-xl border border-transparent bg-neutral-100 p-6',
        {
          'border-neutral-300 bg-neutral-white': progress > 0 && progress < 1,
        },
      )}
    >
      <h2 className="headline-m">{unit?.title}</h2>
      {progress === 1 && <FeedbackIcon size="medium" />}
      {progress === 0 && <LuLock className="size-5 text-neutral-400" />}
      {progress > 0 && progress < 1 && (
        <div className="flex shrink-0 items-center gap-2">
          <Progress className="w-20" value={progress * 100} />
          <ProgressLabel className="body-s">
            {Math.round(progress * 100)}%
          </ProgressLabel>
        </div>
      )}
    </div>
  )
}
