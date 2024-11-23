'use client'

import type { FC } from 'react'
import type { CustomComponent } from '../type'
import BulletedListItemRenderer from './bulleted-listItem'
import CalloutRenderer from './callout-renderer'
import EquationRenderer from './equation-renderer'
import HeaderRenderer from './header-renderer'
import ImageRenderer from './image-renderer'
import NumberListItemRenderer from './number-listIte-renderer'
import ParagraphRenderer from './paragraph-renderer'
import QuoteRenderer from './quote-renderer'
import { type NotionComponent, NotionComponentType } from './type'
import VideoRenderer from './video-renderer'

interface NotionRendererProps {
  prevComponent: NotionComponent | CustomComponent | null
  nextComponent: NotionComponent | CustomComponent | null
  position: number
  parent: any
  component: NotionComponent
  isRenderChildren?: boolean
  isFullscreen?: boolean
}

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
]

const NotionRenderer: FC<NotionRendererProps> = props => {
  const { component } = props
  switch (component.type.trim()) {
    case NotionComponentType.PARAGRAPH:
      return <ParagraphRenderer {...props} />
    case NotionComponentType.NUMBERED_LIST_ITEM:
      return <NumberListItemRenderer {...props} />
    case NotionComponentType.BULLETED_LIST_ITEM:
      return <BulletedListItemRenderer {...props} />
    case NotionComponentType.IMAGE:
      return <ImageRenderer {...props} />
    case NotionComponentType.VIDEO:
      return <VideoRenderer {...props} />
    case NotionComponentType.QUOTE:
      return <QuoteRenderer {...props} />
    case NotionComponentType.CALLOUT:
      return <CalloutRenderer {...props} />
    case NotionComponentType.EQUATION:
      return <EquationRenderer {...props} />
    case NotionComponentType.H1:
    case NotionComponentType.H2:
    case NotionComponentType.H3:
    case NotionComponentType.H4:
    case NotionComponentType.H5:
    case NotionComponentType.H6:
      return <HeaderRenderer {...props} />
    default:
      return <div>{component.type}</div>
  }
}

export default NotionRenderer
