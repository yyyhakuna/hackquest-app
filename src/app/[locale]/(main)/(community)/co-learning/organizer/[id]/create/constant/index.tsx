import { ComunityType } from '@/graphql/generated/hooks'
import { Application } from '../component/application'
import { Info } from '../component/info'
import QR from '../component/qr'
import Timeline from '../component/timeline'
import ToDo from '../component/to-do'

export const creationTabs = [
  {
    value: 'info',
    label: 'Info',
    component: <Info />,
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
    value: 'qr',
    label: 'QR',
    component: <QR />,
  },
  {
    value: 'todo',
    label: 'To Do',
    component: <ToDo />,
  },
] as const

export type TabsValue = (typeof creationTabs)[number]['value']

export const applicationQuestion = {
  Info: [
    {
      id: 'f531c214-abcd-4fe7-b38a-c24024304d60',
      type: 'First and Last Name',
      title: 'First and Last Name',
      required: true,
      selected: true,
      property: {},
    },
    {
      id: '561fea95-ee9a-4876-99d0-00f70b0e75b7',
      type: 'Email',
      title: 'Email',
      required: true,
      selected: true,
      property: {
        label: 'Email',
        placeholder: 'Enter an Email address',
        name: 'email',
      },
    },
    {
      id: '1c62562b-6c62-4d71-af76-f92e15798239',
      type: 'City',
      title: 'Which city are you based in?',
      optional: true,
      property: {},
    },
    {
      id: 'e99c4979-550b-4634-ac54-e64b166551af',
      type: 'WeChat',
      title: 'WeChat',
      optional: true,
      property: {
        label: 'WeChat',
        placeholder: 'Enter a WeChat Account',
        name: 'weChat',
      },
    },
    {
      id: '5ee325f8-0b2c-4270-b170-115ede14d708',
      type: 'PhoneNumber',
      title: 'Phone Number',
      optional: true,
      property: {
        label: 'Phone Number',
        placeholder: 'Enter you phone number',
        name: 'phoneNumber',
      },
    },
    {
      id: 'e9fae77a-cda0-4be7-ab35-b6535faa0bec',
      type: 'Telegram',
      title: 'Telegram',
      optional: true,
      property: {
        label: 'Telegram',
        placeholder: 'Enter a Telegram Account',
        name: 'telegram',
      },
    },
    {
      id: 'a394bd1e-dce9-4b2b-8c65-c2d0597c25a7',
      type: 'University',
      title: 'University',
      optional: true,
      property: {
        name: 'university',
        label: 'University',
        placeholder: 'e.g. Cambridge University',
      },
    },
    {
      id: 'c04e83d5-39b6-46ce-9597-291cd63c5153',
      type: 'WhatsApp',
      title: 'WhatsApp',
      optional: true,
      property: {
        name: 'whatsApp',
        label: 'WhatsApp',
        placeholder: 'Enter a WhatsApp Account',
      },
    },
    {
      id: 'c1683cd1-2108-44db-8312-021c40e535ea',
      type: 'Discord',
      title: 'Discord',
      optional: true,
      property: {
        label: 'Discord',
        placeholder: 'Enter a Discord Account',
        name: 'discord',
      },
    },
  ],
  About: [
    {
      id: '44eb14bb-0e3e-4caf-8a0a-0c3a9d60a53a',
      type: 'Do you have any dev experience before?',
      title: 'Do you have any dev experience before?',
      required: true,
      selected: true,
      property: {},
    },
    {
      id: 'de2f759b-3c1c-4ecb-bca7-bd082c0c9452',
      type: 'How many years of experience do you have?',
      title: 'How many years of experience do you have?',
      required: true,
      selected: true,
      property: {},
    },
    {
      id: '423824c5-0651-4234-a62c-ec2caac58f4f',
      type: 'How did you hear about this event?',
      title: 'How did you hear about this event?',
      required: true,
      selected: true,
      property: {},
    },
    {
      id: 'fb2aacb2-be75-4f5e-8073-6e10e923c890',
      type: 'Who recommended this event to you?',
      title: 'Who recommended this event to you?',
      required: true,
      selected: true,
      property: {},
    },
    {
      id: '5aa47ff6-149b-4fd6-a093-ec2f5044ee1b',
      type: 'What would you like to achieve ?',
      title: 'What would you like to achieve ?',
      required: true,
      selected: true,
      property: {},
    },
  ],
}

type CommunityTtpe = {
  label: string
  value: ComunityType
}

export const communityTypes: CommunityTtpe[] = [
  {
    label: 'WeChat',
    value: ComunityType.Wechat,
  },
  {
    label: 'Telegram',
    value: ComunityType.Telegram,
  },
  {
    label: 'Discord',
    value: ComunityType.Discord,
  },
]
