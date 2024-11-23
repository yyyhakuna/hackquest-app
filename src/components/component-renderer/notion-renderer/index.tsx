'use client'

import type { FC } from 'react'
import {
  type ComponentRendererProp,
  NotionComponentType,
} from '../constants/type'
import BookMarkRenderer from './book-mark-renderer'
import BulletedListItemRenderer from './bulleted-list-item-renderer'
import CalloutRenderer from './callout-renderer'
import CodeRenderer from './code-renderer'
import ColumnListRenderer from './column-list-renderer'
import DividerRenderer from './divider-renderer'
import EquationRenderer from './equation-renderer'
import HeaderRenderer from './header-renderer'
import ImageRenderer from './image-renderer'
import NumberListItemRenderer from './number-list-item-renderer'
import ParagraphRenderer from './paragraph-renderer'
import QuoteRenderer from './quote-renderer'
import ToggleRenderer from './toggle-renderer'
import VideoRenderer from './video-renderer'

type NotionRendererProps = ComponentRendererProp

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
    case NotionComponentType.TOGGLE:
      return <ToggleRenderer {...props} />
    case NotionComponentType.CODE:
      return <CodeRenderer {...props} />
    case NotionComponentType.EQUATION:
      return <EquationRenderer {...props} />
    case NotionComponentType.BOOKMARK:
      return <BookMarkRenderer {...props} />
    case NotionComponentType.DIVIDER:
      return <DividerRenderer {...props} />
    case NotionComponentType.COLUMN_LIST:
      return <ColumnListRenderer {...props} />
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
