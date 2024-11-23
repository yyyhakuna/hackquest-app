import RoleAdvocateIcon from '@/components/builder-home/icon/role-advocate'
import RoleJudgeIcon from '@/components/builder-home/icon/role-judge'
import RoleUserIcon from '@/components/builder-home/icon/role-user'
import { HackathonStatus, VoteRole } from '@/graphql/generated/hooks'

export const myHackathonTabs = [
  {
    label: 'Hackathon',
    value: HackathonStatus.Ongoing,
  },
  {
    label: 'Voting',
    value: HackathonStatus.Voting,
  },
  {
    label: 'Past Hackathon',
    value: HackathonStatus.Closed,
  },
]

export const PAGE_LIMIT = 4

export const votingRoleList = [
  {
    value: VoteRole.User,
    icon: <RoleUserIcon />,
    label: 'User',
  },
  {
    value: VoteRole.Advocate,
    icon: <RoleAdvocateIcon />,
    label: 'Advocate',
  },
  {
    value: VoteRole.Judge,
    icon: <RoleJudgeIcon />,
    label: 'Judge',
  },
]

export const myVotingTabs = [
  {
    label: 'Voting Hackathon',
    value: HackathonStatus.Voting,
  },
  {
    label: 'Past voting',
    value: HackathonStatus.Closed,
  },
]
