import type React from 'react'
import { NOTION_RENDERER_TYPES } from './constants/data'
import {
  type ComponentRendererProp,
  type ComponentRendererType,
  CustomType,
  type NotionComponentType,
} from './constants/type'
import CustomComponentRenderer from './custom-renderer'
import NotionRenderer from './notion-renderer'

const ComponentRenderer: React.FC<ComponentRendererProp> = props => {
  const { component } = props
  const type = component?.type?.trim() as NotionComponentType | CustomType
  if (NOTION_RENDERER_TYPES.includes(type as any)) {
    return <NotionRenderer {...props} />
  }
  switch (type) {
    case CustomType.Reading:
    case CustomType.Video:
    case CustomType.VIDEO:
    case CustomType.Content:
    case CustomType.Example:
    case CustomType.Quiz:
    case CustomType.QUIZ:
    case CustomType.QuizA:
    case CustomType.QuizB:
    case CustomType.QuizC:
    case CustomType.QuizD:
    case CustomType.CodeFill:
    case CustomType.Choice:
    case CustomType.TrueFalse:
    case CustomType.ImageChoice:
    case CustomType.DragSort:
      return <CustomComponentRenderer {...props} />
    default:
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error('不能渲染的类型', component?.type?.trim())
      return <div />
  }
}

export const childRenderCallback = (component: ComponentRendererType) => {
  const ChildComponent = (child: ComponentRendererType, index: number) => {
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
        prevComponent={prevComponent as ComponentRendererType | null}
        nextComponent={nextComponent as ComponentRendererType | null}
      />
    )
  }

  return ChildComponent
}

export default ComponentRenderer
