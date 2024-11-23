import MenuLink from '@/constants/menu-link'
import { execute } from '@/graphql/generated/execute'
import { GlobalSearchDocument } from '@/graphql/generated/graphql'
import type { GlobalSearchResponse } from '@/graphql/generated/hooks'
import {
  FiBook,
  FiBookOpen,
  FiBookmark,
  FiBriefcase,
  FiFileText,
  FiGlobe,
  FiMap,
  FiNavigation,
} from 'react-icons/fi'

export enum GlobalSearchKey {
  ECOSYSTEM = 'ecosystem',
  COURSE = 'course',
  HACKATHON = 'hackathon',
  BLOG = 'blog',
  GLOSSARY = 'glossary',
  EVENT = 'event',
  PROJECT = 'project',
  JOB = 'job',
}

export const GlobalSearchKeyIcon = {
  [GlobalSearchKey.ECOSYSTEM]: <FiMap size={16} />,
  [GlobalSearchKey.COURSE]: <FiBookOpen size={16} />,
  [GlobalSearchKey.HACKATHON]: <FiNavigation size={16} />,
  [GlobalSearchKey.BLOG]: <FiFileText size={16} />,
  [GlobalSearchKey.GLOSSARY]: <FiBookmark size={16} />,
  [GlobalSearchKey.EVENT]: <FiGlobe size={16} />,
  [GlobalSearchKey.PROJECT]: <FiBook size={16} />,
  [GlobalSearchKey.JOB]: <FiBriefcase size={16} />,
}

export const getResultTypeLink = (info: any, k: GlobalSearchKey) => {
  switch (k) {
    case GlobalSearchKey.ECOSYSTEM:
      return `${MenuLink.ECOSYSTEM}/${info.ecosystemId}`
    case GlobalSearchKey.COURSE:
      return `${MenuLink.LEARNING_TRACK}`
    case GlobalSearchKey.PROJECT:
      return `${MenuLink.HACKATHON_PROJECTS}/${info.id}`
    case GlobalSearchKey.JOB:
      return `${MenuLink.JOB_STATION}/${info.id}`
    case GlobalSearchKey.HACKATHON:
      return `${MenuLink.EXPLORE}/${info.alias}`
    case GlobalSearchKey.BLOG:
      return `${MenuLink.BLOG}/${info.alias}`
    case GlobalSearchKey.GLOSSARY:
      return `${MenuLink.GLOSSARY}/${info.alias}`
    default:
      return MenuLink.EVENTS
  }
}

export const getSearchList = (
  globalSearch: GlobalSearchResponse,
  searchType?: GlobalSearchKey,
) => {
  if (!globalSearch) return []
  const keys: GlobalSearchKey[] = (
    Object.keys(globalSearch) as GlobalSearchKey[]
  ).filter(k => k !== searchType)
  function getItems(k: GlobalSearchKey) {
    const data = globalSearch?.[k] as any[]
    return {
      key: k,
      data:
        data.map(d => ({
          ...d,
          id: d.id || d.ecosystemId,
          _name: d.name || d.title,
          _type: k,
          _link: getResultTypeLink(d, k as GlobalSearchKey),
        })) || [],
      icon: GlobalSearchKeyIcon[k as GlobalSearchKey],
    }
  }
  const rs = []
  if (searchType) {
    rs.push(getItems(searchType as GlobalSearchKey))
  }
  keys.forEach(k => {
    rs.push(getItems(k))
  })
  return rs.filter(r => r.data.length > 0)
}

export const getGlobalSearch = async (
  k: string,
  searchType?: GlobalSearchKey,
) => {
  const res = (await execute(GlobalSearchDocument, { keyword: k })).globalSearch
  return getSearchList(res as GlobalSearchResponse, searchType)
}
