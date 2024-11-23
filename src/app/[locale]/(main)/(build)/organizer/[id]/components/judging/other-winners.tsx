import { cn } from '@hackquest/ui/lib/utils'
import { Button } from '@hackquest/ui/shared/button'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import type { Winner } from '../../constant'
import CustomOtherWinner from './custom-orther-winner'
import WinnerCard from './winner-card'

const OtherWinners = ({
  defaultTrack,
  announce,
  hackathonWinner,
  rewardId,
}: {
  defaultTrack: string
  announce: boolean
  hackathonWinner: Winner[]
  rewardId: number
}) => {
  const t = useTranslations('HackathonOrganizer.manage')
  const track = useSearchParams().get('track')
  const [customOrtherWinnerNum, setCunstomOrtherWinnerNum] = useState(0)
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setCunstomOrtherWinnerNum(0)
  }, [track])

  return (
    <div className="mt-6">
      <span className="title-3 text-primary-neutral ">{t('otherWinners')}</span>
      {!announce && (
        <div className="body-m mt-2 text-secondary-neutral">
          {t('otherWinnerDescription')}
        </div>
      )}

      <div className={cn('mt-4 space-y-4', announce && 'mt-6')}>
        {hackathonWinner.map((winner, _index) => {
          return (
            <WinnerCard
              key={winner.id}
              data={winner as Winner}
              announce={announce}
            />
          )
        })}
        {Array(customOrtherWinnerNum)
          .fill(0)
          .map((_v, i) => (
            <CustomOtherWinner
              key={i}
              setCunstomOrtherWinnerNum={setCunstomOrtherWinnerNum}
              defaultTrack={defaultTrack}
              rewardId={rewardId}
            />
          ))}
      </div>

      {!announce && (
        <Button
          className="mt-4 w-full"
          onClick={() => {
            setCunstomOrtherWinnerNum(prev => prev + 1)
          }}
        >
          <IoAdd /> {t('addAWinner')}
        </Button>
      )}
    </div>
  )
}

export default OtherWinners
