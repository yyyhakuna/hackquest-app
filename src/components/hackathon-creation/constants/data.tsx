'use client'
import { Application } from '@/components/hackathon-creation/application'
import PartnersSpeakers from '@/components/hackathon-creation/common/partners-speakers'
import { Cover } from '@/components/hackathon-creation/cover'
import { Info } from '@/components/hackathon-creation/info'
import Judging from '@/components/hackathon-creation/judging'
import { Links } from '@/components/hackathon-creation/links'
import { Rewards } from '@/components/hackathon-creation/rewards'
import TextInfo from '@/components/hackathon-creation/text-info'
import { Timeline } from '@/components/hackathon-creation/timeline'
import { UserJudgeType } from '@/graphql/generated/hooks'
import { z } from 'zod'
import ToDo from '../to-do'
import {
  HackathonPartnerAccountValueType,
  HackathonPartnersSpeakersValueType,
  HackathonToDoType,
} from './type'

export const judgeModeData = [
  {
    value: 'all',
    label: 'Users + Judges',
  },
  {
    value: 'judges',
    label: 'Judges Only',
  },
]
export const voteModeData = [
  {
    value: 'fixed',
    label: 'Fixed Number of Vote',
  },
  {
    value: 'score',
    label: 'Project Scoring',
  },
]

export const formSchema = z.object({
  criteria: z.string().min(1, {
    message: 'Field is required',
  }),
  disableJudge: z.boolean().default(false).optional(),
  judgeMode: z.enum(['all', 'judges']).nullable().default(null).optional(),
  voteMode: z.enum(['fixed', 'score']).optional(),
  fixedNumberVotes: z.string().optional(),
  userTotalVotes: z.number().optional(),
  judgeTotalVote: z.number().optional(),
  judgeProjectVote: z.string().optional(),
  userTags: z.array(z.string()).optional(),
  judgeAccounts: z.array(z.string()).optional(),
})

export const votingUserTags = [
  {
    value: UserJudgeType.SeniorUsers,
    label: 'Senior users',
    disabled: true,
  },
  {
    value: UserJudgeType.SonalaDeveloper,
    label: 'Sonala Developer',
  },
  {
    value: UserJudgeType.EvmDeveloper,
    label: 'EVM Developer',
  },
  {
    value: UserJudgeType.SuiDeveloper,
    label: 'Sui Developer',
  },
  {
    value: UserJudgeType.MantleDeveloper,
    label: 'Mantle Developer',
  },
  {
    value: UserJudgeType.VaraDevelope,
    label: 'Vara Developer',
  },
  {
    value: UserJudgeType.Builder,
    label: 'Builder',
  },
  {
    value: UserJudgeType.SeniorTeamLeader,
    label: 'Senior Team Leader',
  },
  {
    value: UserJudgeType.HackathoneWinner,
    label: 'Hackathon Winner',
  },
]

export const partnersData = [
  {
    value: HackathonPartnersSpeakersValueType.PARTNER,
    title: 'Partners',
    type: HackathonPartnerAccountValueType.NAME,
  },
  {
    value: HackathonPartnersSpeakersValueType.ANOTHER,
    title: 'Another Partner Section',
    type: HackathonPartnerAccountValueType.INTRO,
  },
]

export const speakerJudgesData = [
  {
    value: HackathonPartnersSpeakersValueType.MENTORS,
    title: 'Mentors',
    type: HackathonPartnerAccountValueType.INTRO,
  },
  {
    value: HackathonPartnersSpeakersValueType.SPEAKERS,
    title: 'Speakers',
    type: HackathonPartnerAccountValueType.INTRO,
  },
  {
    value: HackathonPartnersSpeakersValueType.JUDGES,
    title: 'Judges',
    type: HackathonPartnerAccountValueType.INTRO,
  },
  {
    value: HackathonPartnersSpeakersValueType.SPONSORS,
    title: 'Sponsors',
    type: HackathonPartnerAccountValueType.INTRO,
  },
  {
    value: HackathonPartnersSpeakersValueType.ANOTHER,
    title: 'Another Speaker Section',
    type: HackathonPartnerAccountValueType.INTRO,
  },
]

export const initToDos = [
  {
    id: crypto.randomUUID(),
    type: HackathonToDoType.INIT,
    name: 'Join Community',
    intro: '',
    url: '',
    metadata: {
      urlType: 'input',
      introLabel: 'Community Intro',
      urlLabel: 'Join Community Action URL',
      buttonLabel: 'Go Join Community',
    },
  },
  {
    id: crypto.randomUUID(),
    type: HackathonToDoType.INIT,
    name: 'Check Submission Guidelines',
    intro: '',
    url: '',
    metadata: {
      urlType: 'input',
      introLabel: 'Community Intro',
      urlLabel: 'Submission Guidelines Action URL',
      buttonLabel: 'Go Join Community',
    },
  },
  {
    id: crypto.randomUUID(),
    type: HackathonToDoType.INIT,
    name: 'Start learning',
    intro: '',
    url: '',
    metadata: {
      urlType: 'select',
      introLabel: 'Learning Intro',
      urlLabel: 'Search Link in Hackquest',
      buttonLabel: 'Go Start learning',
    },
  },
  {
    id: crypto.randomUUID(),
    type: HackathonToDoType.INIT,
    name: 'Check Dev Docs',
    intro: '',
    url: '',
    metadata: {
      urlType: 'input',
      introLabel: 'Dev Docs Intro',
      urlLabel: 'Check Dev Docs Action URL',
      buttonLabel: 'Users Check To Do',
    },
  },
  {
    id: crypto.randomUUID(),
    type: HackathonToDoType.INIT,
    name: 'Submit Project',
    intro: '',
    url: '',
    metadata: {
      urlType: 'select',
      introLabel: 'Submit Project Intro',
      urlLabel: 'Search Link in Hackquest',
      buttonLabel: 'Go Submit Project',
    },
  },
]
export const creationBaseTabs = [
  {
    value: 'info',
    label: 'Info',
    component: <Info />,
  },
  {
    value: 'links',
    label: 'Links',
    component: <Links />,
  },
  {
    value: 'cover',
    label: 'Cover',
    component: <Cover />,
  },
  {
    value: 'timeline',
    label: 'Timeline',
    component: <Timeline />,
  },
  {
    value: 'application',
    label: 'Application',
    component: <Application />,
  },
  {
    value: 'rewards',
    label: 'Rewards',
    component: <Rewards />,
  },
  {
    value: 'judges',
    label: 'Judging',
    component: <Judging />,
  },
] as const

export const creationMoreTabs = [
  {
    value: 'textInfo',
    label: 'Text Info',
    component: <TextInfo />,
  },
  {
    value: 'partners',
    label: 'Partners',
    component: <PartnersSpeakers progressType="partners" />,
  },
  {
    value: 'speakersJudges',
    label: 'Speakers & Judges',
    component: <PartnersSpeakers progressType="speakersJudges" />,
  },
  {
    value: 'todo',
    label: 'To Do',
    component: <ToDo />,
  },
] as const

export const creationTabs = [...creationBaseTabs, ...creationMoreTabs]

export type CreationTabValue = (typeof creationTabs)[number]['value']

export type CreationType = 'base' | 'more'
