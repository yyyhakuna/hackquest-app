import type { HackathonJudgeUpdate } from '@/graphql/generated/hooks'
import { Button } from '@hackquest/ui/shared/button'
import { FeedbackIcon } from '@hackquest/ui/shared/feedback-icon'
import type React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { judgeModeData, voteModeData } from '../constants/data'

interface JudgingInfoProp {
  judge: HackathonJudgeUpdate
  onEdit: VoidFunction
}

const JudgingInfo: React.FC<JudgingInfoProp> = ({ judge, onEdit }) => {
  const judgeMode = judge.judgeMode
    ? judgeModeData?.find(v => v.value === judge.judgeMode)?.label
    : 'Non'
  const voteMode = judge.judgeMode
    ? voteModeData?.find(v => v.value === judge.voteMode)?.label
    : 'Non'

  return (
    <div className="flex items-center rounded-2xl border border-neutral-300 bg-neutral-white p-6 ">
      <div className="flex w-[13.75rem] flex-col items-center border-neutral-300 border-r pr-6">
        <p className="title-3 mb-5 w-full truncate text-center text-neutral-800">
          {judge.rewardName}
        </p>
        {!judge?.criteria ? (
          <Button onClick={onEdit}>
            <span>Set Judging Details</span>
            <FiArrowRight />
          </Button>
        ) : (
          <Button variant={'outline'} color={'neutral'} onClick={onEdit}>
            <span>Edit Judging Details</span>
            <FeedbackIcon size="small" variant="success" />
          </Button>
        )}
      </div>
      <div className="body-m flex flex-1 justify-between pl-6 text-neutral-400">
        <div>
          <p>Judging Mode</p>
          <p className="mt-1 text-neutral-800">{judgeMode}</p>
        </div>
        <div>
          <p>Voting Mode</p>
          <p className="mt-1 text-neutral-800">{voteMode}</p>
        </div>
        <div>
          <p>Judging Accounts</p>
          <p className="mt-1 text-neutral-800">
            {judge.judgeAccounts?.length! > 0
              ? judge.judgeAccounts?.length
              : 'Non'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default JudgingInfo
