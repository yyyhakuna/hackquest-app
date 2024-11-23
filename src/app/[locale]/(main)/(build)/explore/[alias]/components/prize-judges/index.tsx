import HackathonJudge from '@/components/hackathon/hackathon-judge-reward/hackathon-judge'
import HackathonReward from '@/components/hackathon/hackathon-judge-reward/hackathon-reward'
import type {
  HackathonExtend,
  HackathonRewards,
} from '@/graphql/generated/hooks'
import type React from 'react'

interface PrizeJudgesProp {
  hackathon: HackathonExtend
}

const PrizeJudges: React.FC<PrizeJudgesProp> = ({ hackathon }) => {
  return (
    <div className="flex flex-col gap-6 sm:gap-12">
      {hackathon?.judge?.map((v, i) => (
        <div className="flex flex-col gap-4 sm:gap-8" key={v.id}>
          <HackathonReward
            reward={hackathon?.rewards?.[i] as HackathonRewards}
          />
          <HackathonJudge judge={v} />
        </div>
      ))}
    </div>
  )
}

export default PrizeJudges
