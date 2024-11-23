import type React from 'react'
import {
  type ChoiceType,
  type CodeFillType,
  type ComponentRendererType,
  type CustomComponent,
  CustomType,
  type ExampleComponent,
  type QuizType,
  type TrueFalseType,
} from '../constants/type'
import ContentRenderer from './content-renderer'
import ExampleRenderer from './example-renderer'
import QuizRenderer from './quiz-renderer'
import ChoiceRenderer from './quiz-renderer/choice-renderer'
import CodeFillRenderer from './quiz-renderer/code-fill-renderer'
import DragSortRenderer from './quiz-renderer/drag-sort-renderer'
import ImageChoiceRenderer from './quiz-renderer/image-choice-renderer'
import TrueFalseRenderer from './quiz-renderer/true-false-renderer'
import VideoRenderer from './video-renderer'

interface CustomComponentRendererProp {
  parent: CustomComponent
  component: ComponentRendererType
}

const CustomComponentRenderer: React.FC<CustomComponentRendererProp> = ({
  parent,
  component,
}) => {
  switch (component.type.trim()) {
    case CustomType.Example:
      return (
        <ExampleRenderer
          component={component as ExampleComponent}
          parent={parent as CustomComponent}
        />
      )
    case CustomType.Content:
      return (
        <ContentRenderer
          component={component as CustomComponent}
          parent={parent as CustomComponent}
        />
      )
    case CustomType.Video:
      return (
        <VideoRenderer
          component={component as CustomComponent}
          parent={parent as CustomComponent}
        />
      )
    case CustomType.Quiz:
      return <QuizRenderer quiz={component as QuizType} parent={parent} />
    case CustomType.QuizA:
    case CustomType.CodeFill:
      return (
        <CodeFillRenderer parent={parent} quiz={component as CodeFillType} />
      )
    case CustomType.QuizC:
    case CustomType.Choice:
      return <ChoiceRenderer parent={parent} quiz={component as ChoiceType} />
    case CustomType.TrueFalse:
      return (
        <TrueFalseRenderer parent={parent} quiz={component as TrueFalseType} />
      )
    case CustomType.ImageChoice:
      return (
        <ImageChoiceRenderer parent={parent} quiz={component as ChoiceType} />
      )
    case CustomType.DragSort:
      return <DragSortRenderer parent={parent} quiz={component as ChoiceType} />
  }
}

export default CustomComponentRenderer
