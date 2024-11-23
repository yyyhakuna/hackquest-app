import { BiLogoTelegram } from 'react-icons/bi'
import { BsDiscord } from 'react-icons/bs'
import { FaSlack } from 'react-icons/fa'
import { RiInstagramFill, RiTwitterXLine } from 'react-icons/ri'
import { SiFarcaster } from 'react-icons/si'
import { InfoType } from './type'

export const infoTabs = [
  {
    value: InfoType.OVERVIEW,
    label: 'Overview',
  },
  {
    value: InfoType.PRIZE_JUDGE,
    label: 'Prize & Judge',
  },
  {
    value: InfoType.SCHEDULE,
    label: 'Schedule',
  },
  {
    value: InfoType.MORE_INFO,
    label: 'More Info',
  },
  {
    value: InfoType.PROJECT_GALLERY,
    label: 'Project Gallery',
  },
]

export const linkIcons = {
  farcaster: <SiFarcaster />,
  twitter: <RiTwitterXLine />,
  discord: <BsDiscord />,
  slack: <FaSlack />,
  telegram: <BiLogoTelegram />,
  instagram: <RiInstagramFill />,
}

export const PAGE_LIMIT = 12

export const projectSorts = [
  { label: 'Latest to oldest', value: 'desc' },
  { label: 'Oldest to latest', value: 'asc' },
]
