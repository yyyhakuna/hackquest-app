'use client'

import {
  type HackathonJudgeUpdate,
  type UserJudgeType,
  useUpdateJudgeMutation,
} from '@/graphql/generated/hooks'
import { useHackathonQuery } from '@/hooks/hackathon/query'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useQueryClient } from '@tanstack/react-query'
import React, { useRef } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import SectionButton from '../common/section-button'
import JudgingForm from './judging-form'
import JudgingInfo from './judging-info'

const Judging: React.FC = () => {
  const { data: hackathon } = useHackathonQuery()
  const [editIds, setEditIds] = useState<number[]>([])

  const [parent] = useAutoAnimate()

  const _queryClient = useQueryClient()
  const curEditId = useRef<number>()
  const { mutate: update, isPending } = useUpdateJudgeMutation({
    meta:{
      invalidates:[['FindUniqueHackathon']]
    },
    onSuccess: () => {
      toast.success('Hackathon updated')
      setEditIds(editIds.filter(v => v !== curEditId.current))
    },
    onError: (error: string) => {
      toast.error(error)
    },
  })

  const onSubmit = (judgeId: number, val: HackathonJudgeUpdate) => {
    curEditId.current = judgeId
    update({
      judgeId: judgeId.toString(),
      data: {
        criteria: val.criteria,
        disableJudge: {
          set: val.disableJudge,
        },
        judgeMode: {
          set: val.judgeMode || null,
        },
        voteMode: {
          set: val.voteMode || null,
        },
        userTotalVotes: {
          set: val.userTotalVotes || 0,
        },
        judgeTotalVote: {
          set: val.judgeTotalVote || 0,
        },
        judgeProjectVote: {
          set: Number(val.judgeProjectVote || 0),
        },
        userTags: (val.userTags || []) as UserJudgeType[],
      },
    })
  }

  const disabledAll = (judgeId: number) => {
    return hackathon?.judge
      ?.filter(v => v.id !== judgeId)
      .some(v => v.judgeMode === 'all')
  }
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="body-s text-neutral-600">Prize Track</p>
        <div className="mt-2 flex flex-col gap-4" ref={parent}>
          {hackathon?.judge?.map(judge => (
            <React.Fragment key={judge.id}>
              {editIds.includes(judge.id) ? (
                <JudgingForm
                  loading={isPending}
                  judge={judge as HackathonJudgeUpdate}
                  onSubmit={val => onSubmit(judge.id, val)}
                  disabledAll={!!disabledAll(judge.id)}
                  onCancel={() =>
                    setEditIds(editIds.filter(v => v !== judge.id))
                  }
                />
              ) : (
                <JudgingInfo
                  judge={judge as HackathonJudgeUpdate}
                  onEdit={() => setEditIds([...editIds, judge.id])}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <SectionButton />
    </div>
  )
}

export default Judging
