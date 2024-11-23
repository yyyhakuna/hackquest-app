'use client'

import { useCustomComponentRenderer } from '@/hooks/use-component-renderer'
import type { FC } from 'react'
import NotionRenderer, { NOTION_RENDERER_TYPES } from './notion-render'
import type { NotionComponent, NotionComponentType } from './notion-render/type'
import { type CustomComponent, CustomType } from './type'

interface ComponentRendererProps {
  prevComponent: NotionComponent | CustomComponent | null
  nextComponent: NotionComponent | CustomComponent | null
  position: number
  parent: any
  component: NotionComponent | CustomComponent
  isRenderChildren?: boolean
}

const ComponentRenderer: FC<ComponentRendererProps> = props => {
  const { component, parent } = props

  const CustomComponentRenderer = useCustomComponentRenderer()
  const type = component.type.trim() as NotionComponentType | CustomType

  if (NOTION_RENDERER_TYPES.includes(type as any)) {
    return <NotionRenderer {...props} />
  }
  switch (type) {
    case CustomType.Reading:
    case CustomType.Video:
    case CustomType.Content:
    case CustomType.Example:
    case CustomType.Quiz:
    case CustomType.QUIZ:
    case CustomType.QuizA:
    case CustomType.QuizB:
    case CustomType.QuizC:
      return <CustomComponentRenderer {...props} />
    default:
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error('不能渲染的类型', component.type.trim())
      return <div />
  }
}

export const childRenderCallback = (
  component: NotionComponent | CustomComponent,
) => {
  const ChildComponent = (
    child: NotionComponent | CustomComponent,
    index: number,
  ) => {
    const prevComponent = index === 0 ? null : component.children![index - 1]
    const nextComponent =
      index === component.children!.length - 1
        ? null
        : component.children![index + 1]
    return (
      <ComponentRenderer
        key={child.id ?? index}
        component={child}
        parent={component}
        position={index}
        prevComponent={prevComponent!}
        nextComponent={nextComponent!}
      />
    )
  }

  return ChildComponent
}

export default ComponentRenderer
