'use client'

import * as React from 'react'
import { useUserProfile } from '../../utils/query'
import { ScoreBreakdown } from './score-breakdown'
import { ScoreRadar } from './score-radar'

export function Web3BuilderScore() {
  const { data: profile } = useUserProfile()

  const avgrateScore = React.useMemo(() => {
    if (profile?.web3Score) {
      const totalScore = profile.web3Score.reduce(
        (acc, curr) => acc + curr.score,
        0,
      )
      return Math.round(totalScore / profile.web3Score.length)
    }
    return 0
  }, [profile?.web3Score])

  return (
    <div>
      <h2 className="title-3">Web3 Builder Score</h2>
      <p className="body-s mt-2 text-secondary-neutral">
        A score generated through analyzing how Web3 native you are and how your
        Web3 dev ability is.
      </p>
      <div className="mt-6 grid sm:grid-cols-[540px_1fr] sm:gap-8">
        <ScoreRadar web3Score={profile?.web3Score ?? []} />
        <ScoreBreakdown
          avgrateScore={avgrateScore}
          progress={profile?.progress ?? []}
        />
      </div>
    </div>
  )
}
