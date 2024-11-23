import type { HackathonExtend } from '@/graphql/generated/hooks'
import useDealHackathon from '@/hooks/use-deal-hackathon'
import { separationNumber } from '@/lib/utils'
import { useHackathonDetailContext } from '@/providers/hackathon/hackathon-detail-provider'
import { Button } from '@hackquest/ui/shared/button'
import type React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { InfoType } from '../../constants/type'

interface JudgeProp {
  hackathon: HackathonExtend
}

const Judge: React.FC<JudgeProp> = ({ hackathon }) => {
  const { setSelectedTab } = useHackathonDetailContext()
  const { getTotalPrize } = useDealHackathon()
  const total = getTotalPrize(hackathon)
  if (!hackathon?.rewards?.length) return null
  return (
    <div className="body-s items-center gap-6 rounded-[.75rem] border-[2px] border-neutral-200 p-6 text-neutral-400 sm:flex sm:items-stretch">
      <div className="text-center sm:min-w-[195px]">
        <p className="title-1 text-neutral-800">{`${separationNumber(total)} ${hackathon?.rewards?.[0]?.currency}`}</p>
        <p className="body-m mt-3 mb-5 text-neutral-500">Available in Prizes</p>
        <Button
          className="flex w-full items-center gap-2"
          onClick={() => setSelectedTab(InfoType.PRIZE_JUDGE)}
        >
          <span>Detail Breakdown</span>
          <FiArrowRight />
        </Button>
      </div>
      <div className="mt-5 flex flex-col gap-3 border-neutral-200 border-t pt-5 sm:mt-0 sm:flex-1 sm:justify-center sm:border-t-0 sm:border-l sm:pt-0 sm:pl-5">
        {hackathon?.rewards?.map(reward => (
          <div key={reward?.id} className="flex items-center justify-between">
            <span>{reward?.name}</span>
            <span className="headline-m text-neutral-800">{`${separationNumber(reward?.totalRewards || 0)} ${reward?.currency}`}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Judge
