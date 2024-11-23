'use client'
import {
  type ComponentType,
  type Dispatch,
  type SetStateAction,
  createContext,
} from 'react'
import type { NotionComponent } from './notion-render/type'
import type { CustomComponent, PageType, QuizBType } from './type'

//#region quizA
// interface QuizAContextType {
//   answers: AnswerState[]
//   setAnswers: Dispatch<SetStateAction<Record<string, any>>>
//   showAnswer: boolean
// }

// export const QuizAContextDefaultValue: QuizAContextType = {
//   answers: [],
//   showAnswer: false,
//   setAnswers: () => {},
// }

//#endregion

// #region QuizB
export type QuizOptionType = QuizBType['options'][number] & {
  isRender: boolean
}

export interface AnswerType {
  id: string
  answer: string
  option: QuizOptionType | null
  status: 'error' | 'default' | 'success'
}

export interface QuizBContextType {
  onDrop: (item: AnswerType) => void
  answers: Record<string, AnswerType>
  setAnswers: Dispatch<SetStateAction<Record<string, AnswerType>>>
  showAnswer: boolean
  accept: QuizOptionType[]
  changeOptionState: (options: QuizOptionType[]) => void
  quiz: any
  DropAnswerComponent: ComponentType<{ answer: string }>
}

export const QuizBContextDefaultValue: QuizBContextType = {
  onDrop: (_item: any) => {},
  changeOptionState: (_options: any) => {},
  answers: {},
  showAnswer: false,
  setAnswers: () => {},
  accept: [],
  quiz: {},
  DropAnswerComponent: () => <></>,
}

// #endregion

export interface ExampleContextType {
  updateExampleContent: (value: string) => void
  isExample: boolean
}

export const ExampleContextDefaultValue = {
  updateExampleContent: (_value: string) => {},
  isExample: false,
}

export interface PgcExpandDataType {
  isExpandAll?: boolean
  expandNum?: number
  id: string
  index: number
  cId?: string
}

export type ExpandDataType = PgcExpandDataType | Record<string, number[]>

export interface GlobalContextType {
  onCompleted?: VoidFunction
  onQuizPass?: VoidFunction
  pageType?: PageType | null
  isMobile?: boolean
  expandData?: ExpandDataType[]
  updateExpandData?: (data: ExpandDataType[], index?: number) => void
  expandDataRight?: ExpandDataType[]
  updateExpandDataRight?: (data: ExpandDataType[], index?: number) => void
  youtubeLoadCount?: number
  setYoutubeLoadCount?: (count: number) => void
}

export const GlobalContextDefaultValue: GlobalContextType = {
  onCompleted: () => {},
  onQuizPass: () => {},
  pageType: null,
  expandData: [],
  updateExpandData: (_data: ExpandDataType[], _index?: number) => {},
  expandDataRight: [],
  updateExpandDataRight: (_data: ExpandDataType[], _index?: number) => {},
  isMobile: false,
}

export interface RendererContextType {
  textRenderer?: {
    fontSize?: string
    textStyle?: string
    codeStyle?: string
  }
  codeRenderer?: {
    isPlayground?: boolean
  }
  quizBRendererContext?: QuizBContextType
  // quizARendererContext?: QuizAContextType
  globalContext?: GlobalContextType
  exampleRendererContext?: ExampleContextType
  CustomComponentRenderer: ComponentType<{
    parent: any
    component: NotionComponent | CustomComponent
    isRenderChildren?: boolean
  }>
}

export const defaultRendererContext = {
  textRenderer: { fontSize: '14px', textStyle: '' },
  codeRenderer: { isPlayground: false },
  quizBRendererContext: QuizBContextDefaultValue,
  // quizARendererContext: QuizAContextDefaultValue,
  globalContext: GlobalContextDefaultValue,
  CustomComponentRenderer: () => <></>,
  exampleRendererContext: ExampleContextDefaultValue,
}

export const RendererContext = createContext<RendererContextType>(
  defaultRendererContext,
)
