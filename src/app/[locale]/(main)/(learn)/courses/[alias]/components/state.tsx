import { useUser } from '@/store/user'
import { FeedbackIcon } from '@hackquest/ui/shared/feedback-icon'
import Progress from './progress'

const State = ({
  progress,
  onlyShowIcon,
}: { progress: number; onlyShowIcon?: boolean }) => {
  const currentUser = useUser()

  if (!currentUser) return <></>

  if (progress === 1) {
    return (
      <>
        {!onlyShowIcon && (
          <p className="headline-m text-primary-neutral">Completed</p>
        )}
        <FeedbackIcon className="shrink-0" size="small" variant="success" />
      </>
    )
  } else {
    return progress !== 0 && <Progress progress={progress! * 100} />
  }
}

export default State
