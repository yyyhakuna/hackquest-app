import {
  EAS_BASE_URL,
  ETH_SIGN_BASE_URL,
  VERAX_BASE_URL,
} from '@/constants/links'
import dayjs from '@/lib/dayjs'
import {
  LuAward,
  LuLink,
  LuMonitor,
  LuTarget,
  LuTerminal,
} from 'react-icons/lu'

export const INDICATORS = [
  {
    title: 'Technical Ability',
    icon: LuTerminal,
    content: [
      {
        title: 'Join more hackathons',
        link: '/explore',
      },
      {
        title: 'Earn more Certificates',
        link: '/explore',
      },
      {
        title: 'Increase Web3 related commit on Github',
        link: null,
      },
    ],
  },
  {
    title: 'On-chain Activity',
    icon: LuLink,
    content: [
      {
        title: 'More on-chain interactions',
        link: null,
      },
      {
        title: 'Deploy more smart contract',
        link: null,
      },
    ],
  },
  {
    title: 'Reputation',
    icon: LuAward,
    content: [
      {
        title: 'Get more attestations',
        link: null,
      },
      {
        title: 'Complete your profile',
        link: null,
        action: 'onboarding',
      },
      {
        title: 'Add Web3 related working experience',
        link: null,
        action: 'create-experience',
      },
    ],
  },
  {
    title: 'Influence',
    icon: LuTarget,
    content: [
      {
        title: 'Increase Stars for your Web3 Repo',
        link: null,
      },
      {
        title: 'Connect more socials',
        link: null,
        action: 'edit-profile',
      },
      {
        title: 'Increase attestations from verified individuals',
        link: null,
      },
    ],
  },
  {
    title: 'Contribution',
    icon: LuMonitor,
    content: [
      {
        title: 'Contribute more to the opensource repo',
        link: null,
      },
      {
        title: 'Contribute content on HackQuest',
        link: null,
      },
      {
        title: 'Join as an Advocate',
        link: null,
      },
    ],
  },
] as const

export const EMPLOYMENT_TYPES = [
  {
    label: 'Full-time',
    value: 'FULL_TIME',
  },
  {
    label: 'Part-time',
    value: 'PART_TIME',
  },
  {
    label: 'Contractor',
    value: 'CONTRACTOR',
  },
  {
    label: 'Internship',
    value: 'INTERNSHIP',
  },
] as const

export const FULL_MONTHS = Array.from({ length: 12 }, (_, i) =>
  dayjs().month(i).format('MMMM'),
)

const currentYear = dayjs().year()
const startYear = 1949

export const FULL_YEARS = Array.from(
  { length: currentYear - startYear + 1 },
  (_, i) => (currentYear - i).toString(),
)

export const SERVICE_CONFIG = {
  EAS: 'EAS',
  Verax: 'VERAX',
  EthSign: 'ETH_SIGN',
} as const

export const ATTESTATION_CONFIG = {
  [SERVICE_CONFIG.EAS]: (id: string) =>
    `${EAS_BASE_URL}/attestation/view/${id}`,
  [SERVICE_CONFIG.Verax]: (id: string) => `${VERAX_BASE_URL}/${id}`,
  [SERVICE_CONFIG.EthSign]: (id: string) => `${ETH_SIGN_BASE_URL}/${id}`,
} as const
