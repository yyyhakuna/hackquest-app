import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@hackquest/ui/shared/tooltip'
import type React from 'react'
import { LuInfo } from 'react-icons/lu'

interface JudgingTooltipProp {
  type: 'judging' | 'voting' | 'votingUser' | 'userTags'
}

const JudgingTooltip: React.FC<JudgingTooltipProp> = ({ type }) => {
  const renderText = () => {
    switch (type) {
      case 'judging':
        return (
          <>
            <p>
              Users + Judges: Accounts set as judges by organizers and all
              HackQuest users can participate the voting stage of the hackathon;
            </p>
            <p>
              Judges Only: Only accounts set as judges by organizers can
              participate the voting stage of the hackathon.
            </p>
            <p>
              If this hackathon will not be voted and judged by HackQuest
              system, organizers need to upload the final reward list at the end
              of it.
            </p>
          </>
        )
      case 'voting':
        return (
          <>
            <p>
              Fixed Number of Vote: Organizers need to set the total votes and
              votes proportion for users and judges. In voting stage, users and
              judges can vote for projects they like with the votes they have;
            </p>
            <p>
              Project Scoring: This is only available to Judges Only. Organizers
              need to set a perfect score, and the judges will give each project
              a score in the voting stage.
            </p>
          </>
        )
      case 'userTags':
        return <p>usertag tooltip</p>
      default:
        return (
          <>
            <p>
              In order to ensure the fairness of the voting, organizers need to
              set a limit for the votes if Fixed Number of Vote is selected. For
              example, if a user/judge has 1000 votes, but the maximum number of
              votes each user/judge can cast for each project is 100, the
              user/judge can only cast 100 or less to each project.
            </p>
          </>
        )
    }
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="outline-none">
            <LuInfo className="size-4 fill-primary" />
          </button>
        </TooltipTrigger>
        <TooltipContent
          align="start"
          className="body-s w-80 rounded-xl border border-neutral-300 bg-neutral-white p-6 text-primary-neutral"
        >
          {renderText()}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default JudgingTooltip
