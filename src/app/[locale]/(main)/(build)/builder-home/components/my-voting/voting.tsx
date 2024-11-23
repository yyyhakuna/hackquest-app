import {
  type HackathonExtend,
  type HackathonJudgeUpdate,
  type ProjectJudgeDetail,
  useJudgeBatchByScoreMutation,
  useJudgeBatchByVoteMutation,
} from '@/graphql/generated/hooks'
import useDealHackathon, { VotingTime } from '@/hooks/use-deal-hackathon'
import type React from 'react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FiInfo } from 'react-icons/fi'
import { useHackathonJudgeDetailByUserQuery } from '../utils/query'
import TrackModal from './track-modal'
import VotingHackathon from './voting-hackathon'
import VotingProjectCard from './voting-project-card'

export interface NewProjectJudgeDetail extends ProjectJudgeDetail {
  curVote: number
}
const Voting: React.FC = () => {
  const [open, setOpen] = useState(false)
  const { data: hackathon } = useHackathonJudgeDetailByUserQuery()
  const { getVotingTime } = useDealHackathon()
  const votingTime = getVotingTime(hackathon as HackathonExtend)
  const judge = hackathon?.judge as HackathonJudgeUpdate
  const [projects, setProjects] = useState<NewProjectJudgeDetail[]>([])
  const [maxVote, setMaxVote] = useState(0)

  const onChange = (vote: number, index: number) => {
    const newProjects = structuredClone(projects)
    const project = newProjects?.[index] as NewProjectJudgeDetail
    project.curVote = vote
    setProjects(newProjects)
  }

  const { mutate: voteByScore, isPending: scoreLoading } =
    useJudgeBatchByScoreMutation({
      meta: {
        invalidates: [['FindHackathonJudgeDetailByUser']],
      },
      onSuccess: () => {
        toast.success('Success')
      },
      onError: (error: string) => {
        toast.error(error)
      },
    })

  const { mutate: voteByFixed, isPending: FixedLoading } =
    useJudgeBatchByVoteMutation({
      meta: {
        invalidates: [['FindHackathonJudgeDetailByUser']],
      },
      onSuccess: () => {
        toast.success('Success')
      },
      onError: (error: string) => {
        toast.error(error)
      },
    })

  const confirmVote = () => {
    if (votingTime !== VotingTime.ON) return
    const votes = projects?.map(v => ({
      projectId: v.id,
      vote: v.curVote,
    }))
    judge.voteMode === 'score'
      ? voteByScore({
          hackathonId: hackathon?.id!,
          data: votes || [],
        })
      : voteByFixed({
          hackathonId: hackathon?.id!,
          data: votes || [],
        })
  }
  useEffect(() => {
    const hackathonProjects = (hackathon?.projects || []).map(v => ({
      ...v,
      curVote: v.vote || 0,
    })) as NewProjectJudgeDetail[]
    setProjects(hackathonProjects)
  }, [hackathon])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (judge?.voteMode === 'fixed') {
      const max = Math.floor(hackathon?.remainingVotes?.remainingVotes || 0)
      const total =
        projects?.reduce(
          (cur, next) => cur + next.vote - (next.curVote || 0),
          0,
        ) || 0
      setMaxVote(max + total)
    } else {
      setMaxVote(hackathon?.remainingVotes?.remainingVotes || 0)
    }
  }, [projects])
  return (
    <div className="flex flex-col gap-6">
      <VotingHackathon
        hackathon={hackathon}
        confirmVote={confirmVote}
        maxVote={maxVote}
        loading={scoreLoading || FixedLoading}
      />
      {votingTime === VotingTime.ON && (
        <>
          <div
            className="title-3 flex w-fit cursor-pointer items-center gap-3"
            onClick={() => setOpen(true)}
          >
            <span className="text-neutral-800">
              {hackathon?.judge?.rewardName}
            </span>
            <FiInfo className=" fill-primary" />
          </div>
          <div className="flex flex-wrap gap-[24px]">
            {projects?.map((p, i) => (
              <div key={p.id} className="w-full sm:w-[calc((100%-3rem)/3)]">
                <VotingProjectCard
                  project={p as NewProjectJudgeDetail}
                  judge={judge as HackathonJudgeUpdate}
                  maxVote={maxVote}
                  onChange={vote => onChange(vote, i)}
                />
              </div>
            ))}
          </div>
          <TrackModal
            open={open}
            onClose={() => setOpen(false)}
            judge={judge as unknown as HackathonJudgeUpdate}
          />
        </>
      )}
    </div>
  )
}

export default Voting
