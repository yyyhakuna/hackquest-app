'use client'

import { useTranslations } from 'next-intl'
import type { ValueOf } from 'next/dist/shared/lib/constants'
import type { ReactNode } from 'react'
import { FaFaucet } from 'react-icons/fa'
import {
  FiArchive,
  FiAward,
  FiBook,
  FiBookOpen,
  FiBookmark,
  FiBriefcase,
  FiFileText,
  FiFlag,
  FiGlobe,
  FiHome,
  FiInfo,
  FiMap,
  FiMoreVertical,
  FiNavigation,
  FiTerminal,
  FiUsers,
} from 'react-icons/fi'
import MenuLink from './menu-link'

export interface SidebarAbstract {
  type: string
  title: string
  icon: ReactNode
  riveKey?: string
  meta?: {
    auth: boolean
  }
}

export interface SidebarLinkItem extends SidebarAbstract {
  type: 'link'
  link: ValueOf<typeof MenuLink>
}

export interface SidebarGroupItem extends SidebarAbstract {
  type: 'group'
  children: SidebarItem[]
}

export interface SidebarLabelItem extends SidebarAbstract {
  type: 'label'
}

export type SidebarItem = SidebarLinkItem | SidebarGroupItem | SidebarLabelItem

export const sidebarRegister = () => {
  const t = useTranslations('Common')

  const sidebarList: SidebarItem[] = [
    {
      type: 'link',
      icon: <FiHome size={16} />,
      riveKey: 'home',
      title: t('sideBar.home'),
      link: MenuLink.HOME,
    },
    {
      type: 'link',
      icon: <FiAward size={16} />,
      title: t('sideBar.quest'),
      link: MenuLink.QUEST,
      riveKey: 'quest',
    },
    {
      type: 'label',
      icon: '',
      title: t('sideBar.learn'),
    },
    {
      type: 'link',
      icon: <FiMap size={16} />,
      title: t('sideBar.learningTrack'),
      link: MenuLink.LEARNING_TRACK,
      riveKey: 'learning-track',
    },
    {
      type: 'link',
      icon: <FiBook size={16} />,
      title: t('sideBar.project'),
      link: MenuLink.PRACTICES,
    },
    {
      type: 'label',
      icon: '',
      title: t('sideBar.community'),
    },
    {
      type: 'link',
      icon: <FiGlobe size={16} />,
      title: t('sideBar.event'),
      link: MenuLink.EVENTS,
    },
    {
      type: 'link',
      icon: <FiUsers size={16} />,
      title: t('sideBar.advocate'),
      link: MenuLink.ADVOCATE,
    },
    {
      type: 'link',
      icon: <FiBookOpen size={16} />,
      title: t('sideBar.coLearning'),
      link: MenuLink.CO_LEARNING,
      riveKey: 'co-learning',
    },
    {
      type: 'link',
      icon: <FiBookOpen size={16} />,
      title: t('sideBar.missionCenter'),
      link: MenuLink.MISSION_CENTER,
      meta: {
        auth: true,
      },
    },
    {
      type: 'label',
      icon: '',
      title: t('sideBar.build'),
    },
    {
      type: 'link',
      icon: <FiTerminal size={16} />,
      title: t('sideBar.buildHome'),
      riveKey: 'builder-home',
      link: MenuLink.BUILDER_HOME,
      meta: {
        auth: true,
      },
    },
    {
      type: 'link',
      icon: <FiNavigation size={16} />,
      title: t('sideBar.explore'),
      link: MenuLink.EXPLORE,
      riveKey: 'explore',
    },
    {
      type: 'link',
      icon: <FiArchive size={16} />,
      title: t('sideBar.pastProject'),
      link: MenuLink.HACKATHON_PROJECTS,
      riveKey: 'past-project',
    },
    {
      type: 'link',
      icon: <FiFlag size={16} />,
      title: t('sideBar.organizer'),
      link: MenuLink.HACKATHON_ORGANIZER,
      meta: {
        auth: true,
      },
    },
    {
      type: 'group',
      icon: <FiMoreVertical size={16} />,
      title: t('sideBar.more'),
      children: [
        {
          type: 'link',
          icon: <FiBookmark size={16} />,
          title: t('sideBar.glossary'),
          link: MenuLink.GLOSSARY,
        },
        {
          type: 'link',
          icon: <FiFileText size={16} />,
          title: t('sideBar.blog'),
          link: MenuLink.BLOG,
        },
        {
          type: 'link',
          icon: <FaFaucet size={16} />,
          title: t('sideBar.faucets'),
          link: MenuLink.FAUCETS,
        },
        {
          type: 'link',
          icon: <FiBriefcase size={16} />,
          title: t('sideBar.jobStation'),
          link: MenuLink.JOB_STATION,
        },
        {
          type: 'link',
          icon: <FiInfo size={16} />,
          title: t('sideBar.pressKit'),
          link: MenuLink.PRESS_KIT,
        },
        {
          type: 'link',
          icon: <FiFlag size={16} />,
          title: t('sideBar.partnership'),
          link: MenuLink.PARTNERS,
        },
      ],
    },
  ]

  return sidebarList
}
