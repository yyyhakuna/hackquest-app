import { NotionComponentType } from './type'

export const HEADING_TYPES = [
  NotionComponentType.H1,
  NotionComponentType.H2,
  NotionComponentType.H3,
  NotionComponentType.H4,
  NotionComponentType.H5,
  NotionComponentType.H6,
] as const

export const NOTION_RENDERER_TYPES = [
  NotionComponentType.H1,
  NotionComponentType.H2,
  NotionComponentType.H3,
  NotionComponentType.H4,
  NotionComponentType.H5,
  NotionComponentType.H6,
  NotionComponentType.PARAGRAPH,
  NotionComponentType.NUMBERED_LIST_ITEM,
  NotionComponentType.BULLETED_LIST_ITEM,
  NotionComponentType.IMAGE,
  NotionComponentType.VIDEO,
  NotionComponentType.QUOTE,
  NotionComponentType.CALLOUT,
  NotionComponentType.TOGGLE,
  NotionComponentType.CODE,
  NotionComponentType.EQUATION,
  NotionComponentType.BOOKMARK,
  NotionComponentType.DIVIDER,
  NotionComponentType.COLUMN_LIST,
]

export const CHAIN_IDE = 'https://chainide.com/s/'
