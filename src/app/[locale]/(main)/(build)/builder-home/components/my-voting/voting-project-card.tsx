import { Link } from '@/app/navigation'
import HackathonVote from '@/components/hackathon/hackthon-vote'
import MenuLink from '@/constants/menu-link'
import type { HackathonJudgeUpdate } from '@/graphql/generated/hooks'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@hackquest/ui/shared/avatar'
import type React from 'react'
import type { NewProjectJudgeDetail } from './voting'

interface IndexProp {
  project: NewProjectJudgeDetail
  judge: HackathonJudgeUpdate
  maxVote: number
  onChange: (vote: number) => void
}

const Index: React.FC<IndexProp> = ({ project, judge, maxVote, onChange }) => {
  return (
    <div className="body-s relative flex flex-col gap-3 rounded-[1rem] border border-neutral-200 bg-neutral-white p-6 text-neutral-500">
      {judge?.voteMode === 'score' && (
        <div className="body-s absolute top-6 right-0 flex items-center justify-center rounded-l-[1.125rem] bg-neutral-100 px-6 py-1 text-neutral-800">
          {project.voteJudgeCount} Judges Scoring
        </div>
      )}

      <Link href={`${MenuLink.HACKATHON_PROJECTS}/${project.alias}`}>
        <div className="flex justify-between">
          <Avatar className="h-[5rem] w-[5rem] overflow-hidden rounded-[.75rem]">
            <AvatarImage src={project.logo || ''} alt={project.name || ''} />
            <AvatarFallback>
              {project.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </Link>
      <Link href={`${MenuLink.HACKATHON_PROJECTS}/${project.alias}`}>
        <h2 className="title-3 !text-[1.5rem] line-clamp-2 h-[4.125rem] text-neutral-800">
          {project.name}
        </h2>
      </Link>

      <p className="line-clamp-2 h-[2.625rem]">
        {project.detail?.oneLineIntro}
      </p>
      <div>
        <span>Voting Mode：</span>
        <span className="text-neutral-800">
          {judge.voteMode === 'score'
            ? 'Project Scoring'
            : 'Fixed Number of Vote'}
        </span>
      </div>
      <p className="headline-s text-neutral-700">Total Voting:</p>
      <HackathonVote
        value={project.curVote || 0}
        initValue={project.vote || 0}
        maxValue={maxVote}
        onChange={onChange}
      />
    </div>
  )
}

export default Index
