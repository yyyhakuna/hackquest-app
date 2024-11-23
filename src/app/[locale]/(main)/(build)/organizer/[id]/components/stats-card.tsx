import { cn } from '@hackquest/ui/lib/utils'
import { useTranslations } from 'next-intl'
import type React from 'react'
import { useEffect } from 'react'
import { CiCircleCheck } from 'react-icons/ci'
import { IoEyeOutline } from 'react-icons/io5'
import { LiaUserEditSolid } from 'react-icons/lia'
import { LuVote } from 'react-icons/lu'
import { MdAppRegistration } from 'react-icons/md'
import { SlBadge } from 'react-icons/sl'
import { useTimer } from 'react-timer-hook'

interface StatsProps extends React.HTMLAttributes<HTMLDivElement> {
  num?: number
  subNum?: React.ReactElement | string
  type:
    | 'pageView'
    | 'application'
    | 'submission'
    | 'voting'
    | 'winner'
    | 'confirmation'
  footer?: React.ReactElement | string
  countdown?: Date
}

const StatsCard: React.FC<StatsProps> = ({
  className,
  num,
  type,
  footer,
  subNum,
  countdown,
}) => {
  const t = useTranslations('HackathonOrganizer.manage')

  const timer = useTimer({
    expiryTimestamp: new Date(countdown!),
    autoStart: false,
  })

  useEffect(() => {
    timer.start()
  })

  const renderHeader = () => {
    switch (type) {
      case 'pageView':
        return (
          <div className="headline-m flex items-center gap-1">
            <IoEyeOutline />
            {t('pageView')}
          </div>
        )
      case 'application':
        return (
          <div className="headline-m flex items-center gap-1">
            <LiaUserEditSolid />
            {t('application')}
          </div>
        )
      case 'confirmation':
        return (
          <div className="headline-m flex items-center gap-1">
            <CiCircleCheck />
            {t('confirmation')}
          </div>
        )
      case 'submission':
        return (
          <div className="headline-m flex items-center gap-1">
            <MdAppRegistration />
            {t('submission')}
          </div>
        )
      case 'voting':
        return (
          <div className="headline-m flex items-center gap-1">
            <LuVote />
            voting
          </div>
        )
      case 'winner':
        return (
          <div className="headline-m flex items-center gap-1">
            <SlBadge />
            winner
          </div>
        )

      default:
        break
    }
  }

  return (
    <div
      className={cn(
        'flex-1 space-y-[72px] rounded-xl bg-neutral-100 p-10 ' + className,
      )}
    >
      {renderHeader()}
      <div>
        <div className="display-2 text-neutral-black">{num}</div>

        <div className="body-s text-secondary-neutral">{subNum}</div>

        {type === 'voting' && (
          <div>
            <span className="body-s text-secondary-neutral">
              Voting Countdown
            </span>
            <div className="mt-3 flex gap-1">
              <div className="flex flex-col items-center bg-primary-100 px-3">
                <div className="headline-s text-primary-neutral">
                  {timer.isRunning && timer.days}
                </div>
                <div className="body-xs text-secondary-neutral">D</div>
              </div>
              <div className="flex flex-col items-center bg-primary-100 px-3">
                <div className="headline-s text-primary-neutral">
                  {timer.isRunning && timer.hours}
                </div>
                <div className="body-xs text-secondary-neutral">H</div>
              </div>
              <div className="flex flex-col items-center bg-primary-100 px-3">
                <div className="headline-s text-primary-neutral">
                  {timer.isRunning && timer.minutes}
                </div>
                <div className="body-xs text-secondary-neutral">M</div>
              </div>
              <div className="flex flex-col items-center bg-primary-100 px-3">
                <div className="headline-s text-primary-neutral">
                  {timer.isRunning && timer.seconds}
                </div>
                <div className="body-xs text-secondary-neutral"> S</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StatsCard
