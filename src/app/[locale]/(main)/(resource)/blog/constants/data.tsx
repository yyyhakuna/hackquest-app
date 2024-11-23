import type { BlogQueryParamType } from '@/service/blog/type'
import { AiOutlineFire } from 'react-icons/ai'
import { BiBookContent } from 'react-icons/bi'
import { IoIosMore } from 'react-icons/io'
import { LuActivity, LuNewspaper } from 'react-icons/lu'
import { PiUserRectangle } from 'react-icons/pi'

export const contributeLink = 'https://xsxo494365r.typeform.com/to/RwN08ht9'

export const categories = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'News & Announcements',
    value: 'News & Announcements',
    icon: <LuNewspaper size={16} />,
  },
  {
    label: 'Events',
    value: 'Events',
    icon: <LuActivity size={16} />,
  },
  {
    label: 'Fireside Chats',
    value: 'Fireside Chats',
    icon: <AiOutlineFire size={16} />,
  },
  {
    label: 'Study Notes',
    value: 'Study Notes',
    icon: <BiBookContent size={16} />,
  },
  {
    label: 'User Spotlight',
    value: 'User Spotlight',
    icon: <PiUserRectangle size={16} />,
  },
  {
    label: 'Others',
    value: 'Others',
    icon: <IoIosMore size={16} />,
  },
]

export const PAGE_LIMIT = 12

export const parseSearchParams = (params: Record<string, any>): BlogQueryParamType => {
  return {
    page: Number(params.page || 1),
    limit: PAGE_LIMIT,
    where: {
      ...(params.category
        ? {
            categories: {
              has: params.category,
            },
          }
        : {}),
    },
  }
}
